// tests/ownerService.test.ts
import { OwnerService } from "../application/OwnerService";
import { Owner } from "../domain/Owner";
import {OwnerRepository } from "../domain/Repository";

describe("OwnerService", () => {
  let mockRepo: jest.Mocked<OwnerRepository>;
  let service: OwnerService;

  beforeEach(() => {
    // Crear un repo simulado
    mockRepo = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      search: jest.fn(),
    };

    service = new OwnerService(mockRepo);
  });

  it("debe obtener todos los owners", async () => {
    const fakeOwners: Owner[] = [
      { idOwner: "1", name: "Juan", address: "Calle 1", photo: "", birthday: "", properties: [] }
    ];
    mockRepo.getAll.mockResolvedValue(fakeOwners);

    const result = await service.getOwners();

    expect(result).toEqual(fakeOwners);
    expect(mockRepo.getAll).toHaveBeenCalledTimes(1);
  });

  it("debe crear un owner", async () => {
    const newOwner: Owner = { idOwner: "2", name: "Ana", address: "Calle 2", photo: "", birthday: "", properties: [] };
    mockRepo.create.mockResolvedValue(newOwner);

    const result = await service.createOwner(newOwner);

    expect(result).toEqual(newOwner);
    expect(mockRepo.create).toHaveBeenCalledWith(newOwner);
  });
});
