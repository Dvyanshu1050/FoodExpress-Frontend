const reviews = [
  {
    name: "Rahul",
    review: "Amazing Pizza & Super Fast Delivery.",
  },
  {
    name: "Priya",
    review: "Fresh Food and Great Taste.",
  },
  {
    name: "Aman",
    review: "Best Restaurant Website Experience.",
  },
];

const CustomerReviews = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="mx-auto max-w-7xl px-5">

        <h2 className="mb-12 text-center text-4xl font-bold">
          Customer Reviews
        </h2>

        <div className="grid gap-8 lg:grid-cols-3">

          {reviews.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-8 shadow"
            >
              <h3 className="text-xl font-bold">
                ⭐⭐⭐⭐⭐
              </h3>

              <p className="mt-5 text-gray-600">
                "{item.review}"
              </p>

              <h4 className="mt-6 font-bold text-orange-500">
                {item.name}
              </h4>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default CustomerReviews;