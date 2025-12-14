import { IPizzaItem } from "@/types/pizza/IPizzaItem";
import { IAdditionalCartItem } from "@/types/IAdditionalCartItem";
import { IUserAddress } from "@/modules/profile/types/IUserAddress";

export interface ICartProduct {
  userId: string;
  addressId: number | null;
  orderPizzas: IPizzaItem[];
  orderMisc: IAdditionalCartItem[];
  orderAddress: IUserAddress;
}
