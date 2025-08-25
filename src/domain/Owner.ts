import type { Property } from "./Property";

export interface Owner {
  idOwner: string;
  name: string;
  address: string;
  photo: string;
  birthday: string;
  properties: Property[];
}