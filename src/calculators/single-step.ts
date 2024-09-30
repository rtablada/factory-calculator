import { RecipeProduct, Recipe } from '../types/recipe';
import { Library } from '../types/library';
import { Building } from '../types/building';

export interface InputRatioResult {
  inputs: RecipeProduct[];
  byproducts: RecipeProduct[];
  buildingInfo: {
    building: Building;
    count: number;
  };
  powerInfo: {
    idlePower: number;
    maxPower: number;
    averageExpectedPower: number;
  };
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

  const buildingCount = Math.ceil(multiplier);

  return {
    inputs: recipe.inputs.map((input) => ({
      product: input.product,
      numberPerTick: input.numberPerTick * multiplier,
    })),
    buildingInfo: {
      building: recipe.building,
      count: buildingCount,
    },

    byproducts: byproducts.map((byproduct) => ({
      product: byproduct.product,
      numberPerTick: byproduct.numberPerTick * multiplier,
    })),

    powerInfo: {
      idlePower: recipe.building.idlePower * buildingCount,
      maxPower: recipe.building.workingPower * buildingCount,
      averageExpectedPower: recipe.building.workingPower * multiplier,
    },
  };
}
