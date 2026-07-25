import React, { useEffect, useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAuth } from "../../context/AuthContext";
const Orders = () => {
    const { token } = useAuth();

const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);

const fetchOrders = async () => {
  try {
    setLoading(true);

    const res = await api.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrders(res.data.orders);

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (token) {
    fetchOrders();
  }
}, [token]);


const updateStatus = async (id, status) => {
  try {
    await api.put(
      `/orders/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders((prev) =>
      prev.map((order) =>
        order._id === id
          ? { ...order, status }
          : order
      )
    );
  } catch (error) {
    console.log(error);
  }
};


const deleteOrder = async (id) => {
  const ok = window.confirm("Delete this order?");

  if (!ok) return;

  try {
    await api.delete(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchOrders();

  } catch (error) {
    console.log(error);
  }
};
  return (
  <AdminLayout>

    <div className="p-6">

      <h1 className="mb-8 text-3xl font-bold">
        Orders Management
      </h1>

      {loading ? (

        <div className="text-center text-xl font-semibold">
          Loading Orders...
        </div>

      ) : orders.length === 0 ? (

        <div className="rounded-xl bg-white p-10 text-center shadow">

          <h2 className="text-2xl font-semibold">
            No Orders Found
          </h2>

        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order) => (

            <div
  key={order._id}
  className={`rounded-2xl p-6 shadow-lg border transition-all hover:shadow-xl ${
    order.status === "Delivered"
      ? "bg-green-50 border-green-300"
      : order.status === "Cancelled"
      ? "bg-red-50 border-red-300"
      : order.status === "Preparing"
      ? "bg-blue-50 border-blue-300"
      : order.status === "Out For Delivery"
      ? "bg-purple-50 border-purple-300"
      : "bg-yellow-50 border-yellow-300"
  }`}
>

              {/* Header */}

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                  <h2 className="text-xl font-bold">

                    {order.user?.name}

                  </h2>

                  <p className="text-gray-500">

                    {order.user?.email}

                  </p>

                </div>

                <div className="flex items-center gap-3">
  <select
    value={order.status}
    onChange={(e) =>
      updateStatus(order._id, e.target.value)
    }
    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none"
  >
    <option value="Pending">Pending</option>
    <option value="Preparing">Preparing</option>
    <option value="Out For Delivery">Out For Delivery</option>
    <option value="Delivered">Delivered</option>
    <option value="Cancelled">Cancelled</option>
  </select>

  <span
    className={`rounded-full px-4 py-2 text-xs font-bold text-white ${
      order.status === "Delivered"
        ? "bg-green-600"
        : order.status === "Cancelled"
        ? "bg-red-600"
        : order.status === "Preparing"
        ? "bg-blue-600"
        : order.status === "Out For Delivery"
        ? "bg-purple-600"
        : "bg-yellow-500"
    }`}
  >
    {order.status}
  </span>
</div>

              </div>

              <hr className="my-5" />
                            {/* Address */}

              <div className="grid gap-6 md:grid-cols-2">

                <div>

                  <h3 className="font-semibold">
                    Delivery Address
                  </h3>

                  <p>{order.fullName}</p>

                  <p>{order.phone}</p>

                  <p>{order.address}</p>

                  <p>
                    {order.city} - {order.pincode}
                  </p>

                </div>

                <div>

                  <h3 className="font-semibold">
                    Payment
                  </h3>

                  <p>

                    {order.paymentMethod}

                  </p>

                  <h2 className="mt-2 text-xl font-bold text-orange-500">

                    ₹ {order.totalAmount}

                  </h2>

                </div>

              </div>

              <hr className="my-5" />

              <h3 className="mb-4 text-lg font-bold">

                Ordered Items

              </h3>

              <div className="space-y-4">

                {order.products.map((item) => (

                  <div
                    key={item._id}
                    className="flex items-center justify-between"
                  >

                    <div className="flex items-center gap-4">

                      <img
                        src={item.product?.image}
                        alt=""
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      <div>

                        <h3 className="font-semibold">

                          {item.product?.name}

                        </h3>

                        <p>

                          Qty : {item.quantity}

                        </p>

                      </div>

                    </div>

                    <div className="font-bold">

                      ₹ {item.product?.price}

                    </div>

                  </div>

                ))}

              </div>

              <div className="mt-6 flex justify-end">

                <button
                  onClick={() =>
                    deleteOrder(order._id)
                  }
                  className="rounded bg-red-500 px-5 py-2 text-white hover:bg-red-600"
                >

                  Delete Order

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </AdminLayout>
);
}

export default Orders