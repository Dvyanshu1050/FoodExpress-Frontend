import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);

      login(res.data.user, res.data.token);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 to-white">

      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">

        {/* Left */}

        <div className="hidden items-center justify-center bg-orange-500 p-12 lg:flex">

          <div className="text-center text-white">

            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900"
              alt=""
              className="mx-auto h-80 w-80 rounded-full object-cover shadow-2xl"
            />

            <h2 className="mt-10 text-5xl font-extrabold">
              Welcome Back
            </h2>

            <p className="mt-5 text-lg text-orange-100">
              Fresh food delivered to your doorstep.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center justify-center p-6">

          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

            <h1 className="text-center text-4xl font-bold text-gray-800">
              Login
            </h1>

            <p className="mt-2 text-center text-gray-500">
              Welcome back! Please login.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >

              {/* Email */}

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-4 text-orange-500" />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:border-orange-500"
                />

              </div>

              {/* Password */}

              <div className="relative">

                <FaLock className="absolute left-4 top-4 text-orange-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border py-3 pl-12 pr-12 outline-none transition focus:border-orange-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-4 text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-orange-500"
                >
                  Forgot Password?
                </button>

              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 py-3 text-lg font-semibold text-white transition hover:bg-orange-600"
              >
                Login
              </button>

            </form>

            <p className="mt-8 text-center text-gray-600">

              Don't have an account?

              <Link
                to="/register"
                className="ml-2 font-semibold text-orange-500"
              >
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Login;