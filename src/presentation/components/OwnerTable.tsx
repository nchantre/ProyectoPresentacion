import type { Owner } from "../../domain/Owner";
import { Eye, Trash2 } from "lucide-react";

interface Props {
  owners: Owner[];
  onSelect: (owner: Owner) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, owner: Owner) => void;
}

export default function OwnerTable({ owners, onSelect, onDelete }: Props) {
  return (
<div className="overflow-x-auto shadow-md rounded-md max-w-3xl mx-auto">
  <table className="w-full text-left border border-gray-200 bg-white rounded-md text-sm">
    <thead>
      <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-semibold">
        <th className="p-2 border-b border-blue-700 text-left">Nombre</th>
        <th className="p-2 border-b border-blue-700 text-left">Dirección</th>
        <th className="p-2 border-b border-blue-700 text-center">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {owners.map((o, idx) => (
        <tr
          key={o.idOwner}
          className={`hover:bg-blue-50 transition ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
        >
          <td className="p-2 font-medium text-gray-800">{o.name}</td>
          <td className="p-2 text-gray-600">{o.address}</td>
          <td className="p-2 flex justify-center space-x-3">
            {/* Ver detalles */}
            <button
              onClick={() => onSelect(o)}
              className="text-blue-600 hover:text-blue-800 transition"
              title="Ver detalles"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Eliminar */}
            <button
              onClick={() => onDelete(o.idOwner)}
              className="text-blue-600 hover:text-blue-800 transition"
              title="Eliminar propietario"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

