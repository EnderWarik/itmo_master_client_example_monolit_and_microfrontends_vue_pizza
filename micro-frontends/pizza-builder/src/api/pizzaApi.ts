import { httpClient } from "@/http/HttpClient";
import {
  IApiPizzaDoughResponse,
  IApiPizzaIngredientResponse,
  IApiPizzaSaucesResponse,
  IPizzaSizeResponse,
} from "@/components/types/api/api";

export const pizzaApi = {
  async getDoughs(): Promise<IApiPizzaDoughResponse> {
    return httpClient.get<IApiPizzaDoughResponse>("/dough");
  },

  async getIngredients(): Promise<IApiPizzaIngredientResponse> {
    return httpClient.get<IApiPizzaIngredientResponse>("/ingredients");
  },

  async getSauces(): Promise<IApiPizzaSaucesResponse> {
    return httpClient.get<IApiPizzaSaucesResponse>("/sauces");
  },

  async getSizes(): Promise<IPizzaSizeResponse> {
    return httpClient.get<IPizzaSizeResponse>("/sizes");
  },
};
