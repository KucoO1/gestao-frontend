"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FiSearch, FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";

interface Movement {
  _id: string;
  type: "Entrada" | "Saída";
  product: { _id: string; name: string } | string;
  partner: string;
  quantity: number;
  value: number;
  date: string;
}

// 🔹 Mock de movimentações
const mockMovements: Movement[] = [
  {
    _id: "1",
    type: "Entrada",
    product: { _id: "p1", name: "Camiseta Maiomb" },
    partner: "Fornecedor A",
    quantity: 50,
    value: 250000,
    date: "2025-09-05T10:00:00Z",
  },
  {
    _id: "2",
    type: "Saída",
    product: { _id: "p2", name: "Tênis Street" },
    partner: "Cliente B",
    quantity: 2,
    value: 24000,
    date: "2025-09-07T15:30:00Z",
  },
  {
    _id: "3",
    type: "Entrada",
    product: "Relógio Clássico",
    partner: "Fornecedor C",
    quantity: 5,
    value: 100000,
    date: "2025-09-09T09:15:00Z",
  },
];

export default function Movimentacoes() {
  const [search, setSearch] = useState("");
  const [movements] = useState<Movement[]>(mockMovements);

  // 🔍 Filtrar movimentações
  const filteredMovements = movements.filter(
    (m) =>
      (typeof m.product === "string"
        ? m.product.toLowerCase()
        : m.product.name.toLowerCase()
      ).includes(search.toLowerCase()) ||
      m.partner.toLowerCase().includes(search.toLowerCase()) ||
      m.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black flex items-center gap-2">
          🔄 Movimentações
        </h1>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Buscar por produto, tipo ou parceiro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {filteredMovements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovements.map((movement) => (
            <div
              key={movement._id}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition relative border border-gray-100"
            >
              <h2 className="font-bold text-lg mb-2 text-gray-900">
                {typeof movement.product === "string"
                  ? movement.product
                  : movement.product.name}
              </h2>

              {/* Tipo com ícone vivo */}
              <p className="flex items-center font-semibold mb-2">
                {movement.type === "Entrada" ? (
                  <FiArrowDownCircle className="text-green-500 text-2xl drop-shadow-md mr-2" />
                ) : (
                  <FiArrowUpCircle className="text-red-500 text-2xl drop-shadow-md mr-2" />
                )}
                <span
                  className={
                    movement.type === "Entrada"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {movement.type}
                </span>
              </p>

              {/* Infos adicionais */}
              <p className="text-gray-700">
                Parceiro: <span className="font-medium">{movement.partner}</span>
              </p>
              <p className="text-gray-700">
                Quantidade:{" "}
                <span className="font-medium">{movement.quantity}</span>
              </p>
              <p className="text-gray-700">
                Total:{" "}
                <span className="font-semibold text-black">
                  Kz {movement.value.toLocaleString("pt-BR")}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(movement.date).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">Nenhuma movimentação encontrada.</p>
      )}
    </DashboardLayout>
  );
}
