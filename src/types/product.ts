import { HasId } from "./const";
import { Recipe } from "./recipe";
import { Transport } from "./transport";

export interface Product extends HasId {
  name: string;

  recipes: Recipe[];
  allowedTransports: Transport[];
}
