import { IPizzaItem } from "@/types/pizza/IPizzaItem";
import { IAdditionalCartItem } from "@/types/cart/IAdditionalCartItem";
import { IUserAddress } from "@/types/IUserAddress";

export interface IOrder {
  id: number;
  pizzas: IPizzaItem[];
  extras: IAdditionalCartItem[];
  address: IUserAddress | null;
  deliveryType: string;
  phone: string;
  total: number;
}
