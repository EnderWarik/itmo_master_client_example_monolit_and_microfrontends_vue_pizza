import { IPizzaItem } from "@/types/pizza/IPizzaItem";
import { IAdditionalCartItem } from "@/types/cart/IAdditionalCartItem";
import { IUserAddress } from "@/types/IUserAddress";

export interface ICartProduct {
  userId: string;
  addressId: number | null;
  orderPizzas: IPizzaItem[];
  orderMisc: IAdditionalCartItem[];
  orderAddress: IUserAddress;
}
