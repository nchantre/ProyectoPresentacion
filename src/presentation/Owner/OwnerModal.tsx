import { useState, useEffect } from "react";
import { Trash2, X } from "lucide-react";
import type { Owner } from "../../domain/Owner";
import type { Property } from "../../domain/Property";

import OwnerForm from "./OwnerForm";
import PropertyModal from "../properties/PropertyModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (owner: Owner) => void;
}

export default function OwnerModal({ isOpen, onClose, onAdd }: Props) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isPropertyModalOpen, setPropertyModalOpen] = useState(false);


  // Log cada vez que cambie properties
  useEffect(() => {
    console.log("Propiedades actuales:", properties);
    properties.forEach((p, idx) => {
      console.log(`Propiedad ${idx + 1}:`, p);
      console.log("Imágenes:", p.images); // Aquí ves las imágenes
    });
  }, [properties]);

  if (!isOpen) return null;

  const handleAddOwner = (ownerData: Omit<Owner, "idOwner" | "properties">) => {
    const ownerToSend = {
      idOwner: crypto.randomUUID(),
      ...ownerData,
      properties,
    };

    // Colocar un debugger para pausar la ejecución y revisar en DevTools
    debugger;

    // Log para ver qué se va a enviar
    console.log("Owner a enviar:", ownerToSend);
    console.log("Propiedades incluidas:", ownerToSend.properties);
    ownerToSend.properties.forEach((p, idx) => {
      console.log(`Propiedad ${idx + 1}:`, p);
      console.log("Imágenes de la propiedad:", p.images);
    });

    // Enviar al callback de guardado
    onAdd(ownerToSend);

    // Limpiar todos los estados para que no quede cache
    setProperties([]); // Limpia propiedades


    // Cerrar modal
    onClose();
  };

const handleRemoveProperty = (id: string) => {
  setProperties((prev) => prev.filter((p) => p.id !== id));
};

  return (
    <>
      {/* Fondo modal */}
      <div className="fixed inset-0 bg-black/40 z-40" />

      {/* Contenedor modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] p-6 relative border overflow-y-auto">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-500">
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-xl font-semibold mb-4">Agregar Owner</h2>

          <OwnerForm onAdd={handleAddOwner} />

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setPropertyModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Agregar Propiedad
            </button>
          </div>

          {/* Tabla de propiedades */}
          {properties.length > 0 && (
            <div className="mt-6 overflow-x-auto rounded-lg shadow-md border border-gray-300">
              <table className="w-full table-auto border-collapse">
                <thead className="bg-blue-100">
                  <tr className="text-blue-800 uppercase text-sm font-medium">
                    <th className="p-3 border-b border-blue-300 text-left">Nombre</th>
                    <th className="p-3 border-b border-blue-300 text-left">Precio</th>
                    <th className="p-3 border-b border-blue-300 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {properties.map((p, idx) => (
                    <tr key={p.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3">{p.name}</td>
                      <td className="p-3">${p.price.toLocaleString()}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleRemoveProperty(p.id)}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de propiedades */}
      {isPropertyModalOpen && (
        <PropertyModal
          isOpen={isPropertyModalOpen}
          onClose={() => setPropertyModalOpen(false)}
          onAdd={(property) => {
            setProperties((prev) => [...prev, property]);
            setPropertyModalOpen(false); // Cierra automáticamente PropertyModal al agregar
            console.log("Propiedad agregada:", property);
            console.log("Imágenes de la propiedad:", property.images);
          }}
        />
      )}
    </>
  );
}


