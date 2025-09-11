import React, { useState, useEffect } from "react";

export default function AddSaleModal({ onClose, onSave, products = [] }: any) {
  const [form, setForm] = useState({
    product: "",
    customer: "",
    quantity: 1,
    price: 0,
    total: 0,
    date: new Date().toISOString().split("T")[0],
  });

  // Atualiza preço e total sempre que produto ou quantidade mudarem
  useEffect(() => {
    if (!form.product) return;
    const selectedProduct = products.find(
      (p: any) => p._id === form.product || p.id === form.product
    );
    if (selectedProduct) {
      const price = selectedProduct.sellingPrice || 0;
      setForm((prev) => ({
        ...prev,
        price,
        total: price * prev.quantity,
      }));
    }
  }, [form.product, form.quantity, products]);

  // Atualiza campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  // Submete a venda
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      product: form.product,
      customer: form.customer,
      quantity: form.quantity,
      price: form.price,
      total: form.total,
      date: form.date,
    });
    onClose();
    setForm({
      product: "",
      customer: "",
      quantity: 1,
      price: 0,
      total: 0,
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="fixed inset-0 bg-[#0000005C] bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Adicionar Venda</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Produto */}
          <div>
            <label className="block">Produto</label>
            <select
              name="product"
              value={form.product}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            >
              <option value="">Selecione um produto</option>
              {Array.isArray(products) &&
                products.map((p: any) => (
                  <option key={p._id || p.id} value={p._id || p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Cliente */}
          <div>
            <label className="block">Cliente</label>
            <input
              type="text"
              name="customer"
              value={form.customer}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>

          {/* Quantidade */}
          <div>
            <label className="block">Quantidade</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              min="1"
              required
            />
          </div>

          {/* Preço Unitário */}
          <div>
            <label className="block">Preço Unitário</label>
            <p className="px-4 py-2 border rounded bg-gray-100">
              Kz {form.price}
            </p>
          </div>

          {/* Total */}
          <div>
            <label className="block">Total</label>
            <p className="px-4 py-2 border rounded bg-gray-100">
              Kz {form.total}
            </p>
          </div>

          {/* Data */}
          <div>
            <label className="block">Data</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
