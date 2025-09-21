"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FiEdit, FiTrash2, FiPlus, FiUser } from "react-icons/fi";
import AddUserModal from "../components/modals/adicionarUtilizador";

export default function Usuarios() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  // Mock Users 🔥
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nataniel Oliveira",
      email: "nataniel@email.com",
      role: "Administrador",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Maria Silva",
      email: "maria@email.com",
      role: "Operador",
      status: "Ativo",
    },
    {
      id: 3,
      name: "João Costa",
      email: "joao@email.com",
      role: "Operador",
      status: "Inativo",
    },
  ]);

  // Deletar usuário
  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Adicionar ou atualizar usuário
  const handleSaveUser = (newUser: any) => {
    if (editingUser) {
      // Atualizar usuário existente
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...newUser } : u))
      );
    } else {
      // Criar novo usuário
      const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      setUsers([...users, { id: newId, ...newUser }]);
    }

    setIsModalOpen(false);
    setEditingUser(null);
  };

  // Filtro
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Cabeçalho */}
      {/* Cabeçalho */}
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
  {/* Título */}
  <h1 className="text-2xl font-bold text-black">👥 Usuários</h1>

  {/* Botão */}
  <button
    onClick={() => {
      setEditingUser(null);
      setIsModalOpen(true);
    }}
    className="flex items-center justify-center sm:justify-start bg-indigo-600 text-white px-4 py-2 rounded shadow-md hover:bg-indigo-700 transition transform hover:scale-105 w-full sm:w-auto"
  >
    <FiPlus className="mr-2" /> Adicionar Usuário
  </button>
</div>


      {/* Barra de pesquisa */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Buscar por nome, email ou cargo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Lista de usuários */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition relative"
          >
            <div className="flex items-center mb-2">
              <FiUser className="text-gray-600 mr-2" />
              <h2 className="font-bold text-lg">{user.name}</h2>
            </div>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Cargo: {user.role}</p>
            <p
              className={`text-sm font-semibold ${
                user.status === "Ativo" ? "text-green-600" : "text-red-600"
              }`}
            >
              Status: {user.status}
            </p>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => {
                  setEditingUser(user);
                  setIsModalOpen(true);
                }}
              >
                <FiEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nenhum usuário */}
      {filteredUsers.length === 0 && (
        <p className="text-gray-500 mt-6">Nenhum usuário encontrado.</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
          onSave={handleSaveUser}
          editingUser={editingUser}
        />
      )}
    </DashboardLayout>
  );
}
