import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

const CategoryProducts = () => {
  const { name } = useParams();

  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategoryProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/products/category/${name}`);

      setCategory(res.data.category);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryProducts();
  }, [name]);

  return (
    <>
      <Navbar />

      {/* Banner */}

      <div
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: `url(${category.banner})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full items-center justify-center">

          <div className="text-center text-white">

            <h1 className="text-5xl font-bold">
              {category.name}
            </h1>

            <p className="mt-4 text-lg">
              {category.description}
            </p>

          </div>

        </div>
      </div>

      {/* Products */}

      <section className="mx-auto max-w-7xl px-5 py-16">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            {category.name} Menu
          </h2>

          <span className="rounded-full bg-orange-100 px-4 py-2 font-semibold text-orange-600">
            {products.length} Items
          </span>

        </div>

        {loading ? (
          <div className="py-20 text-center">
            Loading...
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
              />
            ))}

          </div>
        )}

      </section>
    </>
  );
};

export default CategoryProducts;