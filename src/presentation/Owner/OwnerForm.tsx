// src/components/owners/OwnerForm.tsx
import { useState } from "react";
import { Save } from "lucide-react";
import type { Owner } from "../../domain/Owner";

interface Props {
  onAdd: (owner: Owner) => void;
}

export default function OwnerForm({ onAdd }: Props) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    photo: "",
    birthday: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOwner: Owner = {
      idOwner: crypto.randomUUID(),
      name: form.name,
      address: form.address,
      photo: form.photo,
      birthday: form.birthday,
      properties: [],
    };

    onAdd(newOwner);
    setForm({ name: "", address: "", photo: "", birthday: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded-lg border-gray-300">
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          name="name"
          placeholder="Nombre del propietario"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-2 py-1.5 mt-1 focus:ring focus:ring-blue-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Dirección</label>
        <input
          type="text"
          name="address"
          placeholder="Dirección del propietario"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-2 py-1.5 mt-1 focus:ring focus:ring-blue-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Foto (URL)</label>
        <input
          type="url"
          name="photo"
          placeholder="URL de la foto"
          value={form.photo}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1.5 mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Cumpleaños</label>
        <input
          type="date"
          name="birthday"
          placeholder="Fecha de cumpleaños"
          value={form.birthday}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-2 py-1.5 mt-1"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" /> Guardar
      </button>
    </form>
  );
}
