import { Building } from '../types/building';
import { Library } from '../types/library';
import { Product } from '../types/product';
import { Recipe } from '../types/recipe';
import { Transport } from '../types/transport';

export function createLibrary({
  buildings,
  recipes,
  products,
  transports,
}: {
  buildings: Building[];
  recipes: Recipe[];
  products: Product[];
  transports: Transport[];
}): Library {
  return {
    getBuildings: async () => buildings,
    getBuilding: async (id: string) => buildings.find((b) => b.id === id),
    getProducts: async () => products,
    getProduct: async (id: string) => products.find((p) => p.id === id),
    getRecipes: async () => recipes,
    getRecipe: async (id: string) => recipes.find((r) => r.id === id),
    getTransports: async () => transports,
    getTransport: async (id: string) => transports.find((t) => t.id === id),
  };
}
