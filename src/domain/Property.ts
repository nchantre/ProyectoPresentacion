import type { Trace } from "./Trace";
import type { Image } from "./Image";

export interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  images: Image[];
  traces: Trace[];
}