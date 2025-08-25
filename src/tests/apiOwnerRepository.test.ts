import { setupServer } from "msw/node";
import { rest } from "msw";
import { ApiOwnerRepository } from "../infrastructure/apiOwnerRepository";

const server = setupServer(
rest.get("https://localhost:7069/api/v1.0/RealEstate", (_, res, ctx) => {
  const fakeOwners = [
    { idOwner: "1", name: "Pedro", address: "Calle 123", photo: "", birthday: "", properties: [] }
  ];
  return res(ctx.json(fakeOwners));
}
) );



beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ApiOwnerRepository", () => {
  it("debe traer owners desde la API", async () => {
    const repo = new ApiOwnerRepository();
    const result = await repo.getAll();

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Pedro");
  });
});
