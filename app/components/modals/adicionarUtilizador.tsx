"use client";

import { useEffect, useState } from "react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: any) => void;
  editingUser: any | null;
}

export default function AddUserModal({
  isOpen,
  onClose,
  onSave,
  editingUser,
}: AddUserModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "Ativo",
  });

  // Preenche os dados quando for edição
  useEffect(() => {
    if (editingUser) {
      setForm({
        name: editingUser.name || "",
        email: editingUser.email || "",
        role: editingUser.role || "",
        status: editingUser.status || "Ativo",
      });
    } else {
      setForm({
        name: "",
        email: "",
        role: "",
        status: "Ativo",
      });
    }
  }, [editingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000005C]bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {editingUser ? "✏️ Editar Usuário" : "➕ Adicionar Usuário"}
        </h2>

        {/* Nome */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome"
          className="w-full mb-3 px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
        />

        {/* Cargo */}
        <input
          type="text"
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Cargo"
          className="w-full mb-3 px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
        />

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>

        {/* Botões */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
