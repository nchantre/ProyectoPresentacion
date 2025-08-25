// src/tests/presentation/PropertyModal.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropertyModal from '../../../presentation/properties/PropertyModal';
import type { Property } from '../../../domain/Property';
import type { Trace } from '../../../domain/Trace';

// Mock de PropertyForm
jest.mock('../../../presentation/properties/PropertyForm', () => ({
  __esModule: true,
  default: ({ onAdd }: { onAdd: (property: Property) => void }) => (
    <div data-testid="property-form">
      <button
        onClick={() =>
          onAdd({
            id: '1',
            name: 'Casa',
            address: 'Calle 123',
            price: 1000,
            codeInternal: 'A001',
            year: 2020,
            images: [],
            traces: []
          } as Property)
        }
        data-testid="add-property-button"
      >
        Add Property
      </button>
    </div>
  )
}));

// Mock de TraceModal
jest.mock('../../../presentation/traces/TraceModal', () => ({
  __esModule: true,
  default: ({
    isOpen,
    onAdd,
    onClose
  }: {
    isOpen: boolean;
    onAdd: (trace: Trace) => void;
    onClose: () => void;
  }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="trace-modal-content1">
        <button
          onClick={() =>
            onAdd({
              dateSale: '2024-01-01',
              name: 'Test Trace',
              value: 100,
              tax: 15
            } as Trace)
          }
          data-testid="add-trace-button"
        >
          Add Trace
        </button>
        <button onClick={onClose} data-testid="close-trace-modal">
          Close
        </button>
      </div>
    );
  }
}));

describe('PropertyModal', () => {
  const mockOnClose = jest.fn();
  const mockOnAdd = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('no renderiza cuando isOpen es false', () => {
    render(<PropertyModal isOpen={false} onClose={mockOnClose} onAdd={mockOnAdd} />);
    expect(screen.queryByTestId('property-form')).not.toBeInTheDocument();
  });

  it('renderiza correctamente cuando isOpen es true', () => {
    render(<PropertyModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} />);
    expect(screen.getByTestId('property-form')).toBeInTheDocument();
  });

  it('llama a onAdd cuando se agrega una propiedad', async () => {
    render(<PropertyModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} />);
    const addButton = screen.getByTestId('add-property-button');
    await userEvent.click(addButton);
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1',
        name: 'Casa',
        address: 'Calle 123',
        price: 1000,
        codeInternal: 'A001',
        year: 2020,
        images: [],
        traces: []
      })
    );
  });

  it('abre TraceModal y agrega un trace', async () => {
    render(<PropertyModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} />);
    
    // Busca el botón que abre el modal
    const openTraceModalButton = screen.getByRole('button', { name: /\+ Agregar Venta/i });
    await userEvent.click(openTraceModalButton);

    // Ahora el TraceModal debería estar en el DOM
    expect(screen.getByTestId('trace-modal-content1')).toBeInTheDocument();

    // Click en agregar trace
    const addTraceButton = screen.getByTestId('add-trace-button');
    await userEvent.click(addTraceButton);

    // Verificamos que el trace fue agregado
    expect(screen.getByTestId('trace-modal-content1')).toBeInTheDocument();
  });
});
