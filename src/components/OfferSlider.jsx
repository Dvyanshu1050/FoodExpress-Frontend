import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

const OfferSlider = ({ offers = [] }) => {
  if (!offers.length) return null;

  return (
    <section className="bg-gradient-to-b from-orange-50 via-white to-orange-50 py-20">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}

        <div className="mb-12 text-center">

          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            🎉 Limited Time
          </span>

          <h2 className="mt-5 text-4xl font-extrabold text-gray-800 md:text-5xl">
            Today's Special Offers
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Save more with our exclusive food deals and exciting discounts.
          </p>

        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={offers.length > 1}
          spaceBetween={25}
          breakpoints={{
            0: {
              slidesPerView: 1.1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer._id}>

              <div className="group overflow-hidden rounded-[30px] bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

                {/* Image */}

                <div className="relative overflow-hidden">

                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full bg-red-500 px-5 py-2 text-sm font-bold text-white shadow-lg">
                    {offer.discount}% OFF
                  </div>

                </div>

                {/* Content */}

                <div className="p-6">

                  <h3 className="text-2xl font-bold text-gray-800">
                    {offer.title}
                  </h3>

                  <p className="mt-3 text-gray-500">
                    {offer.subtitle}
                  </p>

                  {/* Coupon */}

                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-orange-50 px-5 py-4">

                    <div>

                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Coupon Code
                      </p>

                      <h4 className="text-lg font-bold text-orange-600">
                        {offer.couponCode}
                      </h4>

                    </div>

                    <span className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white">
                      Copy
                    </span>

                  </div>

                  {/* Button */}

                  <Link
                    to={offer.buttonLink}
                    className="mt-6 block rounded-2xl bg-orange-500 py-4 text-center text-lg font-bold text-white transition hover:bg-orange-600"
                  >
                    {offer.buttonText}
                  </Link>

                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default OfferSlider;