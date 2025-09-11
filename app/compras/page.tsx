"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import CompraModal from "../components/modals/adicionarCompras";

interface Purchase {
  _id: string;
  product: { name: string };
  supplier: { name: string };
  quantity: number;
  price: number;
  date: string;
}

export default function Compras() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);

  // 🔹 Mock inicial
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      _id: "1",
      product: { name: "Arroz 25Kg" },
      supplier: { name: "Fornecedor A" },
      quantity: 10,
      price: 15000,
      date: "2025-09-01",
    },
    {
      _id: "2",
      product: { name: "Óleo 20L" },
      supplier: { name: "Fornecedor B" },
      quantity: 5,
      price: 18000,
      date: "2025-09-05",
    },
  ]);

  // Deletar compra
  const handleDelete = (id: string) => {
    setPurchases((prev) => prev.filter((p) => p._id !== id));
  };

  // Adicionar compra
  const handleAdd = (newPurchase: Purchase) => {
    const withId = { ...newPurchase, _id: Date.now().toString() };
    setPurchases((prev) => [...prev, withId]);
    setIsModalOpen(false);
  };

  // Editar compra
  const handleEdit = (updatedPurchase: Purchase) => {
    setPurchases((prev) =>
      prev.map((p) => (p._id === updatedPurchase._id ? updatedPurchase : p))
    );
    setEditingPurchase(null);
    setIsModalOpen(false);
  };

  // Filtro
  const filteredPurchases = purchases.filter(
    (p) =>
      p.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.supplier?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">🛒 Compras</h1>
        <button
          onClick={() => {
            setEditingPurchase(null);
            setIsModalOpen(true);
          }}
          className="flex items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition transform hover:scale-105"
        >
          <FiPlus className="mr-2 text-white" size={20} /> Adicionar Compra
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Buscar por produto ou fornecedor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {filteredPurchases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPurchases.map((purchase) => (
            <div
              key={purchase._id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition relative"
            >
              {/* Produto sempre preto */}
              <h2 className="font-bold text-lg mb-2 text-black">
                {purchase.product?.name || "Produto não encontrado"}
              </h2>

              {/* Fornecedor sempre preto */}
              <p className="text-black font-medium">
                Fornecedor: {purchase.supplier?.name || "Fornecedor não encontrado"}
              </p>

              <p className="text-gray-600">Quantidade: {purchase.quantity}</p>
              <p className="text-gray-600">
                Preço Total: Kz {purchase.quantity * purchase.price}
              </p>
              <p className="text-gray-600">
                Data: {new Date(purchase.date).toLocaleDateString("pt-BR")}
              </p>

              <div className="flex justify-end mt-4 space-x-3">
                {/* Editar com azul vivo */}
                <button
                  className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110"
                  onClick={() => {
                    setEditingPurchase(purchase);
                    setIsModalOpen(true);
                  }}
                >
                  <FiEdit size={22} />
                </button>

                {/* Deletar com vermelho vivo */}
                <button
                  onClick={() => handleDelete(purchase._id)}
                  className="text-red-600 hover:text-red-800 transition-transform transform hover:scale-110"
                >
                  <FiTrash2 size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">Nenhuma compra encontrada.</p>
      )}

      {/* Modal */}
      <CompraModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPurchase(null);
        }}
        onAdd={handleAdd}
        onEdit={handleEdit}
        editingPurchase={editingPurchase}
      />
    </DashboardLayout>
  );
}
