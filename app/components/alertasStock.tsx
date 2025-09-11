import { AlertTriangle, Package, Plus } from "lucide-react";

export default function StockAlerts() {
  const alerts = [
    {
      id: 1,
      name: "Cabo USB-C Premium",
      category: "Acessórios",
      supplier: "TechParts Ltd",
      current: 5,
      total: 20,
      status: "Crítico",
      color: "bg-red-100 text-red-600",
      badge: "bg-red-500 text-white",
    },
    {
      id: 2,
      name: "Fone de Ouvido Bluetooth",
      category: "Audio",
      supplier: "AudioMax",
      current: 12,
      total: 25,
      status: "Atenção",
      color: "bg-yellow-100 text-yellow-600",
      badge: "bg-gray-200 text-gray-600",
    },
    {
      id: 3,
      name: "Carregador Portátil 10000mAh",
      category: "Energia",
      supplier: "PowerTech",
      current: 8,
      total: 15,
      status: "Atenção",
      color: "bg-yellow-100 text-yellow-600",
      badge: "bg-gray-200 text-gray-600",
    },
  ];

  return (
    <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-yellow-500" />
          <h2 className="text-lg font-semibold">Alertas de Stock Baixo</h2>
        </div>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
          {alerts.length} itens
        </span>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {alerts.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border p-4 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
              >
                <Package />
              </div>
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.category} • {item.supplier}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-lg font-semibold">
                  <span
                    className={
                      item.status === "Crítico" ? "text-red-600" : "text-yellow-600"
                    }
                  >
                    {item.current}
                  </span>{" "}
                  / {item.total}
                </p>
                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${item.badge}`}
                >
                  {item.status}
                </span>
              </div>

              <button className="flex items-center gap-1 rounded-xl border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
                <Plus className="h-4 w-4" /> Reabastecer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
