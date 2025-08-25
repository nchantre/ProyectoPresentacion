import type { GenericRepository } from "./GenericRepository";
import type { Owner } from "./Owner";

// Filtros específicos de Owner
export interface OwnerFilters {
  name?: string;
  address?: string;
  price?: number;
  codeInternal?: string;
  year?: number;
}

// OwnerRepository ahora se apoya en el genérico
export type OwnerRepository = GenericRepository<Owner, OwnerFilters>;