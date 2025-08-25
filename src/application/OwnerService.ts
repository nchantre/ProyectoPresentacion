import type { Owner } from "../domain/Owner";
import type { OwnerFilters, OwnerRepository } from "../domain/Repository";

export class OwnerService {
  constructor(private repo: OwnerRepository) {}

  async getOwners(): Promise<Owner[]> {
    return this.repo.getAll();
  }

  async getOwner(id: string): Promise<Owner> {
    return this.repo.getById(id);
  }

  async createOwner(owner: Owner): Promise<Owner> {
    return this.repo.create(owner);
  }

  async updateOwner(id: string, owner: Owner): Promise<Owner> {
    return this.repo.update(id, owner);
  }

  async deleteOwner(id: string): Promise<void> {
    return this.repo.delete(id);
  }

  async searchOwners(filters: OwnerFilters): Promise<Owner[]> {
    return this.repo.search(filters);
  }
}
