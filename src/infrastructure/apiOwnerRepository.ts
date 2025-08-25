import { ApiRepository } from "./ApiRepository";
import type { OwnerRepository, OwnerFilters } from "../domain/Repository";
import type { Owner } from "../domain/Owner";

const API_URL = "https://localhost:7069/api/v1.0/RealEstate";

export class ApiOwnerRepository
  extends ApiRepository<Owner, OwnerFilters>
  implements OwnerRepository
{
  constructor() {
    super(API_URL);
  }
}