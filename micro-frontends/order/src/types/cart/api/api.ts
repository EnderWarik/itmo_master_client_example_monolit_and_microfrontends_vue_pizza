import { IAdditionalCartItem } from "@/types/cart/IAdditionalCartItem";

export type IApiExtraResponse = Omit<IAdditionalCartItem, "count">;
