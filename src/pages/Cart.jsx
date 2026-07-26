import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    total,
    totalItems,
  } = useCart();

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Heading */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">🛒 My Cart</h1>

          {cart.length > 0 && (
            <span className="rounded-full bg-orange-500 px-4 py-2 font-semibold text-white">
              {totalItems} Items
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow">
            <h2 className="text-2xl font-semibold text-gray-500">
              Your Cart is Empty 😔
            </h2>

            <button
              onClick={() => navigate("/")}
              className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-6 lg:col-span-2">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow md:flex-row md:items-center md:justify-between"
                >
                  {/* Left */}
                  <div className="flex items-center gap-5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />

                    <div>
                      <h2 className="text-2xl font-bold">{item.name}</h2>

                      <p className="text-gray-500">
                        {typeof item.category === "object"
                          ? item.category?.name
                          : item.category}
                      </p>

                      <h3 className="mt-2 text-xl font-bold text-orange-500">
                        ₹ {item.price}
                      </h3>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center justify-between gap-6">
                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="rounded bg-gray-200 px-3 py-1 text-xl"
                      >
                        -
                      </button>

                      <span className="text-xl font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="rounded bg-orange-500 px-3 py-1 text-xl text-white"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="w-24 text-right font-bold text-orange-500">
                      ₹ {item.price * item.quantity}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item._id)}
                      className="rounded bg-red-500 p-3 text-white hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-xl bg-white p-6 shadow">
              <h2 className="mb-6 text-2xl font-bold">
                Order Summary
              </h2>

              <div className="mb-3 flex justify-between">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="mb-3 flex justify-between">
                <span>Subtotal</span>
                <span>₹ {total}</span>
              </div>

              <div className="mb-3 flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600">FREE</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span className="text-orange-500">
                  ₹ {total}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full rounded-lg bg-orange-500 py-4 text-lg font-semibold text-white hover:bg-orange-600"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;