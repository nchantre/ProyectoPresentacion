// 1. Importaciones primero
import { setupServer } from "msw/node";


const server = setupServer(/* ... */);

// 3. Luego los hooks
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// 4. Finalmente los tests
describe("ApiOwnerRepository", () => {
  // tests aquí
});