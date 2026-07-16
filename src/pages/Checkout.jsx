import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


const Checkout = () => {
  const navigate = useNavigate();

const {
  cart,
  total,
  totalItems,
  clearCart,
} = useCart();

const { token } = useAuth();
const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "COD",
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
    setLoading(true);

    const orderData = {
      products: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      totalAmount: total,
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      paymentMethod: formData.paymentMethod,
    };

    const res = await axios.post(
      "http://localhost:5000/api/orders",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    clearCart();

    navigate("/success");

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to place order."
    );
  } finally {
    setLoading(false);
  }
};

const deliveryCharge = 0;
const grandTotal = total + deliveryCharge;

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-[80vh] items-center justify-center px-4">
          <div className="rounded-xl bg-white p-10 text-center shadow-lg">

            <h2 className="text-3xl font-bold">
              🛒 Your Cart is Empty
            </h2>

            <p className="mt-3 text-gray-500">
              Add some delicious food before checkout.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
            >
              Go Shopping
            </button>

          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10">

        <div className="mx-auto max-w-7xl px-5">

          <h1 className="mb-8 text-4xl font-bold">
            Checkout
          </h1>

          <div className="grid gap-8 lg:grid-cols-3">

            {/* Left */}
            <div className="rounded-xl bg-white p-6 shadow lg:col-span-2">

              <h2 className="mb-6 text-2xl font-bold">
                Delivery Information
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border p-3 focus:border-orange-500 focus:outline-none"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border p-3 focus:border-orange-500 focus:outline-none"
                />

                <textarea
                  rows={4}
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border p-3 focus:border-orange-500 focus:outline-none"
                />

                <div className="grid gap-4 md:grid-cols-2">

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="rounded-lg border p-3 focus:border-orange-500 focus:outline-none"
                  />

                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="rounded-lg border p-3 focus:border-orange-500 focus:outline-none"
                  />

                </div>

                <div>

                  <h3 className="mb-3 font-semibold">
                    Payment Method
                  </h3>

                  <label className="mb-2 flex items-center gap-3 rounded-lg border p-3 cursor-pointer">

                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={handleChange}
                    />

                    Cash On Delivery

                  </label>

                  <label className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer">

                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ONLINE"
                      checked={formData.paymentMethod === "ONLINE"}
                      onChange={handleChange}
                    />

                    Online Payment

                  </label>

                </div>

                <button
  type="submit"
  disabled={loading}
  className={`w-full rounded-lg py-4 text-lg font-semibold text-white ${
    loading
      ? "cursor-not-allowed bg-gray-400"
      : "bg-orange-500 hover:bg-orange-600"
  }`}
>
  {loading ? "Placing Order..." : "Place Order"}
</button>

              </form>

            </div>

            {/* Right */}
            <div className="h-fit rounded-xl bg-white p-6 shadow">

              <h2 className="mb-6 text-2xl font-bold">
                Order Summary
              </h2>

              <div className="space-y-4">

                {cart.map((item) => (

                  <div
                    key={item._id}
                    className="flex items-center justify-between"
                  >

                    <div className="flex items-center gap-3">

  <img
    src={item.image}
    alt={item.name}
    className="h-14 w-14 rounded-lg object-cover"
  />

  <div>
    <h3 className="font-semibold">
      {item.name}
    </h3>

    <p className="text-sm text-gray-500">
      Qty : {item.quantity}
    </p>
  </div>

</div>

                    <h3 className="font-bold text-orange-500">
                      ₹ {item.price * item.quantity}
                    </h3>

                  </div>

                ))}

              </div>

              <hr className="my-5" />

              <div className="mb-2 flex justify-between">

                <span>Total Items</span>

                <span>{totalItems}</span>

              </div>

              <div className="mb-2 flex justify-between">

                <span>Delivery</span>

                <span className="text-green-600">
  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
</span>

              </div>

              <div className="mt-5 flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span className="text-orange-500">
                 ₹ {grandTotal}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default Checkout;