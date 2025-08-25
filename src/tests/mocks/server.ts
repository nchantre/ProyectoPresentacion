// src/tests/mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";


// Crear server con handlers
export const server = setupServer(...handlers);
