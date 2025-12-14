import { httpClient } from "@/http/httpClient";

export const cartApi = {
  async getExtras(): Promise<any[]> {
    return httpClient.get("/misc");
  },
};
