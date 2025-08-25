import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PropertyForm from "../../../presentation/properties/PropertyForm";
import type { Property } from "../../../domain/Property";

// Mock de URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');

describe("PropertyForm", () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
it("debe agregar una propiedad correctamente", async () => {
  render(<PropertyForm onAdd={mockOnAdd} />);

  // Rellenar inputs del formulario
  fireEvent.change(screen.getByPlaceholderText("Nombre de la propiedad"), {
    target: { value: "Casa Bonita" },
  });
  fireEvent.change(screen.getByPlaceholderText("Dirección de la propiedad"), {
    target: { value: "Calle Falsa 123" },
  });
  // ... resto de campos

  // Simular agregar imagen
  const file = new File(["dummy content"], "foto.jpg", { type: "image/jpeg" });
  const inputFile = screen.getByLabelText(/Haz click o arrastra las imágenes aquí/i);
  fireEvent.change(inputFile, { target: { files: [file] } });

  // Esperar a que la imagen se renderice
  await screen.findByAltText("Imagen 0");

  // NO es necesario hacer click en el checkbox porque ya viene habilitado por defecto
  // según tu código: `enabled: true` en handleFileChange

  // Enviar formulario
  fireEvent.click(screen.getByRole("button", { name: /guardar propiedad/i }));

  // Esperar y verificar que se llamó a onAdd con los datos correctos
  await waitFor(() => {
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  const propertyAgregada: Property = mockOnAdd.mock.calls[0][0];
  
  // La imagen debería venir habilitada por defecto
  expect(propertyAgregada.images[0].enabled).toBe(true);
});
  });  
