"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  RefreshCcw,
  AlertTriangle,
  FileText,
  Settings,
  UserCog,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [menuAberto, setMenuAberto] = useState(true);

  const menuItems = [
    { icon: <BarChart3 color="#f59e0b" />, label: "Dashboard", href: "/" }, // página inicial
    { icon: <Package color="#2563eb" />, label: "Produtos", href: "/produtos" },
    { icon: <Users color="#16a34a" />, label: "Fornecedores", href: "/fornecedores" },
    { icon: <ShoppingCart color="#9333ea" />, label: "Compras", href: "/compras" },
    { icon: <DollarSign color="#22c55e" />, label: "Vendas", href: "/vendas" },
    { icon: <RefreshCcw color="#0ea5e9" />, label: "Movimentações", href: "/movimentacoes" },
    { icon: <AlertTriangle color="#dc2626" />, label: "Alertas", href: "/alertas" },
    { icon: <FileText color="#6b7280" />, label: "Relatórios", href: "/relatorios" },
    { icon: <UserCog color="#d946ef" />, label: "Utilizadores", href: "/utilizadores" },
    { icon: <Settings color="#475569" />, label: "Definições", href: "/definicoes" },
  ];

  return (
    <html lang="pt">
      <body>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <aside
            className={`bg-white shadow-lg transition-all duration-300 ${
              menuAberto ? "w-64" : "w-16"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span
                className={`${
                  menuAberto ? "block" : "hidden"
                } font-bold text-lg`}
              >
                📦 StockSys
              </span>
              <button onClick={() => setMenuAberto(!menuAberto)}>
                <Menu size={24} />
              </button>
            </div>

            <nav className="mt-6">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {item.icon}
                      {menuAberto && <span>{item.label}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Conteúdo principal */}
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
