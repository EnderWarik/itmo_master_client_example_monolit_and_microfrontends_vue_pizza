import { IUserAddress } from "@/modules/profile/types/IUserAddress";

export default function concatAddress(a: IUserAddress) {
  return [a.street, a.building, a.flat].filter(Boolean).join(" ");
}
