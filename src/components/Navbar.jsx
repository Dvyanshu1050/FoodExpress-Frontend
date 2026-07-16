import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from "react";
import api from "../services/api";
import {
  FaShoppingCart,
  FaUserCircle,
  FaHome,
  FaClipboardList,
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [query, setQuery] = useState("");
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);

const searchRef = useRef(null);

  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
useEffect(() => {
  if (query.trim() === "") {
    setProducts([]);
    return;
  }

  const timer = setTimeout(async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/products/search?q=${query}`
      );

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, 400);

  return () => clearTimeout(timer);
}, [query]);

useEffect(() => {
  const handleClick = (e) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(e.target)
    ) {
      setProducts([]);
    }
  };

  document.addEventListener("mousedown", handleClick);

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClick
    );
}, []);


  return (
    <>
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-lg shadow-xl"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-2xl">
              🍔
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-orange-500">
                FoodExpress
              </h1>
              <p className="text-xs text-gray-500">
                Fresh & Delicious
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 hover:text-orange-500"
            >
              <FaHome />
              Home
            </Link>

            {user && (
              <Link
                to="/my-orders"
                className="flex items-center gap-2 hover:text-orange-500"
              >
                <FaClipboardList />
                My Orders
              </Link>
            )}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="flex items-center gap-2 hover:text-orange-500"
              >
                <FaTachometerAlt />
                Dashboard
              </Link>
            )}
          </div>

          {/* Search */}
          <div
  ref={searchRef}
  className="relative hidden lg:block"
>

  <div className="flex w-80 items-center rounded-full border bg-gray-100 px-4 py-3">

    <FaSearch className="text-orange-500" />

    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search Pizza, Burger..."
      className="ml-3 w-full bg-transparent outline-none"
    />

  </div>

  {loading && (
    <div className="absolute left-0 right-0 mt-2 rounded-xl bg-white p-4 shadow-xl">
      Searching...
    </div>
  )}

  {!loading && products.length > 0 && (
    <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl bg-white shadow-2xl">

      {products.map((item) => (
        <Link
          key={item._id}
          to={`/product/${item._id}`}
          onClick={() => {
            setProducts([]);
            setQuery("");
          }}
          className="flex items-center gap-4 border-b p-4 hover:bg-orange-50"
        >

          <img
            src={item.image}
            alt={item.name}
            className="h-14 w-14 rounded-lg object-cover"
          />

          <div className="flex-1">

            <h4 className="font-semibold">
              {item.name}
            </h4>

            <p className="text-orange-500 font-bold">
              ₹ {item.price}
            </p>

          </div>

        </Link>
      ))}

    </div>
  )}

  {!loading &&
    query &&
    products.length === 0 && (
      <div className="absolute left-0 right-0 mt-2 rounded-xl bg-white p-4 text-center shadow-xl">
        No Products Found 😔
      </div>
    )}

</div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-2xl hover:text-orange-500"
            >
              <FaShoppingCart />

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {totalItems}
              </span>
            </Link>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="text-2xl text-orange-500" />
                    <span>{user.name}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-lg border border-orange-500 px-4 py-2 text-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="text-2xl md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-72 bg-white shadow-2xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-2xl font-bold text-orange-500">
            🍔 FoodExpress
          </h2>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 p-5">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg p-3 hover:bg-orange-50"
          >
            🏠 Home
          </Link>

          {user && (
            <Link
              to="/my-orders"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg p-3 hover:bg-orange-50"
            >
              📦 My Orders
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg p-3 hover:bg-orange-50"
            >
              📊 Dashboard
            </Link>
          )}

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg p-3 hover:bg-orange-50"
          >
            🛒 Cart ({totalItems})
          </Link>

          <hr className="my-4" />

          {user ? (
            <>
              <div className="font-semibold">
                👋 {user.name}
              </div>

              <button
                onClick={handleLogout}
                className="mt-4 rounded-lg bg-red-500 py-3 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-orange-500 py-3 text-center text-orange-500"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-orange-500 py-3 text-center text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;