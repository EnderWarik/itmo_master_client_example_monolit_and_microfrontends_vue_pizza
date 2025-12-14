import { IUserAddress } from "@/modules/profile/types/IUserAddress";

export type AddressDraftType = Omit<IUserAddress, "id" | "userId">;
