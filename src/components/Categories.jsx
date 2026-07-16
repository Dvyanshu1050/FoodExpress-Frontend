const categories = [
  "All",
  "Burger",
  "Pizza",
  "Fast Food",
  "Chinese",
  "South Indian",
  "Dessert",
  "Drinks",
];

const Categories = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="mb-6 text-3xl font-bold">
        Categories
      </h2>

      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            className="rounded-full bg-white px-6 py-3 shadow transition hover:bg-orange-500 hover:text-white"
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;