import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const getProduct = async () => {

    try {

      const res = await api.get(`/products/${id}`);

      setProduct(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getProduct();

  }, []);

  if (!product) {

    return <h1 className="text-center mt-20">Loading...</h1>;

  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-6xl p-10">

        <div className="grid gap-10 md:grid-cols-2">

          <img
            src={product.image}
            alt={product.name}
            className="h-[450px] w-full rounded-xl object-cover shadow-xl"
          />

          <div>

            <h1 className="text-5xl font-bold">
              {product.name}
            </h1>

            <p className="mt-4 text-xl text-gray-500">
              {product.category}
            </p>

            <h2 className="mt-8 text-4xl font-bold text-orange-500">
              ₹ {product.price}
            </h2>

            <button
              className="mt-10 rounded-xl bg-orange-500 px-10 py-4 text-lg font-semibold text-white hover:bg-orange-600"
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default ProductDetails;