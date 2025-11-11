"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function Produk() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products);
      } catch (error) {
        console.error("Gagal memuat produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Memuat produk...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛍️ Daftar Produk</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Card
            key={p.id}
            className="bg-gray-900/70 border border-gray-800 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-200"
          >
            <CardHeader>
              <CardTitle className="text-white text-lg truncate">
                {p.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={p.thumbnail || "/no-image.png"}
                alt={p.title}
                className="rounded-lg mb-3 w-full h-40 object-cover"
              />

              <p className="text-gray-400 text-sm">{p.brand}</p>

              <div className="flex items-center gap-1 my-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">{p.rating}</span>
              </div>

              <p className="text-white font-semibold">${p.price}</p>
              <p
                className={`text-sm ${
                  p.stock < 10 ? "text-red-400" : "text-green-400"
                }`}
              >
                {p.availabilityStatus} ({p.stock} stok)
              </p>

              <p className="text-gray-400 text-xs mt-2 line-clamp-3">
                {p.description}
              </p>

              <Button className="w-full bg-white text-black hover:bg-gray-200 mt-4">
                Lihat Detail
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
