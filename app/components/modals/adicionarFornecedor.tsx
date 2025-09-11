"use client";

import { useState, useEffect } from "react";

interface Supplier {
  _id?: string;
  id?: number;
  name: string;
  contact: string;
  phone: string;
  address: string;
}

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSupplier: (supplier: Supplier) => void;
  editingSupplier?: Supplier | null;
}

export default function AddSupplierModal({
  isOpen,
  onClose,
  onAddSupplier,
  editingSupplier,
}: AddSupplierModalProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Preencher campos se estiver editando
  useEffect(() => {
    if (editingSupplier) {
      setName(editingSupplier.name);
      setContact(editingSupplier.contact);
      setPhone(editingSupplier.phone);
      setAddress(editingSupplier.address);
    } else {
      setName("");
      setContact("");
      setPhone("");
      setAddress("");
    }
  }, [editingSupplier, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact || !phone || !address) return;

    const supplierData: Supplier = editingSupplier
      ? { ...editingSupplier, name, contact, phone, address }
      : { id: Date.now(), name, contact, phone, address };

    onAddSupplier(supplierData);

    setName("");
    setContact("");
    setPhone("");
    setAddress("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000005C] bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">
          {editingSupplier ? "Editar Fornecedor" : "Adicionar Fornecedor"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome do fornecedor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {editingSupplier ? "Salvar Alterações" : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
