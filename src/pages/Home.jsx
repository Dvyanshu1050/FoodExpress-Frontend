import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import CategorySlider from "../components/CategorySlider";
import OfferSlider from "../components/OfferSlider";
import PopularPicks from "../components/PopularPicks";
import ProductSection from "../components/ProductSection";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
import WhyChooseUs from "../components/WhyChooseUs";
import AppDownload from "../components/AppDownload";
import CustomerReviews from "../components/CustomerReviews";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [homeData, setHomeData] = useState({
    heroes: [],
    categories: [],
    offers: [],
    sections: [],
  });

  const [selected, setSelected] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/home");

      setHomeData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Remove duplicate products
  const allProducts = useMemo(() => {
    const map = new Map();

    homeData.sections.forEach((section) => {
      section.products?.forEach((product) => {
        map.set(product._id, product);
      });
    });

    return [...map.values()];
  }, [homeData]);

  const filteredProducts = useMemo(() => {
    if (selected === "All") return allProducts;

    return allProducts.filter(
      (item) => String(item.category) === String(selected)
    );
  }, [selected, allProducts]);

  const selectedCategory = homeData.categories.find(
    (c) => c._id === selected
  );



  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <HeroSlider heroes={homeData.heroes} />

      <CategorySlider
        categories={homeData.categories}
        selected={selected}
        setSelected={setSelected}
      />

      <OfferSlider offers={homeData.offers} />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        </div>
      ) : selected === "All" ? (
        <>

<WhyChooseUs />

<AppDownload />

<CustomerReviews />

<Newsletter />

<Footer />
        </>
      ) : (
        <section className="mx-auto max-w-7xl px-5 py-14">

          <div className="mb-10 flex items-center justify-between">

            <div>
              <h2 className="text-4xl font-bold">
                {selectedCategory?.name} Collection
              </h2>

              <p className="mt-2 text-gray-500">
                Freshly prepared with premium ingredients.
              </p>
            </div>

            <span className="rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-600">
              {filteredProducts.length} Items
            </span>

          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl bg-white py-20 text-center shadow">
              <h2 className="text-2xl font-bold">
                No Products Found 😔
              </h2>

              <p className="mt-2 text-gray-500">
                No items available in this category.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

            </div>
          )}

        </section>
      )}

    </div>
  );
};

export default Home;