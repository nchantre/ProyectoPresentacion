import { useState } from "react";
import { Save } from "lucide-react";
import type { Trace } from "../../domain/Trace";

interface Props {
  onAdd: (trace: Trace) => void;
}

export default function TraceForm({ onAdd }: Props) {
  const [form, setForm] = useState({
    dateSale: "",
    name: "",
    value: 0,
    tax: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrace: Trace = {
      dateSale: form.dateSale,
      name: form.name,
      value: Number(form.value),
      tax: Number(form.tax),
    };
    onAdd(newTrace);
    setForm({ dateSale: "", name: "", value: 0, tax: 0 });
  };

  return (
<form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded-lg border-gray-300">
  <input
    type="date"
    name="dateSale"
    placeholder="Fecha de venta"
    value={form.dateSale}
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded px-2 py-1.5 !bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    name="name"
    placeholder="Nombre Comprador"
    value={form.name}
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded px-2 py-1.5 !bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="number"
    name="value"
    placeholder="Valor de la Venta"
    value={form.value}
    onChange={handleChange}
    required
    min={0}
    className="w-full border border-gray-300 rounded px-2 py-1.5 !bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="number"
    name="tax"
    placeholder="Impuesto asociado a la venta"
    value={form.tax}
    onChange={handleChange} 
    required
    min={0}
    className="w-full border border-gray-300 rounded px-2 py-1.5 !bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700"
  >
    <Save className="w-5 h-5" /> Guardar
  </button>
</form>


  );
}
