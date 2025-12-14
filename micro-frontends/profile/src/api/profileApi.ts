import { httpClient } from "@/http/httpClient";
import {
  IApiAddressCreateRequest,
  IApiAddressCreatResponse,
  IApiAddressGetResponse,
  IApiAddressUpdateRequest,
} from "@/types/api/api";

export const profileApi = {
  async updateAddress(data: IApiAddressUpdateRequest): Promise<void> {
    return httpClient.put<void>(`/addresses/${data.id}`, data) as unknown as Promise<void>;
  },

  async deleteAddress(id: number): Promise<void> {
    return httpClient.delete<void>(`/addresses/${id}`) as unknown as Promise<void>;
  },

  async createAddress(
    data: IApiAddressCreateRequest,
  ): Promise<IApiAddressCreatResponse> {
    return httpClient.post<IApiAddressCreatResponse>(`/addresses`, data) as unknown as Promise<IApiAddressCreatResponse>;
  },

  async getAddresses(): Promise<IApiAddressGetResponse> {
    return httpClient.get<IApiAddressGetResponse>(`/addresses`) as unknown as Promise<IApiAddressGetResponse>;
  },
};
