import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const PopularPicks = ({ products = [] }) => {
  // Latest / Popular Products
  const popularProducts = products.slice(0, 4);

  if (!popularProducts.length) return null;

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-5">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              ⭐ Popular Picks
            </h2>

            <p className="mt-2 text-gray-500">
              Loved by our customers and trending today.
            </p>
          </div>

          <Link
            to="/menu"
            className="hidden rounded-full border border-orange-500 px-5 py-2 font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white md:block"
          >
            View All →
          </Link>

        </div>

        {/* Products */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popularProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularPicks;