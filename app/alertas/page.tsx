"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FiAlertCircle, FiInfo, FiCheckCircle } from "react-icons/fi";

interface Alert {
  _id: string;
  type: "Crítico" | "Aviso" | "Info";
  product: { _id: string; name: string } | string;
  message: string;
  date: string;
}

// 🔹 Mock inicial de alertas
const mockAlerts: Alert[] = [
  {
    _id: "1",
    type: "Crítico",
    product: { _id: "p1", name: "Produto A" },
    message: "Estoque abaixo do mínimo necessário!",
    date: new Date().toISOString(),
  },
  {
    _id: "2",
    type: "Aviso",
    product: { _id: "p2", name: "Produto B" },
    message: "Produto próximo da data de validade.",
    date: new Date().toISOString(),
  },
  {
    _id: "3",
    type: "Info",
    product: { _id: "p3", name: "Produto C" },
    message: "Novo lote de estoque foi adicionado.",
    date: new Date().toISOString(),
  },
];

export default function Alertas() {
  const [alerts] = useState<Alert[]>(mockAlerts);

  const getIcon = (type: string) => {
    switch (type) {
      case "Crítico":
        return <FiAlertCircle className="text-red-600 mr-2" />;
      case "Aviso":
        return <FiInfo className="text-yellow-600 mr-2" />;
      case "Info":
        return <FiCheckCircle className="text-blue-600 mr-2" />;
      default:
        return null;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "Crítico":
        return "text-red-600";
      case "Aviso":
        return "text-yellow-600";
      case "Info":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black">⚠️ Alertas</h1>
        <p className="text-gray-700">Aqui você verá todos os alertas do sistema.</p>
      </div>

      {alerts.length === 0 ? (
        <p className="text-gray-500 mt-6">Nenhum alerta encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alerts.map((alert) => (
            <div
              key={alert._id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition relative"
            >
              <p className={`flex items-center font-semibold mb-2 ${getColor(alert.type)}`}>
                {getIcon(alert.type)}
                {alert.type}
              </p>
              <h2 className="font-bold text-lg mb-1">
                {typeof alert.product === "string" ? alert.product : alert.product.name}
              </h2>
              <p className="text-gray-600 mb-2">{alert.message}</p>
              <p className="text-gray-500 text-sm">
                Data: {new Date(alert.date).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
