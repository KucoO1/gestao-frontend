"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "./components/DashboardLayout";
import StockAlerts from "./components/alertasStock";
import RecentActivity from "./components/atividadeRecente";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Package, Users, ShoppingCart, BarChart3 } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

type CardsData = {
  produtos: number;
  fornecedores: number;
  vendas: number;
  relatorios: number;
};

// Mock Data
const mockCards: CardsData = {
  produtos: 120,
  fornecedores: 45,
  vendas: 320,
  relatorios: 18,
};

const mockVendasMensais = [
  { mes: "Jan", vendas: 120 },
  { mes: "Fev", vendas: 200 },
  { mes: "Mar", vendas: 150 },
  { mes: "Abr", vendas: 300 },
  { mes: "Mai", vendas: 250 },
  { mes: "Jun", vendas: 400 },
  { mes: "Jul", vendas: 350 },
  { mes: "Ago", vendas: 500 },
];

export default function DashboardPage() {
  const [cards, setCards] = useState<CardsData>({
    produtos: 0,
    fornecedores: 0,
    vendas: 0,
    relatorios: 0,
  });
  const [vendasMensais, setVendasMensais] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setCards(mockCards);
      setVendasMensais(mockVendasMensais);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <DashboardLayout>
  <div className="p-4 sm:p-6 space-y-6">
    <h1 className="text-xl sm:text-2xl font-bold">📊 Dashboard</h1>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/** Cada Card */}
      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm sm:text-base font-medium">Produtos</CardTitle>
          <Package className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-2xl font-bold">{cards.produtos}</p>
          <p className="text-xs text-muted-foreground">Total cadastrados</p>
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm sm:text-base font-medium">Fornecedores</CardTitle>
          <Users className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-2xl font-bold">{cards.fornecedores}</p>
          <p className="text-xs text-muted-foreground">Parceiros ativos</p>
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm sm:text-base font-medium">Vendas</CardTitle>
          <ShoppingCart className="h-5 w-5 text-orange-500" />
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-2xl font-bold">{cards.vendas}</p>
          <p className="text-xs text-muted-foreground">No último mês</p>
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm sm:text-base font-medium">Relatórios</CardTitle>
          <BarChart3 className="h-5 w-5 text-purple-500" />
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-2xl font-bold">{cards.relatorios}</p>
          <p className="text-xs text-muted-foreground">Gerados este mês</p>
        </CardContent>
      </Card>
    </div>

    {/* Gráfico */}
    <Card className="shadow-md p-4 sm:p-6 w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Vendas Mensais</h2>
      <div className="w-full h-64 sm:h-80 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={vendasMensais}>
            <defs>
              <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="mes"/>
            <YAxis/>
            <Tooltip/>
            <Area
              type="monotone"
              dataKey="vendas"
              stroke="#4F46E5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorVendas)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>

    {/* Componentes adicionais */}
    <div className="space-y-6">
      <StockAlerts  />
      <RecentActivity  />
    </div>
  </div>
</DashboardLayout>

  );
}
