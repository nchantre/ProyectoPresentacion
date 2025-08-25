import { X } from "lucide-react";
import TraceForm from "./TraceForm";
import type { Trace } from "../../domain/Trace";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (trace: Trace) => void;
}

export default function TraceModal({ isOpen, onClose, onAdd }: Props) {
  if (!isOpen) return null;

  console.log("TraceModal montado");

  const handleAddAndClose = (trace: Trace) => {
    console.log("Agregando trace:", trace);
    onAdd(trace);
    onClose();
  };

  return (
    <div
      data-testid="trace-modal-overlay"   // 🔹 overlay con ID distinto
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-60"
    >
      <div
        data-testid="trace-modal-content"  // 🔹 el contenido real del modal
        className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[80vh] p-6 relative border border-gray-200 overflow-y-auto"
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Agregar Venta</h2>

        <TraceForm onAdd={handleAddAndClose} />
      </div>
    </div>
  );
}
