import { httpClient } from "@/http/httpClient";

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
}

export const authApi = {
    async login(data: ILoginRequest): Promise<ILoginResponse> {
        return httpClient.post<unknown, ILoginResponse>("/login", data);
    },

    async logout(): Promise<void> {
        await httpClient.delete<unknown, void>("/logout");
    },
};
