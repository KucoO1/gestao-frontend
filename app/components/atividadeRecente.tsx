import { ArrowDownRight, ArrowUpRight, Package } from "lucide-react";

interface Activity {
  id: number;
  title: string;
  amount: string;
  quantity: string;
  source: string;
  type: "entrada" | "saida" | "alerta";
  time: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Smartphone Samsung Galaxy",
    amount: "KZ15,000",
    quantity: "50x",
    source: "TechDistribuição",
    type: "entrada",
    time: "há 2 horas",
  },
  {
    id: 2,
    title: "Notebook Lenovo ThinkPad",
    amount: "KZ8,400",
    quantity: "12x",
    source: "Venda Online",
    type: "saida",
    time: "há 4 horas",
  },
  {
    id: 3,
    title: "Mouse Wireless Logitech",
    amount: "KZ2,500",
    quantity: "100x",
    source: "TechParts Ltd",
    type: "entrada",
    time: "há 6 horas",
  },
  {
    id: 4,
    title: "Cabo USB-C",
    amount: "KZ125",
    quantity: "5x",
    source: "Stock Baixo",
    type: "alerta",
    time: "há 8 horas",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Atividade Recente</h2>

      <div className="flex flex-col gap-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
          >
            {/* Ícone + Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {activity.type === "entrada" && (
                <ArrowUpRight className="text-green-500 h-5 w-5 flex-shrink-0" />
              )}
              {activity.type === "saida" && (
                <ArrowDownRight className="text-red-500 h-5 w-5 flex-shrink-0" />
              )}
              {activity.type === "alerta" && (
                <Package className="text-yellow-500 h-5 w-5 flex-shrink-0" />
              )}

              <div className="truncate">
                <p className="font-medium truncate">{activity.title}</p>
                <p className="text-sm text-gray-500 truncate">
                  {activity.quantity} • {activity.source}
                </p>
              </div>
            </div>

            {/* Valor + Status + Tempo */}
            <div className="flex flex-col sm:items-end mt-2 sm:mt-0 gap-1">
              <p className="font-semibold">{activity.amount}</p>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 justify-start sm:justify-end">
                {activity.type === "entrada" && (
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    entrada
                  </span>
                )}
                {activity.type === "saida" && (
                  <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                    saída
                  </span>
                )}
                {activity.type === "alerta" && (
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
                    alerta
                  </span>
                )}
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
