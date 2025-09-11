"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function Definicoes() {
  const [company, setCompany] = useState({
    name: "Minha Empresa",
    address: "Rua Principal, nº 123, Luanda",
    email: "contato@empresa.com",
    phone: "912345678",
  });

  const [preferences, setPreferences] = useState({
    currency: "USD",
    language: "Português",
    dateFormat: "DD/MM/YYYY",
  });

  const handleCompanyChange = (e: { target: { name: any; value: any; }; }) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handlePreferencesChange = (e: { target: { name: any; value: any; }; }) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Aqui você pode integrar com backend para salvar as definições
    alert("Definições salvas com sucesso!");
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 text-black">⚙️ Definições</h1>

      {/* Informações da empresa */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Informações da Empresa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handleCompanyChange}
            placeholder="Nome da Empresa"
            className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            value={company.address}
            onChange={handleCompanyChange}
            placeholder="Endereço"
            className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={company.email}
            onChange={handleCompanyChange}
            placeholder="Email"
            className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="phone"
            value={company.phone}
            onChange={handleCompanyChange}
            placeholder="Telefone"
            className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Preferências do sistema */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Preferências do Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="currency"
            value={preferences.currency}
            onChange={handlePreferencesChange}
            className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="USD">USD</option>
            <option value="AOA">AOA</option>
            <option value="EUR">EUR</option>
          </select>

          <select
            name="language"
            value={preferences.language}
            onChange={handlePreferencesChange}
            className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Português">Português</option>
            <option value="Inglês">Inglês</option>
          </select>

          <select
            name="dateFormat"
            value={preferences.dateFormat}
            onChange={handlePreferencesChange}
            className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>

      {/* Botão de salvar */}
      <div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          💾 Salvar Definições
        </button>
      </div>
    </DashboardLayout>
  );
}
