// OwnerDetailsModal.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Owner } from "../../../domain/Owner";
import OwnerDetailsModal from "../../../presentation/components/OwnerDetailsModal";


// Mock de lucide-react si usaras iconos
jest.mock("lucide-react", () => ({
  X: () => <span data-testid="close-icon">X</span>,
}));

describe("OwnerDetailsModal", () => {
  const mockOwner: Owner = {
    idOwner: "1",
    name: "John Doe",
    address: "123 Main St",
    photo: "http://example.com/photo.jpg",
    birthday: "1990-01-01",
    properties: [
      {
        id: "prop1",
        name: "Casa Bonita",
        address: "Calle Falsa 123",
        price: 500000,
        codeInternal: "ABC123",
        year: 2020,
        images: [
          { file: "http://example.com/img1.jpg", enabled: true },
          { file: "http://example.com/img2.jpg", enabled: false },
        ],
        traces: [
          {
            dateSale: "2022-12-30",
            name: "Venta 1",
            value: 400000,
            tax: 10000,
          },
        ],
      },
    ],
  };

  const mockOnClose = jest.fn();

  it("renders modal with owner info", () => {
    render(<OwnerDetailsModal owner={mockOwner} onClose={mockOnClose} />);

    // Nombre
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Dirección
    expect(screen.getByText(mockOwner.address)).toBeInTheDocument();

    // Cumpleaños
    expect(
      screen.getByText(new Date(mockOwner.birthday).toLocaleDateString())
    ).toBeInTheDocument();

    // Propiedad
    expect(screen.getByText("Casa Bonita")).toBeInTheDocument();
    expect(screen.getByText("Calle Falsa 123")).toBeInTheDocument();
    expect(screen.getByText("$500,000")).toBeInTheDocument();
    expect(screen.getByText("ABC123")).toBeInTheDocument();
    expect(screen.getByText("2020")).toBeInTheDocument();

    // Imágenes
    const img1 = screen.getByAltText("imagen-0") as HTMLImageElement;
    expect(img1.src).toBe("http://example.com/img1.jpg");
    const img2 = screen.getByAltText("imagen-1") as HTMLImageElement;
    expect(img2.src).toBe("http://example.com/img2.jpg");

    // Historial de ventas
    expect(screen.getByText("Venta 1")).toBeInTheDocument();
    expect(screen.getByText("$400,000")).toBeInTheDocument();
    expect(screen.getByText("$10,000")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(<OwnerDetailsModal owner={mockOwner} onClose={mockOnClose} />);

    const closeButton = screen.getByText("×"); // tu botón de cerrar
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
