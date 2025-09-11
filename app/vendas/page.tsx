"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import AddSaleModal from "../components/modals/adicionarVendas";
import { toast } from "react-hot-toast";

// Mock Data 🔥
const mockProducts = [
  { _id: "p1", name: "Notebook Dell XPS 13" },
  { _id: "p2", name: "iPhone 15 Pro" },
  { _id: "p3", name: "Cadeira Gamer Redragon" },
];

const mockSales = [
  {
    _id: "s1",
    product: { _id: "p1", name: "Notebook Dell XPS 13" },
    customer: "João Silva",
    quantity: 1,
    total: 850000,
    date: "2025-08-20T14:32:00",
  },
  {
    _id: "s2",
    product: { _id: "p2", name: "iPhone 15 Pro" },
    customer: "Maria Santos",
    quantity: 2,
    total: 1400000,
    date: "2025-08-21T10:15:00",
  },
  {
    _id: "s3",
    product: { _id: "p3", name: "Cadeira Gamer Redragon" },
    customer: "Carlos Almeida",
    quantity: 1,
    total: 150000,
    date: "2025-08-22T18:00:00",
  },
];

export default function Vendas() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sales, setSales] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para edição
  const [editingSale, setEditingSale] = useState<any | null>(null);

  // Simula fetch de vendas e produtos
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSales(mockSales);
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Adicionar ou atualizar venda
  const handleSaveSale = (sale: any) => {
    try {
      if (editingSale) {
        // Atualizar venda
        const updated = { ...editingSale, ...sale };
        setSales((prev) =>
          prev.map((s) => (s._id === updated._id ? updated : s))
        );
        toast.success("Venda atualizada com sucesso!");
      } else {
        // Criar nova venda
        const newSale = {
          _id: `s${Date.now()}`,
          ...sale,
          date: new Date().toISOString(),
        };
        setSales((prev) => [...prev, newSale]);
        toast.success("Venda adicionada com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao salvar venda:", err);
      toast.error("Erro ao salvar venda!");
    } finally {
      setIsModalOpen(false);
      setEditingSale(null);
    }
  };

  // Deletar venda
  const handleDelete = (id: string) => {
    try {
      setSales((prev) => prev.filter((s) => s._id !== id));
      toast.success("Venda deletada!");
    } catch (err) {
      console.error("Erro ao deletar venda:", err);
      toast.error("Erro ao deletar venda!");
    }
  };

  const filteredSales = sales.filter(
    (s) =>
      s.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.customer?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">💰 Vendas</h1>
        <button
          onClick={() => {
            setEditingSale(null);
            setIsModalOpen(true);
          }}
          className="flex items-center bg-yellow-600 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-700 transition"
        >
          <FiPlus className="mr-2" /> Adicionar Venda
        </button>
      </div>

      {/* Barra de pesquisa */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Buscar por produto ou cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Lista de vendas */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-8 h-8 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-3 text-gray-600">Carregando vendas...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSales.map((sale) => (
            <div
              key={sale._id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition relative"
            >
              <h2 className="font-bold text-lg mb-2">
                {typeof sale.product === "string"
                  ? products.find(
                      (p) => p._id === sale.product || p.id === sale.product
                    )?.name || "Produto não encontrado"
                  : sale.product?.name}
              </h2>

              <p className="text-gray-600">👤 Cliente: {sale.customer || "—"}</p>
              <p className="text-gray-600">📦 Quantidade: {sale.quantity}</p>
              <p className="text-gray-600">
                💵 Preço Total:{" "}
                <span className="font-semibold">Kz {sale.total}</span>
              </p>
              <p className="text-gray-600">
                📅 Data:{" "}
                {sale.date
                  ? new Date(sale.date).toLocaleString("pt-BR")
                  : "—"}
              </p>

              <div className="flex justify-end mt-4 space-x-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    setEditingSale(sale);
                    setIsModalOpen(true);
                  }}
                >
                  <FiEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(sale._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sem vendas */}
      {filteredSales.length === 0 && !loading && (
        <p className="text-gray-500 mt-6 text-center">
          Nenhuma venda encontrada.
        </p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <AddSaleModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingSale(null);
          }}
          onSave={handleSaveSale}
          editingSale={editingSale}
          products={products}
        />
      )}
    </DashboardLayout>
  );
}
