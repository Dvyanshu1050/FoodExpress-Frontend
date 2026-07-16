import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaStar,
  FaHeart,
  FaClock,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Link
      to={`/product/${product._id}`}
      className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Discount */}
      <span className="absolute left-4 top-4 z-20 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
        🔥 20% OFF
      </span>

      {/* Wishlist */}
      <button
        onClick={(e) => e.preventDefault()}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition hover:bg-red-500 hover:text-white"
      >
        <FaHeart />
      </button>

      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"></div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name */}
        <h2 className="mt-3 line-clamp-1 text-xl font-bold text-gray-800">
          {product.name}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          Freshly prepared with premium ingredients and delivered hot &
          delicious.
        </p>

        {/* Rating + Time */}
        <div className="mt-4 flex items-center justify-between">

          <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            <FaStar className="text-yellow-400" />
            4.8
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <FaClock />
            25-30 min
          </div>

        </div>

        {/* Price */}
        <div className="mt-5 flex items-center justify-between">

          <div>

            <h3 className="text-2xl font-bold text-orange-600">
              ₹{product.price}
            </h3>

            <p className="text-sm text-gray-400 line-through">
              ₹{Math.round(product.price * 1.2)}
            </p>

          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <FaShoppingCart />
            Add
          </button>

        </div>

      </div>
    </Link>
  );
};

export default ProductCard;