import { render, screen, fireEvent } from "@testing-library/react";
import TraceForm from "../../../presentation/traces/TraceForm";
import type { Trace } from "../../../domain/Trace";

describe("TraceForm", () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe agregar un trace correctamente", () => {
    render(<TraceForm onAdd={mockOnAdd} />);

    // Llenar los inputs
    fireEvent.change(screen.getByPlaceholderText("Nombre Comprador"), {
      target: { value: "Juan Perez" },
    });
    fireEvent.change(screen.getByPlaceholderText("Valor de la Venta"), {
      target: { value: "1000000" },
    });
    fireEvent.change(screen.getByPlaceholderText("Impuesto asociado a la venta"), {
      target: { value: "50000" },
    });
    fireEvent.change(screen.getByPlaceholderText("Fecha de venta"), {
      target: { value: "2025-08-25" },
    });

    // Enviar el formulario
    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));

    // Verificar que se llamó a onAdd con los datos correctos
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    const traceAgregado: Trace = mockOnAdd.mock.calls[0][0];

    expect(traceAgregado.dateSale).toBe("2025-08-25");
    expect(traceAgregado.name).toBe("Juan Perez");
    expect(traceAgregado.value).toBe(1000000);
    expect(traceAgregado.tax).toBe(50000);
  });
});
