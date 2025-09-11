"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import AddSupplierModal from "../components/modals/adicionarFornecedor";

interface Supplier {
  _id: string;
  name: string;
  contact: string;
  phone: string;
  address: string;
}

// 🔹 Mock inicial de fornecedores
const mockSuppliers: Supplier[] = [
  {
    _id: "1",
    name: "Fornecedor Alpha",
    contact: "alpha@fornecedor.com",
    phone: "912345678",
    address: "Rua A, Luanda",
  },
  {
    _id: "2",
    name: "Fornecedor Beta",
    contact: "beta@fornecedor.com",
    phone: "923456789",
    address: "Rua B, Luanda",
  },
  {
    _id: "3",
    name: "Fornecedor Gama",
    contact: "gama@fornecedor.com",
    phone: "934567890",
    address: "Rua C, Benguela",
  },
];

export default function Fornecedores() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  // Adicionar ou editar fornecedor (mock)
  const handleAddOrEditSupplier = (supplierData: Omit<Supplier, "_id">) => {
    if (editingSupplier) {
      // Editar fornecedor
      setSuppliers((prev) =>
        prev.map((s) =>
          s._id === editingSupplier._id ? { ...editingSupplier, ...supplierData } : s
        )
      );
    } else {
      // Criar fornecedor com ID fake
      const newSupplier: Supplier = {
        _id: Date.now().toString(),
        ...supplierData,
      };
      setSuppliers((prev) => [newSupplier, ...prev]);
    }

    setEditingSupplier(null);
    setIsModalOpen(false);
  };

  // Deletar fornecedor
  const handleDelete = (id: string) => {
    setSuppliers((prev) => prev.filter((s) => s._id !== id));
  };

  // Filtrar
  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">🏢 Fornecedores</h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditingSupplier(null);
          }}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          <FiPlus className="mr-2" /> Adicionar Fornecedor
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Buscar fornecedor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div
            key={supplier._id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition relative"
          >
            <h2 className="font-bold text-lg mb-2 text-black">{supplier.name}</h2>
            <p className="text-gray-600">📧 {supplier.contact}</p>
            <p className="text-gray-600">📞 {supplier.phone}</p>
            <p className="text-gray-600">📍 {supplier.address}</p>

            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => {
                  setEditingSupplier(supplier);
                  setIsModalOpen(true);
                }}
                className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110"
              >
                <FiEdit size={22} />
              </button>

              <button
                onClick={() => handleDelete(supplier._id)}
                className="text-red-600 hover:text-red-800 transition-transform transform hover:scale-110"
              >
                <FiTrash2 size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <p className="text-gray-500 mt-6">Nenhum fornecedor encontrado.</p>
      )}

      <AddSupplierModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSupplier(null);
        }}
        onAddSupplier={handleAddOrEditSupplier}
        editingSupplier={editingSupplier}
      />
    </DashboardLayout>
  );
}
