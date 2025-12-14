import { IPizzaIngredient } from "@/types/pizza/IPizzaIngredient";
import { IPizzaSize } from "@/types/pizza/IPizzaSize";
import { IPizzaDough } from "@/types/pizza/IPizzaDough";
import { IPizzaSauce } from "@/types/pizza/IPizzaSauce";

export type IPizzaItem = {
  id: string;
  name: string;
  size: IPizzaSize;
  dough: IPizzaDough;
  sauce: IPizzaSauce;
  fillings: IPizzaIngredient[] | [];
  count: number;
  price: number;
};
