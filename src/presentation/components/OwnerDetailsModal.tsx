import type { Owner } from "../../domain/Owner";

type Props = {
  owner: Owner;
  onClose: () => void;
};

export default function OwnerDetailsModal({ owner, onClose }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-6 relative animate-fadeIn scale-95">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-xl font-semibold">Detalles del Propietario</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Tarjeta con datos del propietario */}
        <div className="flex items-center gap-6 mb-6 border rounded-lg p-4 shadow-sm bg-gray-50">
          <div>
            <h4 className="text-lg font-semibold">{owner.name}</h4>
            <p><strong>Dirección:</strong> {owner.address}</p>
            <p>
              <strong>Cumpleaños:</strong>{" "}
              {new Date(owner.birthday).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Tabla de propiedades */}
        <h4 className="text-lg font-semibold mb-2">Propiedades</h4>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-300 text-sm shadow-md rounded-lg overflow-hidden">
  <thead className="bg-blue-600 text-white">
    <tr>
      <th className="px-4 py-3 text-left">Nombre</th>
      <th className="px-4 py-3 text-left">Dirección</th>
      <th className="px-4 py-3 text-left">Precio</th>
      <th className="px-4 py-3 text-left">Código</th>
      <th className="px-4 py-3 text-left">Año</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
    {owner.properties.map((p) => (
      <tr key={p.id} className="hover:bg-gray-100 transition">
        <td className="px-4 py-2 font-medium text-gray-800">{p.name}</td>
        <td className="px-4 py-2">{p.address}</td>
        <td className="px-4 py-2 text-green-600 font-semibold">
          ${p.price.toLocaleString()}
        </td>
        <td className="px-4 py-2">{p.codeInternal}</td>
        <td className="px-4 py-2">{p.year}</td>
      </tr>
    ))}
  </tbody>
</table>

        </div>

        {/* Tabla de imágenes */}
      {owner.properties.map((p) => (
        <div key={p.id} className="mb-6">
          <h4 className="text-lg font-semibold mb-2">
            Imágenes de: {p.name}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm shadow-md rounded-lg overflow-hidden border border-gray-300">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Imagen</th>
            <th className="px-4 py-3 text-left">Habilitada</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {p.images.map((img, idx) => (
            <tr key={idx} className="hover:bg-gray-100 transition">
              <td className="px-4 py-2">
                <img
                  src={img.file}
                  alt={`imagen-${idx}`}
                  className="w-32 h-20 object-cover rounded border"
                />
              </td>
              <td
                className={`px-4 py-2 font-semibold ${
                  img.enabled ? "text-green-600" : "text-red-600"
                }`}
              >
                {img.enabled ? "Sí" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

          </div>
        </div>
      ))}

        {/* Trace*/}

        {owner.properties.map((p) => (
          <div key={p.id} className="mb-6">
            <h4 className="text-lg font-semibold mb-2">
              Historial de ventas de: {p.name}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm shadow-md rounded-lg overflow-hidden border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Fecha de venta</th>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Valor</th>
              <th className="px-4 py-3 text-left">Impuesto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {p.traces.map((t, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 transition"
              >
                <td className="px-4 py-2 font-medium text-gray-800">
                  {new Date(t.dateSale).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{t.name}</td>
                <td className="px-4 py-2 text-green-600 font-semibold">
                  ${t.value.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-red-600 font-semibold">
                  ${t.tax.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

            </div>
          </div>
        ))}


      </div>
    </div>
  );
}
