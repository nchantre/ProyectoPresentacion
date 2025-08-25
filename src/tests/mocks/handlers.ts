// src/tests/mocks/handlers.ts
import { http, HttpResponse } from "msw";

const API_URL = "http://localhost:5000/api/owners";

export const handlers = [
  http.get(API_URL, () => {
    return HttpResponse.json([
      { idOwner: "1", name: "Juan", address: "Calle 123" },
      { idOwner: "2", name: "Maria", address: "Carrera 45" },
    ], { status: 200 });
  }),

  http.get(`${API_URL}/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json(
      { idOwner: id, name: "Mock Owner", address: "Fake St 99" },
      { status: 200 }
    );
  }),

  http.post(API_URL, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { body, idOwner: "99" },
      { status: 201 }
    );
  }),
];
