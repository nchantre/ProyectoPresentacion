import { render, screen, fireEvent } from "@testing-library/react";
import OwnerModal from "../../../presentation/Owner/OwnerModal";
import type { Owner } from "../../../domain/Owner";

describe("OwnerModal", () => {
  const mockOnClose = jest.fn();
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe agregar un owner con propiedad", async () => {
    render(
      <OwnerModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} />
    );

    // Llenar datos del propietario
    fireEvent.change(screen.getByPlaceholderText("Nombre del propietario"), {
      target: { value: "Nelson" },
    });
    fireEvent.change(screen.getByPlaceholderText("Dirección del propietario"), {
      target: { value: "Calle 123" },
    });
    fireEvent.change(screen.getByPlaceholderText("URL de la foto"), {
      target: { value: "http://foto.com/foto.jpg" },
    });
    fireEvent.change(screen.getByPlaceholderText("Fecha de cumpleaños"), {
      target: { value: "1990-01-01" },
    });

    // Abrir modal de propiedad
    fireEvent.click(screen.getByText("+ Agregar Propiedad"));

    // Llenar datos de la propiedad
    fireEvent.change(screen.getByPlaceholderText("Nombre de la propiedad"), {
      target: { value: "Casa Bonita" },
    });
    fireEvent.change(screen.getByPlaceholderText("Dirección de la propiedad"), {
      target: { value: "Calle Falsa 123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Precio de la propiedad"), {
      target: { value: "500000" },
    });
    fireEvent.change(screen.getByPlaceholderText("Código interno"), {
      target: { value: "ABC123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Año de construcción"), {
      target: { value: "2020" },
    });

    // Guardar propiedad
    fireEvent.click(screen.getByRole("button", { name: "Guardar Propiedad" }));

    // Guardar Owner
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    // Verificar que se llamó a onAdd con un owner válido
    expect(mockOnAdd).toHaveBeenCalledTimes(1);

    const ownerAgregado: Owner = mockOnAdd.mock.calls[0][0];

    expect(ownerAgregado.name).toBe("Nelson");
    expect(ownerAgregado.address).toBe("Calle 123");
    expect(ownerAgregado.photo).toBe("http://foto.com/foto.jpg");
    expect(ownerAgregado.birthday).toBe("1990-01-01");

    // 🔑 Verificar que la propiedad fue incluida
    expect(ownerAgregado.properties.length).toBe(1);
    expect(ownerAgregado.properties[0].name).toBe("Casa Bonita");
    expect(ownerAgregado.properties[0].address).toBe("Calle Falsa 123");
    expect(ownerAgregado.properties[0].price).toBe(500000);
    expect(ownerAgregado.properties[0].codeInternal).toBe("ABC123");
    expect(ownerAgregado.properties[0].year).toBe(2020);
  });
});
