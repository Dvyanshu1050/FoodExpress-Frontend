import { useNavigate } from "react-router-dom";

const CategorySlider = ({ categories = [] }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-orange-50 via-white to-orange-50 py-20">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            🍽 Our Menu
          </span>

          <h2 className="mt-5 text-4xl font-extrabold text-gray-800 md:text-5xl">
            Explore Food Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Choose from our delicious collection prepared with fresh
            ingredients and served with love.
          </p>
        </div>

        {/* Categories */}

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

          {/* All Menu */}

          <button
            onClick={() => navigate("/menu")}
            className="group rounded-[30px] bg-gradient-to-br from-orange-500 to-red-500 p-7 text-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-orange-300"
          >
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5787/5787016.png"
                alt="All"
                className="h-20 w-20 object-contain transition duration-500 group-hover:scale-110"
              />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              All Menu
            </h3>

            <p className="mt-2 text-sm opacity-90">
              Explore Everything
            </p>

            <span className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-orange-600">
              Browse →
            </span>
          </button>

          {/* Dynamic Categories */}

          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() =>
                navigate(`/category/${category.name.toLowerCase()}`)
              }
              className="group rounded-[30px] border border-orange-100 bg-white p-7 shadow-md transition-all duration-500 hover:-translate-y-3 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-100"
            >
              {/* Image */}

              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-orange-50 to-orange-100 shadow-inner">

                <img
                  src={category.image}
                  alt={category.name}
                  className="h-24 w-24 rounded-full border-4 border-white object-cover transition duration-500 group-hover:scale-110"
                />

              </div>

              {/* Name */}

              <h3 className="mt-6 text-2xl font-bold text-gray-800 transition group-hover:text-orange-600">
                {category.name}
              </h3>

              {/* Description */}

              <p className="mt-2 text-sm text-gray-500">
                Fresh & Delicious
              </p>

              {/* Button */}

              <span className="mt-5 inline-block rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600 transition-all group-hover:bg-orange-500 group-hover:text-white">
                View Menu →
              </span>
            </button>
          ))}

        </div>

      </div>
    </section>
  );
};

export default CategorySlider;