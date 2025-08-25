import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";

import type { Owner } from "../domain/Owner";
import OwnerModal from "./Owner/OwnerModal";



import { ApiOwnerRepository } from "../infrastructure/apiOwnerRepository";
import OwnerFilters from "./components/OwnerFilters";
import OwnerTable from "./components/OwnerTable";
import OwnerDetailsModal from "./components/OwnerDetailsModal";
import { OwnerService } from "../application/OwnerService";

// Crear instancia del servicio
const service = new OwnerService(new ApiOwnerRepository());

export default function App() {


  const [owners, setOwners] = useState<Owner[]>([]);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
    price: "",
    codeInternal: "",
    year: "",
  });
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Cargar lista inicial de owners
  useEffect(() => {
    const loadOwners = async () => {
      const data = await service.getOwners();
      setOwners(data);
    };
    loadOwners();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSearch = async () => {
    const parsedFilters = {
      ...filters,
      price: filters.price ? Number(filters.price) : undefined,
      year: filters.year ? Number(filters.year) : undefined,
    };

    const result = Object.values(filters).every((v) => !v)
      ? await service.getOwners()
      : await service.searchOwners(parsedFilters);

    setOwners(result);
  };

  const handleAddOwner = async (owner: Owner) => {
    console.log("Owner a guardar:", owner);
    owner.properties.forEach((p, idx) => {
      console.log(`Propiedad ${idx + 1}:`, p);
      console.log("Imágenes de la propiedad:", p.images);
    });

    const savedOwner = await service.createOwner(owner);
    setOwners((prev) => [...prev, savedOwner]);
    setIsFormOpen(false);
  };

  const handleDeleteOwner = async (id: string) => {
    await service.deleteOwner(id);
    setOwners((prev) => prev.filter((o) => o.idOwner !== id));
  };

  const handleUpdateOwner = async (id: string, updatedOwner: Owner) => {
    const updated = await service.updateOwner(id, updatedOwner);
    setOwners((prev) =>
      prev.map((o) => (o.idOwner === id ? updated : o))
    );
  };

  return (
    <div className="p-4">
      {/* Botón abrir modal */}
<div className="flex justify-start ml-4">
  <button
    onClick={() => setIsFormOpen(true)}
    className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
    title="Nuevo propietario"
  >
    <UserPlus className="w-5 h-5" />
  </button>
</div>

      {/* Filtros */}
      <OwnerFilters
        filters={filters}
        onChange={handleChange}
        onSearch={handleSearch}
      />

      {/* Tabla desktop */}
      <div className="mt-6 hidden md:block">
        <OwnerTable
          owners={owners}
          onSelect={setSelectedOwner}
          onDelete={handleDeleteOwner}
          onUpdate={handleUpdateOwner}
        />
      </div>



      {/* Modal detalles */}
      {selectedOwner && (
        <OwnerDetailsModal
          owner={selectedOwner}
          onClose={() => setSelectedOwner(null)}
        />
      )}

      {/* Modal formulario */}
      <OwnerModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onAdd={handleAddOwner}
      />
    </div>
  );
}
