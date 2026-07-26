import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const MyOrders = () => {

  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchOrders = async () => {
  if (!token) {
    setLoading(false);
    return;
  }

  try {
    const res = await api.get("/orders/my-orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Orders Response:", res.data);

    setOrders(res.data.orders || []);
  } catch (error) {
    console.error("Fetch Orders Error:", error);

    setOrders([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10">

        <h1 className="text-4xl font-bold mb-8">
          My Orders
        </h1>

        {loading ? (

          <h2 className="text-center text-2xl">
            Loading...
          </h2>

        ) : orders.length === 0 ? (

          <div className="bg-white shadow rounded-xl p-10 text-center">

            <h2 className="text-2xl font-semibold">
              No Orders Found
            </h2>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-xl shadow p-6"
              >

                <div className="flex justify-between">

                  <div>

                    <h2 className="font-bold text-xl">
                      Order ID
                    </h2>

                    <p className="text-gray-500">
                      {order._id}
                    </p>

                  </div>

                  <span
                    className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold"
                  >
                    {order.status}
                  </span>

                </div>

                <hr className="my-5" />

                <div className="space-y-3">

                  {order.products.map((item) => (

                    <div
                      key={item._id}
                      className="flex justify-between"
                    >

                      <span>
                        {item.product?.name}
                      </span>

                      <span>
                        Qty : {item.quantity}
                      </span>

                    </div>

                  ))}

                </div>

                <hr className="my-5" />

                <div className="grid md:grid-cols-2 gap-5">

                  <div>

                    <h3 className="font-semibold">
                      Delivery Address
                    </h3>

                    <p>{order.fullName}</p>

                    <p>{order.phone}</p>

                    <p>
                      {order.address},
                      {order.city}
                    </p>

                    <p>
                      {order.pincode}
                    </p>

                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Payment
                    </h3>

                    <p>
                      {order.paymentMethod}
                    </p>

                    <p className="mt-3">

                      Total :

                      <span className="font-bold text-orange-500">

                        ₹ {order.totalAmount}

                      </span>

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );
};

export default MyOrders;