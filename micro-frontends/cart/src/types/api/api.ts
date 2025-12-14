import { IAdditionalCartItem } from "@/types/IAdditionalCartItem";

export type IApiExtraResponse = Omit<IAdditionalCartItem, "count">;
