import { Building } from './building';
import { Product } from './product';
import { Recipe } from './recipe';
import { Transport } from './transport';

export interface Library {
  getBestRecipe(product: Product): Recipe | undefined;
  getBuildings(): Promise<Building[]>;
  getBuilding(id: string): Promise<Building | undefined>;
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getRecipes(): Promise<Recipe[]>;
  getRecipe(id: string): Promise<Recipe | undefined>;
  getTransports(): Promise<Transport[]>;
  getTransport(id: string): Promise<Transport | undefined>;
}
