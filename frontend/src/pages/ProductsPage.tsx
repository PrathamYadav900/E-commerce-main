import React, { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types/type";
import axios from "axios";
import ESkeleton from "../components/Skeleton";

const API_URL = import.meta.env.VITE_API_URL;

interface AllProductsProp {
  products: Product[];
}

export const AllProducts: React.FC<AllProductsProp> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        console.log(loading)
        const res = await axios.get(`${API_URL}/api/v1/product/bulk`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setProducts(res.data.AllProduct);
      } catch (e) {
        setError("Failed to fetch products. Please try again later.");
        console.error(e, "Error in ProductsPage", `URL: ${API_URL}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-black text-gray-200 min-h-screen p-6">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {Array.from({ length: 8 }).map((_, index) => (
  <ESkeleton key={index} /> // ✅ Add a unique key
))}

        </div>
      ) : error ? (
        <div className="text-red-400 text-xl text-center py-10">{error}</div>
      ) : (
        <AllProducts products={products} />
      )}
    </div>
  );
};
