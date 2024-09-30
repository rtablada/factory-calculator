import { Building } from '../types/building';
import { Product } from '../types/product';
import { Recipe } from '../types/recipe';
import { Transport } from '../types/transport';
import { createLibrary } from './library';

export const MK1_BELT: Transport = {
  id: 'mk1-belt',
  name: 'Mk1 Belt',
  maxThroughput: 60,
};

export const MK1_MINER: Building = {
  id: 'mk1-miner',
  name: 'Mk1 Miner',
  maxInputs: 0,
  maxOutputs: 1,
  idlePower: 1,
  workingPower: 4,
};

export const SMELTER: Building = {
  id: 'smelter',
  name: 'Smelter',
  maxInputs: 1,
  maxOutputs: 1,
  idlePower: 1,
  workingPower: 4,
};

export const CONSTRUCTOR: Building = {
  id: 'constructor',
  name: 'Constructor',
  maxInputs: 1,
  maxOutputs: 1,
  idlePower: 1,
  workingPower: 4,
};

export const IRON_ORE: Product = {
  id: 'iron-ore',
  name: 'Iron Ore',
  recipes: [],
  allowedTransports: [],
};

export const IRON_ORE_RECIPE: Recipe = {
  id: 'iron-ore-recipe',
  name: 'Iron Ore',
  inputs: [],
  outputs: [{ product: IRON_ORE, numberPerTick: 60 }],
  building: MK1_MINER,
};

export const IRON_INGOT: Product = {
  id: 'iron-ingot',
  name: 'Iron Ingot',
  recipes: [],
  allowedTransports: [MK1_BELT],
};

export const IRON_INGOT_RECIPE: Recipe = {
  id: 'iron-ingot-recipe',
  name: 'Iron Ingot',
  inputs: [{ product: IRON_ORE, numberPerTick: 30 }],
  outputs: [{ product: IRON_INGOT, numberPerTick: 30 }],
  building: SMELTER,
};

IRON_INGOT.recipes.push(IRON_INGOT_RECIPE);

export const IRON_PLATE: Product = {
  id: 'iron-plate',
  name: 'Iron Plate',
  recipes: [],
  allowedTransports: [MK1_BELT],
};

export const IRON_PLATE_RECIPE: Recipe = {
  id: 'iron-plate-recipe',
  name: 'Iron Plate',
  inputs: [{ product: IRON_INGOT, numberPerTick: 30 }],
  outputs: [{ product: IRON_PLATE, numberPerTick: 20 }],
  building: CONSTRUCTOR,
};

export const STANDARD_LIBRARY = createLibrary({
  transports: [MK1_BELT],
  buildings: [SMELTER, CONSTRUCTOR],
  products: [IRON_ORE, IRON_INGOT, IRON_PLATE],
  recipes: [IRON_ORE_RECIPE, IRON_INGOT_RECIPE, IRON_PLATE_RECIPE],
});
