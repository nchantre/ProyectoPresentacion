import { Search } from "lucide-react";

type Props = {
  filters: {
    name: string;
    address: string;
    price: string;
    codeInternal: string;
    year: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export default function OwnerFilters({ filters, onChange, onSearch }: Props) {
  return (
<div className="flex justify-center">
  <div className="p-3 mb-3 bg-white rounded-md shadow border max-w-3xl border-gray-200 w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 items-center">
      <input
        name="name"
        placeholder="Nombre"
        value={filters.name}
        onChange={onChange}
        className="border border-gray-300 rounded px-1.5 py-1 text-xs w-full focus:ring-1 focus:ring-blue-400 outline-none"
      />
      <input
        name="address"
        placeholder="Dirección"
        value={filters.address}
        onChange={onChange}
        className="border border-gray-300 rounded px-1.5 py-1 text-xs w-full focus:ring-1 focus:ring-blue-400 outline-none"
      />
      <input
        name="price"
        placeholder="Precio"
        value={filters.price}
        onChange={onChange}
        className="border border-gray-300 rounded px-1.5 py-1 text-xs w-full focus:ring-1 focus:ring-blue-400 outline-none"
      />
      <input
        name="codeInternal"
        placeholder="Código interno"
        value={filters.codeInternal}
        onChange={onChange}
        className="border border-gray-300 rounded px-1.5 py-1 text-xs w-full focus:ring-1 focus:ring-blue-400 outline-none"
      />
      <input
        name="year"
        placeholder="Año"
        value={filters.year}
        onChange={onChange}
        className="border border-gray-300 rounded px-1.5 py-1 text-xs w-full focus:ring-1 focus:ring-blue-400 outline-none"
      />

      <div className="flex justify-end">
        <button
          onClick={onSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 rounded shadow-sm transition w-full md:w-auto flex items-center justify-center text-xs"
          title="Buscar"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</div>


  );
}
