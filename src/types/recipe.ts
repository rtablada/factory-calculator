import { Building } from "./building";
import { HasId } from "./const";
import { Product } from "./product";

export interface RecipeProduct {
  numberPerTick: number;
  resource: Product;
}

export interface Recipe extends HasId {
  name: string;

  building: Building;
  inputs: RecipeProduct[];
  outputs: RecipeProduct[];
}