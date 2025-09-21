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
      badge: "bg-yellow-200 text-yellow-700",
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
      badge: "bg-yellow-200 text-yellow-700",
    },
  ];

  return (
    <div className="mt-8 rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-yellow-500 h-5 w-5" />
          <h2 className="text-lg sm:text-xl font-semibold">Alertas de Stock Baixo</h2>
        </div>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm sm:text-base text-yellow-700 font-medium w-fit">
          {alerts.length} itens
        </span>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-4">
        {alerts.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 rounded-xl border p-4 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${item.color}`}
              >
                <Package className="h-6 w-6" />
              </div>
              <div className="truncate">
                <h3 className="font-medium truncate">{item.name}</h3>
                <p className="text-sm text-gray-500 truncate">
                  {item.category} • {item.supplier}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="text-right min-w-[70px]">
                <p className="text-lg font-semibold">
                  <span
                    className={
                      item.status === "Crítico"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }
                  >
                    {item.current}
                  </span>{" "}
                  / {item.total}
                </p>
                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-xs sm:text-sm font-medium ${item.badge}`}
                >
                  {item.status}
                </span>
              </div>

              <button className="flex items-center justify-center gap-1 rounded-xl border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 transition w-full sm:w-auto">
                <Plus className="h-4 w-4" /> Reabastecer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
