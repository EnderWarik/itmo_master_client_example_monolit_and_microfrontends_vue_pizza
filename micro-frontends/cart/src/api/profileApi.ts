import { httpClient } from "@/http/httpClient";

export interface IAddress {
    id: number;
    name: string;
    street: string;
    building: string;
    flat?: string;
    comment?: string;
}

export const profileApi = {
    async getAddresses(): Promise<IAddress[]> {
        return httpClient.get("/addresses");
    },
};
