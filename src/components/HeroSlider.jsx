import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = ({ heroes = [] }) => {
  if (!heroes.length) return null;

  return (
    <section className="relative">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={heroes.length > 1}
        className="h-[50vh] sm:h-[58vh] md:h-[65vh] lg:h-[85vh]"
      >
        {heroes.map((hero) => (
          <SwiperSlide key={hero._id}>

            <div
              className="relative h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${hero.image})`,
              }}
            >
              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

              {/* Content */}

              <div className="relative z-10 flex h-full items-center">
                <div className="mx-auto w-full max-w-7xl px-5 md:px-8">

                  <div className="max-w-xl lg:max-w-2xl">

                    {/* Badge */}

                    <span className="inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow md:px-5 md:py-2 md:text-sm">
                      🔥 Limited Time Offer
                    </span>

                    {/* Heading */}

                    <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:mt-6 md:text-5xl lg:text-7xl">
                      {hero.title}
                    </h1>

                    {/* Subtitle */}

                    <p className="mt-3 max-w-lg text-sm leading-6 text-gray-200 sm:text-base md:mt-5 md:text-lg md:leading-8 lg:text-xl">
                      {hero.subtitle}
                    </p>

                    {/* Buttons */}

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">

                      <Link
                        to={hero.buttonLink}
                        className="rounded-full bg-orange-500 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-600 md:px-8 md:py-4 md:text-base"
                      >
                        {hero.buttonText}
                      </Link>

                      <Link
                        to="/category/pizza"
                        className="rounded-full border border-white px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-black md:px-8 md:py-4 md:text-base"
                      >
                        Explore Menu
                      </Link>

                    </div>

                  </div>

                </div>
              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hide arrows on mobile */}

      <style>
        {`
          @media (max-width:768px){
            .swiper-button-next,
            .swiper-button-prev{
              display:none;
            }
          }

          .swiper-pagination-bullet{
            width:10px;
            height:10px;
            background:white;
            opacity:.6;
          }

          .swiper-pagination-bullet-active{
            width:28px;
            border-radius:20px;
            background:#f97316;
            opacity:1;
          }
        `}
      </style>

    </section>
  );
};

export default HeroSlider;