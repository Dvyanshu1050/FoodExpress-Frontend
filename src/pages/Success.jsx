import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Success = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">

          <div className="text-7xl mb-5">✅</div>

          <h1 className="text-3xl font-bold text-green-600">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-500 mt-4">
            Thank you for your order. Your delicious food is being prepared.
          </p>

          <div className="mt-8 space-y-3">

            <Link
              to="/my-orders"
              className="block w-full rounded-lg bg-orange-500 py-3 text-white font-semibold hover:bg-orange-600"
            >
              My Orders
            </Link>

            <Link
              to="/"
              className="block w-full rounded-lg border border-orange-500 py-3 text-orange-500 font-semibold hover:bg-orange-50"
            >
              Continue Shopping
            </Link>

          </div>

        </div>
      </div>
    </>
  );
};

export default Success;