import {
  FaShippingFast,
  FaLeaf,
  FaCreditCard,
  FaStar,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast />,
    title: "Fast Delivery",
    desc: "Delivery within 30 minutes.",
  },
  {
    icon: <FaLeaf />,
    title: "Fresh Ingredients",
    desc: "100% Fresh & Hygienic Food.",
  },
  {
    icon: <FaCreditCard />,
    title: "Secure Payment",
    desc: "UPI, Cards & Cash on Delivery.",
  },
  {
    icon: <FaStar />,
    title: "Best Quality",
    desc: "Loved by thousands of customers.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Why Choose Us?
          </h2>

          <p className="mt-3 text-gray-500">
            Delicious food with the best service.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-orange-50 p-8 text-center shadow transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-3xl text-white">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;