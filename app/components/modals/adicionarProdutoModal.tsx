"use client";

import { useState, useEffect, useRef } from "react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct?: (product: any) => void;
  onUpdateProduct?: (product: any) => void;
  productToEdit?: any;
}

export default function ProductModal({
  isOpen,
  onClose,
  onAddProduct,
  onUpdateProduct,
  productToEdit,
}: ProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [minStock, setMinStock] = useState(""); // novo campo
  const [supplier, setSupplier] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [localImage, setLocalImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  function handleReset() {
    setName("");
    setPrice("");
    setStock("");
    setMinStock("");
    setSupplier("");
    setImageUrl("");
    setLocalImage(null);
  }

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || "");
      setPrice(productToEdit.sellingPrice?.toString() || "");
      setStock(productToEdit.stock?.toString() || "");
      setMinStock(productToEdit.minStock?.toString() || "1");
      setSupplier(productToEdit.supplier || "");
      setImageUrl(productToEdit.image || "");
      setLocalImage(null);
    } else {
      handleReset();
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Number(price) < 0 || Number(stock) < 0 || Number(minStock) < 0) {
      alert("Preço, estoque e estoque mínimo não podem ser negativos!");
      return;
    }

    if (!imageUrl && !localImage) {
      alert("Adicione uma imagem por URL ou upload local.");
      return;
    }

    const productData = {
      _id: productToEdit?._id,
      name,
      sellingPrice: Number(price),
      stock: Number(stock),
      minStock: Number(minStock), // incluído
      supplier,
      image: localImage ? URL.createObjectURL(localImage) : imageUrl,
    };

    setLoading(true);
    try {
      if (productToEdit) {
        if (onUpdateProduct) await onUpdateProduct(productData);
      } else {
        if (onAddProduct) await onAddProduct(productData);
      }

      handleReset();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#0000005C] z-50"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4 text-black">
          {productToEdit ? "Editar Produto" : "Adicionar Produto"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome do Produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Estoque"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Estoque mínimo"
            value={minStock}
            onChange={(e) => setMinStock(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Fornecedor"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Imagem (URL)</label>
            <input
              type="text"
              placeholder="https://exemplo.com/produto.png"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Ou Imagem Local</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLocalImage(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {(imageUrl || localImage) && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Pré-visualização:</p>
              <img
                src={localImage ? URL.createObjectURL(localImage) : imageUrl}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Salvando..." : productToEdit ? "Atualizar Produto" : "Salvar Produto"}
          </button>
        </form>
      </div>
    </div>
  );
}
