import { httpClient } from "@/http/httpClient";
import { IApiOrderCreateResponse } from "@/types/api/IApiOrderCreateResponse";
import { IApiOrderCreateRequest } from "@/types/api/IApiOrderCreateRequest";
import { IApiOrderGetResponse } from "@/types/api/IApiOrderGetResponse";

export const orderApi = {
  async deleteOrder(id: number): Promise<void> {
    return httpClient.delete<void>(`/orders/${id}`);
    // console.log('deleteOrder', id);
  },

  async createOrder(
    data: IApiOrderCreateRequest,
  ): Promise<IApiOrderCreateResponse> {
    return httpClient.post<IApiOrderCreateResponse>(`/orders/`, data);
    // return {} as IApiOrderCreateResponse;
  },

  async getOrders(): Promise<IApiOrderGetResponse[]> {
    return httpClient.get<IApiOrderGetResponse[]>("/orders");
    // return [];
  },
};
