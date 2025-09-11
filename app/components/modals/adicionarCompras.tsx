"use client";

import { useEffect, useState } from "react";

interface CompraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (purchase: any) => void;
  onEdit: (purchase: any) => void; // NOVO
  editingPurchase: any | null; // NOVO
}

export default function CompraModal({
  isOpen,
  onClose,
  onAdd,
  onEdit,
  editingPurchase,
}: CompraModalProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [form, setForm] = useState({
    product: "",
    supplier: "",
    quantity: 1,
    price: 0,
    date: new Date().toISOString().split("T")[0],
  });

  // Quando abrir para edição, preencher o form
  useEffect(() => {
    if (editingPurchase) {
      setForm({
        product: editingPurchase.product?._id || "",
        supplier: editingPurchase.supplier?._id || "",
        quantity: editingPurchase.quantity,
        price: editingPurchase.price,
        date: editingPurchase.date?.split("T")[0] || new Date().toISOString().split("T")[0],
      });
    } else {
      // reset form ao abrir para novo
      setForm({
        product: "",
        supplier: "",
        quantity: 1,
        price: 0,
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [editingPurchase, isOpen]);

  // Buscar produtos e fornecedores
  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:5000/api/products")
        .then((res) => res.json())
        .then(setProducts)
        .catch((err) => console.error("Erro ao carregar produtos:", err));

      fetch("http://localhost:5000/api/suppliers")
        .then((res) => res.json())
        .then(setSuppliers)
        .catch((err) => console.error("Erro ao carregar fornecedores:", err));
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPurchase) {
        // EDITAR
        const res = await fetch(`http://localhost:5000/api/purchases/${editingPurchase._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!res.ok) throw new Error("Erro ao editar compra");

        const updatedPurchase = await res.json();
        onEdit(updatedPurchase);
      } else {
        // ADICIONAR
        const res = await fetch("http://localhost:5000/api/purchases", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!res.ok) throw new Error("Erro ao salvar compra");

        const newPurchase = await res.json();
        onAdd(newPurchase);
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar a compra.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0000005C] bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {editingPurchase ? "Editar Compra" : "Nova Compra"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1">Produto</label>
            <select
              name="product"
              value={form.product}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            >
              <option value="">Selecione um produto</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Fornecedor</label>
            <select
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            >
              <option value="">Selecione um fornecedor</option>
              {suppliers.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Quantidade</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-1">Preço Unitário</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-1">Data</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${
                editingPurchase ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {editingPurchase ? "Atualizar" : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
