import { httpClient } from "@/http/httpClient";

export interface ICreateOrderRequest {
    userId: string;
    phone: string;
    address: {
        street: string;
        building: string;
        flat?: string;
        comment?: string;
    } | null;
    pizzas: {
        name: string;
        sauceId: number;
        doughId: number;
        sizeId: number;
        quantity: number;
        ingredients: {
            ingredientId: number;
            quantity: number;
        }[];
    }[];
    misc: {
        miscId: number;
        quantity: number;
    }[];
}

export const orderApi = {
    async createOrder(data: ICreateOrderRequest): Promise<any> {
        return httpClient.post("/orders/", data);
    },
};
