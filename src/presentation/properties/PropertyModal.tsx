import { HomeIcon, TrashIcon, X } from "lucide-react";
import PropertyForm from "./PropertyForm";
import TraceModal from "../traces/TraceModal";
import type { Property } from "../../domain/Property";
import type { Trace } from "../../domain/Trace";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (property: Property) => void;
}

export default function PropertyModal({ isOpen, onClose, onAdd }: Props) {
  const [traces, setTraces] = useState<Trace[]>([]);
  const [isTraceModalOpen, setTraceModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleAddTrace = (trace: Trace) => setTraces(prev => [...prev, trace]);
  const handleRemoveTrace = (index: number) =>
    setTraces(prev => prev.filter((_, i) => i !== index));
  const handleAddProperty = (property: Property) =>
    onAdd({ ...property, traces });

  return (
    <>
      {/* 🔹 Overlay sin testid */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"></div>

      {/* 🔹 Contenido con testid único */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div
          data-testid="property-modal-content"
          className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] p-6 relative border border-gray-200 overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-semibold mb-4">Agregar Propiedad</h2>

          <PropertyForm onAdd={handleAddProperty} />

          {traces.length > 0 && (
            <table className="w-full text-left border border-gray-300 rounded-lg mt-4 shadow-sm">
              <thead className="bg-blue-600 text-white text-sm uppercase font-semibold">
                <tr>
                  <th className="p-3 border-b border-blue-500">Fecha</th>
                  <th className="p-3 border-b border-blue-500">Comprador</th>
                  <th className="p-3 border-b border-blue-500">Valor</th>
                  <th className="p-3 border-b border-blue-500">Impuesto</th>
                  <th className="p-3 border-b border-blue-500">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {traces.map((t, idx) => (
                  <tr
                    key={idx}
                    className={
                      idx % 2 === 0
                        ? "bg-white hover:bg-blue-50"
                        : "bg-gray-50 hover:bg-blue-50"
                    }
                  >
                    <td className="p-3 text-gray-700">{t.dateSale}</td>
                    <td className="p-3 text-gray-700">{t.name}</td>
                    <td className="p-3 text-gray-700">{t.value}</td>
                    <td className="p-3 text-gray-700">{t.tax}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleRemoveTrace(idx)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setTraceModalOpen(true)}
              className="relative group p-2 rounded hover:bg-gray-100"
            >
              <HomeIcon className="w-6 h-6 text-blue-600" />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                + Agregar Venta
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 TraceModal con su propio testid */}
      {isTraceModalOpen && (
        <TraceModal
          isOpen={isTraceModalOpen}
          onClose={() => setTraceModalOpen(false)}
          onAdd={handleAddTrace}
        />
      )}
    </>
  );
}
