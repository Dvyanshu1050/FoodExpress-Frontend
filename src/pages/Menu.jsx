import React, { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 py-12">

          <h1 className="text-4xl font-bold text-center mb-3">
            Our Menu
          </h1>

          <p className="text-center text-gray-500 mb-10">
            Explore our delicious food collection.
          </p>

          {loading ? (
            <div className="text-center py-20">
              Loading...
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">
                No Products Available
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((item) => (
                <ProductCard
                  key={item._id}
                  product={item}
                />
              ))}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Menu;