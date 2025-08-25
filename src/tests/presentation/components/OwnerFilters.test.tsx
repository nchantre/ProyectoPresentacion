import { render, screen, fireEvent } from "@testing-library/react";
import OwnerFilters from "../../../presentation/components/OwnerFilters";

// Mock para el ícono Search
jest.mock("lucide-react", () => ({
  Search: () => <svg data-testid="search-icon" />,
}));

describe("OwnerFilters", () => {
  const mockOnChange = jest.fn();
  const mockOnSearch = jest.fn();
  const filters = {
    name: "",
    address: "",
    price: "",
    codeInternal: "",
    year: ""
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all input fields and search button", () => {
    render(<OwnerFilters filters={filters} onChange={mockOnChange} onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Dirección")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Precio")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Código interno")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Año")).toBeInTheDocument();
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("calls onChange when typing in inputs", () => {
    render(<OwnerFilters filters={filters} onChange={mockOnChange} onSearch={mockOnSearch} />);
    
    const nameInput = screen.getByPlaceholderText("Nombre");
    fireEvent.change(nameInput, { target: { value: "Juan" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("calls onSearch when search button is clicked", () => {
    render(<OwnerFilters filters={filters} onChange={mockOnChange} onSearch={mockOnSearch} />);
    
    const searchButton = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(searchButton);
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
