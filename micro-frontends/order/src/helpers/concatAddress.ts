import { IUserAddress } from "@/types/IUserAddress";

export default function concatAddress(a: IUserAddress) {
  return [a.street, a.building, a.flat].filter(Boolean).join(" ");
}
