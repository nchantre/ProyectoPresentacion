import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OwnerForm from "../../../presentation/Owner/OwnerForm";
import type { Owner } from "../../../domain/Owner";

describe("OwnerForm", () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form inputs correctly", () => {
    render(<OwnerForm onAdd={mockOnAdd} />);

    // Usar getByPlaceholderText en lugar de getByLabelText
    expect(screen.getByPlaceholderText("Nombre del propietario")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Dirección del propietario")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("URL de la foto")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Fecha de cumpleaños")).toBeInTheDocument();
    
    // También verificar que los labels están presentes
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Dirección")).toBeInTheDocument();
    expect(screen.getByText("Foto (URL)")).toBeInTheDocument();
    expect(screen.getByText("Cumpleaños")).toBeInTheDocument();
  });

  it("allows the user to fill out the form and submit", async () => {
    const handleAdd = jest.fn();
    render(<OwnerForm onAdd={handleAdd} />);

    // Usar getByPlaceholderText para encontrar los inputs
    const nameInput = screen.getByPlaceholderText("Nombre del propietario");
    const addressInput = screen.getByPlaceholderText("Dirección del propietario");
    const photoInput = screen.getByPlaceholderText("URL de la foto");
    const birthdayInput = screen.getByPlaceholderText("Fecha de cumpleaños");

    // Llenar el formulario
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(photoInput, { target: { value: "http://example.com/photo.jpg" } });
    fireEvent.change(birthdayInput, { target: { value: "1990-01-01" } });

    // Enviar el formulario
    fireEvent.click(screen.getByRole("button", { name: /Guardar/i }));

    // Verificar que se llamó a onAdd con los datos correctos
    await waitFor(() => {
      expect(handleAdd).toHaveBeenCalledTimes(1);
    });

    const ownerAgregado: Owner = handleAdd.mock.calls[0][0];
    expect(ownerAgregado.name).toBe("John Doe");
    expect(ownerAgregado.address).toBe("123 Main St");
    expect(ownerAgregado.photo).toBe("http://example.com/photo.jpg");
    expect(ownerAgregado.birthday).toBe("1990-01-01");
  });

  it("resets the form after submission", async () => {
    const handleAdd = jest.fn();
    render(<OwnerForm onAdd={handleAdd} />);

    // Usar getByPlaceholderText para encontrar los inputs
    const nameInput = screen.getByPlaceholderText("Nombre del propietario");
    const addressInput = screen.getByPlaceholderText("Dirección del propietario");
    const birthdayInput = screen.getByPlaceholderText("Fecha de cumpleaños");
    const submitButton = screen.getByRole("button", { name: /Guardar/i });

    // Llenar y enviar el formulario
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(birthdayInput, { target: { value: "1990-01-01" } });
    fireEvent.click(submitButton);

    // Esperar a que se complete el envío
    await waitFor(() => {
      expect(handleAdd).toHaveBeenCalledTimes(1);
    });

    // Verificar que los campos se resetearon
    expect(nameInput).toHaveValue("");
    expect(addressInput).toHaveValue("");
    expect(birthdayInput).toHaveValue("");
  });

  it("shows validation errors for required fields", async () => {
    render(<OwnerForm onAdd={mockOnAdd} />);

    // Intentar enviar el formulario vacío
    fireEvent.click(screen.getByRole("button", { name: /Guardar/i }));

    // Verificar que no se llamó a onAdd
    expect(mockOnAdd).not.toHaveBeenCalled();

    // Verificar que los campos requeridos muestran validación
    const nameInput = screen.getByPlaceholderText("Nombre del propietario");
    const addressInput = screen.getByPlaceholderText("Dirección del propietario");
    const birthdayInput = screen.getByPlaceholderText("Fecha de cumpleaños");

    expect(nameInput).toBeInvalid();
    expect(addressInput).toBeInvalid();
    expect(birthdayInput).toBeInvalid();
  });
});