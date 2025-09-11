"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { PlusCircle, Edit3, Trash2, Package } from "lucide-react";
import ProductModal from "../components/modals/adicionarProdutoModal";

// 🔹 Mock de produtos
const mockProducts = [
  {
    _id: "1",
    name: "Camiseta Maiomb",
    sellingPrice: 5000,
    stock: 25,
    minStock: 5,
    supplier: "Fornecedor A",
    image: "https://images.tcdn.com.br/img/img_prod/1044362/camisa_barcelona_i_24_25_torcedor_masculina_lamine_yamal_19_3262_1_7b7432f2a56d32d4227003ec1c8484e9.png",
  },
  {
    _id: "2",
    name: "Tênis Street",
    sellingPrice: 12000,
    stock: 10,
    minStock: 3,
    supplier: "Fornecedor B",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFWTZMGX5gJ20t9pDSJlLa_nVik0Wbq1rf8A&s",
  },
  {
    _id: "3",
    name: "Teclado RGB",
    sellingPrice: 20000,
    stock: 8,
    minStock: 2,
    supplier: "Fornecedor C",
    image: "data:image/jpeg;base64,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",
  },
];

export default function Produtos() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<any | null>(null);

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleAddProduct = (product: any) => {
    const newProduct = { ...product, _id: String(Date.now()) };
    setProducts((prev) => [newProduct, ...prev]);
    setIsModalOpen(false);
  };

  const handleUpdateProduct = (product: any) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === product._id ? product : p))
    );
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black flex items-center gap-2">
          <Package className="text-blue-500" /> Produtos
        </h1>
        <button
          onClick={() => {
            setProductToEdit(null);
            setIsModalOpen(true);
          }}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <PlusCircle className="mr-2 text-white" /> Adicionar Produto
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition relative"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p className="text-gray-600">
              💰 Preço:{" "}
              <span className="text-green-600 font-semibold">
                Kz{product.sellingPrice}
              </span>
            </p>
            <p className="text-gray-600">📦 Estoque: {product.stock}</p>
            <p className="text-gray-600">⚠️ Min. Estoque: {product.minStock}</p>
            <p className="text-gray-600">🏭 Fornecedor: {product.supplier}</p>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => {
                  setProductToEdit(product);
                  setIsModalOpen(true);
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <Edit3 size={20} />
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-gray-500 mt-6">Nenhum produto encontrado.</p>
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProductToEdit(null);
        }}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        productToEdit={productToEdit}
      />
    </DashboardLayout>
  );
}
