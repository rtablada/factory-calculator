import { sum, sumBy } from 'lodash';
import { Building } from '../types/building';
import { Library } from '../types/library';
import { RecipeProduct, Recipe } from '../types/recipe';
import { calculateInputRatio, InputRatioResult } from './single-step';

export interface FactoryResult {
  buildings: {
    building: Building;
    count: number;
  }[];
  byproducts: RecipeProduct[];
  powerInfo: {
    idlePower: number;
    maxPower: number;
    averageExpectedPower: number;
  };
  steps: InputRatioResult[];
}

export function calculateFactory(
  library: Library,
  recipe: Recipe,
  desiredOutput: RecipeProduct,
): FactoryResult {
  const lastStep = calculateInputRatio(library, recipe, desiredOutput);
  let steps = [lastStep];

  if (lastStep.buildingInfo.building.maxInputs > 0) {
    const previousSteps = lastStep.inputs.flatMap((input) => {
      const recipe = library.getBestRecipe(input.product);

      if (!recipe) {
        throw new Error(`No recipe found for ${input.product.id}`);
      }

      return calculateFactory(library, recipe, input).steps;
    });

    steps = [...previousSteps, lastStep];
  }

  return {
    buildings: steps.map((s) => s.buildingInfo),
    byproducts: steps.flatMap((s) => s.byproducts),
    powerInfo: {
      idlePower: sumBy(steps, (s) => s.powerInfo.idlePower),
      maxPower: sumBy(steps, (s) => s.powerInfo.maxPower),
      averageExpectedPower: sumBy(
        steps,
        (s) => s.powerInfo.averageExpectedPower,
      ),
    },
    steps,
  };
}
