// src/tests/presentation/components/OwnerFilters.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import OwnerFilters from "../../../presentation/components/OwnerFilters";


// Mock del ícono Search de lucide-react
jest.mock("lucide-react", () => ({
  Search: () => <svg data-testid="search-icon" />,
}));

describe("OwnerFilters", () => {
  const filters = {
    name: "",
    address: "",
    price: "",
    codeInternal: "",
    year: ""
  };
  const onChange = jest.fn();
  const onSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all filter inputs and search button", () => {
    render(<OwnerFilters filters={filters} onChange={onChange} onSearch={onSearch} />);
    
    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Dirección")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Precio")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Código interno")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Año")).toBeInTheDocument();
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("calls onChange when input changes", () => {
    render(<OwnerFilters filters={filters} onChange={onChange} onSearch={onSearch} />);
    
    const nameInput = screen.getByPlaceholderText("Nombre");
    fireEvent.change(nameInput, { target: { value: "Juan" } });
    
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("calls onSearch when search button is clicked", () => {
    render(<OwnerFilters filters={filters} onChange={onChange} onSearch={onSearch} />);
    
    const searchButton = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(searchButton);
    
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
