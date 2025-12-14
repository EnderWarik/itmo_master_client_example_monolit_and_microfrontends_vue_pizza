import { IPizzaIngredient } from "@/components/types/IPizzaIngredient";
import { IPizzaSize } from "@/components/types/IPizzaSize";
import { IPizzaDough } from "@/components/types/IPizzaDough";
import { IPizzaSauce } from "@/components/types/IPizzaSauce";

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
