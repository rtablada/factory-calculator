import { expect, test } from 'vitest';
import { calculateFactory } from './factory';
import {
  IRON_ORE,
  IRON_ORE_RECIPE,
  IRON_INGOT,
  IRON_INGOT_RECIPE,
  MK1_MINER,
  SMELTER,
  STANDARD_LIBRARY,
} from '../test-helpers/conts';

test('can calculate single step factory', () => {
  expect(
    calculateFactory(STANDARD_LIBRARY, IRON_ORE_RECIPE, {
      product: IRON_ORE,
      numberPerTick: 60,
    }),
  ).toEqual({
    buildings: [{ building: MK1_MINER, count: 1 }],
    byproducts: [],
    powerInfo: {
      idlePower: MK1_MINER.idlePower,
      maxPower: MK1_MINER.workingPower,
      averageExpectedPower: MK1_MINER.workingPower,
    },
    steps: [
      {
        inputs: [],
        buildingInfo: { building: MK1_MINER, count: 1 },
        byproducts: [],
        powerInfo: {
          idlePower: MK1_MINER.idlePower,
          maxPower: MK1_MINER.workingPower,
          averageExpectedPower: MK1_MINER.workingPower,
        },
      },
    ],
  });
});

test('can calculate two step factory', () => {
  const result = calculateFactory(STANDARD_LIBRARY, IRON_INGOT_RECIPE, {
    product: IRON_INGOT,
    numberPerTick: 60,
  });

  expect(result.buildings).toEqual([
    { building: MK1_MINER, count: 1 },
    { building: SMELTER, count: 2 },
  ]);
  expect(result.byproducts).toEqual([]);
  expect(result.powerInfo).toEqual({
    idlePower: MK1_MINER.idlePower + SMELTER.idlePower * 2,
    maxPower: MK1_MINER.workingPower + SMELTER.workingPower * 2,
    averageExpectedPower: MK1_MINER.workingPower + SMELTER.workingPower * 2,
  });
  expect(result.steps).toEqual([
    {
      inputs: [],
      buildingInfo: { building: MK1_MINER, count: 1 },
      byproducts: [],
      powerInfo: {
        idlePower: MK1_MINER.idlePower,
        maxPower: MK1_MINER.workingPower,
        averageExpectedPower: MK1_MINER.workingPower,
      },
    },
    {
      inputs: [{ product: IRON_ORE, numberPerTick: 60 }],
      buildingInfo: { building: SMELTER, count: 2 },
      byproducts: [],
      powerInfo: {
        idlePower: SMELTER.idlePower * 2,
        maxPower: SMELTER.workingPower * 2,
        averageExpectedPower: SMELTER.workingPower * 2,
      },
    },
  ]);
});
