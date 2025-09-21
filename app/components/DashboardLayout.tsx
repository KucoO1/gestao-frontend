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
  X,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const menuItems = [
    { icon: <BarChart3 color="#f59e0b" />, label: "Dashboard", href: "/" },
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
          {/* Sidebar desktop */}
          <aside className="hidden md:flex flex-col bg-white shadow-lg w-64">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-bold text-lg">📦 StockSys</span>
            </div>
            <nav className="mt-6 flex-1 overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded cursor-pointer"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Sidebar mobile */}
          <div className="md:hidden">
            {/* Overlay */}
            {menuAberto && (
              <div
                className="fixed inset-0 bg-black opacity-30 z-40"
                onClick={() => setMenuAberto(false)}
              />
            )}

            {/* Sidebar */}
            <div
              className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                menuAberto ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold text-lg">📦 StockSys</span>
                <button onClick={() => setMenuAberto(false)}>
                  <X size={24} />
                </button>
              </div>
              <nav className="mt-6 flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuAberto(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded cursor-pointer"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Header mobile */}
            <header className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white shadow z-30">
              <button onClick={() => setMenuAberto(true)}>
                <Menu size={24} />
              </button>
              <span className="font-bold text-lg">📦 StockSys</span>
              <div /> {/* Placeholder para alinhamento */}
            </header>
          </div>

          {/* Conteúdo principal */}
          <main className="flex-1 flex flex-col overflow-y-auto pt-16 md:pt-0">
            <div className="p-4 sm:p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
