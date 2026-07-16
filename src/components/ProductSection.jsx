import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductSection = ({ title, products = [] }) => {
  // Show only first 4 products
  const displayProducts = products.slice(0, 4);

  // Don't render empty section
  if (displayProducts.length === 0) return null;

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-5">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {title}
            </h2>

            <p className="mt-2 text-gray-500">
              Freshly prepared with premium ingredients.
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

          {displayProducts.map((product) => (
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

export default ProductSection;