import { RecipeProduct, Recipe } from '../types/recipe';
import { Library } from '../types/library';
import { Building } from '../types/building';

export interface InputRatioResult {
  inputs: RecipeProduct[];
  building: {
    building: Building;
    count: number;
  };
  byproducts: RecipeProduct[];
}

export function calculateInputRatio(
  library: Library,
  recipe: Recipe,
  desiredOutput: RecipeProduct,
): InputRatioResult {
  const { relevantOuputRecipe, byproducts } = recipe.outputs.reduce(
    (
      accum: {
        relevantOuputRecipe?: RecipeProduct;
        byproducts: RecipeProduct[];
      },
      output,
    ) => {
      if (output.product.id === desiredOutput.product.id) {
        accum.relevantOuputRecipe = output;
      } else {
        accum.byproducts.push(output);
      }
      return accum;
    },
    { relevantOuputRecipe: undefined, byproducts: [] },
  );

  if (!relevantOuputRecipe) {
    throw new Error('Desired output not found in recipe');
  }

  const multiplier =
    desiredOutput.numberPerTick / relevantOuputRecipe.numberPerTick;

  return {
    inputs: recipe.inputs.map((input) => ({
      product: input.product,
      numberPerTick: input.numberPerTick * multiplier,
    })),
    building: {
      building: recipe.building,
      count: Math.ceil(multiplier),
    },

    byproducts: byproducts.map((byproduct) => ({
      product: byproduct.product,
      numberPerTick: byproduct.numberPerTick * multiplier,
    })),
  };
}
