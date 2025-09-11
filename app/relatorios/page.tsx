"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const mockSalesData: Record<string, any[]> = {
  Diário: [
    { month: "Seg", sales: 120 },
    { month: "Ter", sales: 200 },
    { month: "Qua", sales: 150 },
    { month: "Qui", sales: 180 },
    { month: "Sex", sales: 250 },
  ],
  Semanal: [
    { month: "Semana 1", sales: 800 },
    { month: "Semana 2", sales: 950 },
    { month: "Semana 3", sales: 700 },
    { month: "Semana 4", sales: 1100 },
  ],
  Mensal: [
    { month: "Jan 2025", sales: 3000 },
    { month: "Fev 2025", sales: 2800 },
    { month: "Mar 2025", sales: 3500 },
    { month: "Abr 2025", sales: 4000 },
  ],
};

const mockTopProducts: Record<string, any[]> = {
  Diário: [
    { name: "Produto A", quantity: 15 },
    { name: "Produto B", quantity: 12 },
    { name: "Produto C", quantity: 8 },
  ],
  Semanal: [
    { name: "Produto A", quantity: 40 },
    { name: "Produto B", quantity: 35 },
    { name: "Produto C", quantity: 25 },
  ],
  Mensal: [
    { name: "Produto A", quantity: 120 },
    { name: "Produto B", quantity: 100 },
    { name: "Produto C", quantity: 80 },
  ],
};

export default function Relatorios() {
  const [period, setPeriod] = useState("Mensal");

  const salesData = mockSalesData[period] || [];
  const topProducts = mockTopProducts[period] || [];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black">📊 Relatórios</h1>
        <p className="text-gray-700">
          Aqui você pode acompanhar o desempenho do seu estoque, vendas e compras.
        </p>
      </div>

      {/* Filtro de período */}
      <div className="mb-6">
        <label className="mr-2 font-semibold">Período:</label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Diário</option>
          <option>Semanal</option>
          <option>Mensal</option>
        </select>
      </div>

      {/* Gráfico de vendas */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Vendas por período</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de produtos mais vendidos */}
      <div>
        <h2 className="text-xl font-bold mb-2">Produtos mais vendidos</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={topProducts} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#16a34a" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}
