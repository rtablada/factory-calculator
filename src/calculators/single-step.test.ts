import { expect, test } from 'vitest';
import { calculateInputRatio } from './single-step';
import {
  CONSTRUCTOR,
  IRON_INGOT,
  IRON_INGOT_RECIPE,
  IRON_ORE,
  IRON_PLATE,
  IRON_PLATE_RECIPE,
  SMELTER,
  STANDARD_LIBRARY,
} from '../test-helpers/conts';

test('can calculate 1:1 ratios', () => {
  const perfectRatioResult = calculateInputRatio(
    STANDARD_LIBRARY,
    IRON_INGOT_RECIPE,
    {
      product: IRON_INGOT,
      numberPerTick: 30,
    },
  );

  expect(perfectRatioResult.buildingInfo).toEqual({
    building: SMELTER,
    count: 1,
  });
  expect(perfectRatioResult.inputs).toEqual([
    { product: IRON_ORE, numberPerTick: 30 },
  ]);
  expect(perfectRatioResult.byproducts).toEqual([]);

  const underRatioResult = calculateInputRatio(
    STANDARD_LIBRARY,
    IRON_INGOT_RECIPE,
    {
      product: IRON_INGOT,
      numberPerTick: 10,
    },
  );

  expect(underRatioResult.buildingInfo).toEqual({
    building: SMELTER,
    count: 1,
  });
  expect(underRatioResult.inputs).toEqual([
    { product: IRON_ORE, numberPerTick: 10 },
  ]);
  expect(underRatioResult.byproducts).toEqual([]);

  const multipleBuildingResult = calculateInputRatio(
    STANDARD_LIBRARY,
    IRON_INGOT_RECIPE,
    {
      product: IRON_INGOT,
      numberPerTick: 120,
    },
  );

  expect(multipleBuildingResult.buildingInfo).toEqual({
    building: SMELTER,
    count: 4,
  });
  expect(multipleBuildingResult.inputs).toEqual([
    { product: IRON_ORE, numberPerTick: 120 },
  ]);
  expect(multipleBuildingResult.byproducts).toEqual([]);

  const oddRatioResult = calculateInputRatio(
    STANDARD_LIBRARY,
    IRON_INGOT_RECIPE,
    {
      product: IRON_INGOT,
      numberPerTick: 115,
    },
  );

  expect(oddRatioResult.buildingInfo).toEqual({
    building: SMELTER,
    count: 4,
  });
  expect(oddRatioResult.inputs).toEqual([
    { product: IRON_ORE, numberPerTick: 115 },
  ]);
  expect(oddRatioResult.byproducts).toEqual([]);
});

test('can calculate non-1:1 ratios', () => {
  const perfectRatioResult = calculateInputRatio(
    STANDARD_LIBRARY,
    IRON_PLATE_RECIPE,
    {
      product: IRON_PLATE,
      numberPerTick: 20,
    },
  );

  expect(perfectRatioResult.buildingInfo).toEqual({
    building: CONSTRUCTOR,
    count: 1,
  });
  expect(perfectRatioResult.inputs).toEqual([
    { product: IRON_INGOT, numberPerTick: 30 },
  ]);
  expect(perfectRatioResult.byproducts).toEqual([]);

  const underRatioResult = calculateInputRatio(
    STANDARD_LIBRARY,
    IRON_PLATE_RECIPE,
    {
      product: IRON_PLATE,
      numberPerTick: 10,
    },
  );

  expect(underRatioResult.buildingInfo).toEqual({
    building: CONSTRUCTOR,
    count: 1,
  });
  expect(underRatioResult.inputs).toEqual([
    { product: IRON_INGOT, numberPerTick: 15 },
  ]);
  expect(underRatioResult.byproducts).toEqual([]);

  const multipleBuildingResult = calculateInputRatio(
    STANDARD_LIBRARY,
    IRON_PLATE_RECIPE,
    {
      product: IRON_PLATE,
      numberPerTick: 120,
    },
  );

  expect(multipleBuildingResult.buildingInfo).toEqual({
    building: CONSTRUCTOR,
    count: 6,
  });
  expect(multipleBuildingResult.inputs).toEqual([
    { product: IRON_INGOT, numberPerTick: 180 },
  ]);
  expect(multipleBuildingResult.byproducts).toEqual([]);

  const oddRatioResult = calculateInputRatio(
    STANDARD_LIBRARY,
    IRON_PLATE_RECIPE,
    {
      product: IRON_PLATE,
      numberPerTick: 115,
    },
  );

  expect(oddRatioResult.buildingInfo).toEqual({
    building: CONSTRUCTOR,
    count: 6,
  });
  expect(oddRatioResult.inputs).toEqual([
    { product: IRON_INGOT, numberPerTick: 172.5 },
  ]);
  expect(oddRatioResult.byproducts).toEqual([]);
});
