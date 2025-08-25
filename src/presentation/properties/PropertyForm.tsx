import { useState } from "react";
import { Save } from "lucide-react";
import type { Property } from "../../domain/Property";
import type { Image } from "../../domain/Image";

interface Props {
  onAdd: (property: Property) => void;
}

export default function PropertyForm({ onAdd }: Props) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    price: 0,
    codeInternal: "",
    year: new Date().getFullYear(),
  });

  const [images, setImages] = useState<Image[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file: URL.createObjectURL(file),
        enabled: true,
      }));
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProperty: Property = {
      id: crypto.randomUUID(),
      name: form.name,
      address: form.address,
      price: Number(form.price),
      codeInternal: form.codeInternal,
      year: Number(form.year),
      images,
      traces: [], // traces se agregan en PropertyModal
    };

    onAdd(newProperty);

    setForm({ name: "", address: "", price: 0, codeInternal: "", year: new Date().getFullYear() });
    setImages([]);
  };

  return (
<form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded-lg border-gray-300 bg-gray-50">
  <input
    type="text"
    name="name"
    placeholder="Nombre de la propiedad"
    value={form.name}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-2 py-1.5 !bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
  <input
    type="text"
    name="address"
    placeholder="Dirección de la propiedad"
    value={form.address}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-2 py-1.5 !bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
  <input
    type="number"
    name="price"
    placeholder="Precio de la propiedad"
    value={form.price}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-2 py-1.5 !bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
  <input
    type="text"
    name="codeInternal"
    placeholder="Código interno"
    value={form.codeInternal}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-2 py-1.5 !bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="number"
    name="year"
    placeholder="Año de construcción"
    value={form.year}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-2 py-1.5 !bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <div>
      <div>
        <h3 className="font-semibold mb-2">Imágenes</h3>

        {/* Contenedor de upload */}
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 bg-gray-50">
          <span className="text-gray-500">Haz click o arrastra las imágenes aquí</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

    {images.map((img, idx) => (
      <div key={idx} className="flex items-center gap-2 mb-2">
        <img src={img.file} alt={`Imagen ${idx}`} className="w-20 h-20 object-cover rounded border" />
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={img.enabled}
            onChange={(e) => {
              const newImages = [...images];
              newImages[idx].enabled = e.target.checked;
              setImages(newImages);
            }}
          />
          Habilitada
        </label>
        <button
          type="button"
          onClick={() => handleRemoveImage(idx)}
          className="text-red-600 hover:text-red-800"
        >
          Eliminar
        </button>
      </div>
    ))}
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
  >
    <Save className="w-5 h-5" /> Guardar Propiedad
  </button>
</form>

  );
}
