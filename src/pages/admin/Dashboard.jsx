import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
    const { token } = useAuth();

const [stats, setStats] = useState({
  totalUsers: 0,
  totalProducts: 0,
  totalOrders: 0,
  totalRevenue: 0,
  latestOrders: [],
});

const [loading, setLoading] = useState(true);

const fetchDashboard = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setStats(res.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (token) {
    fetchDashboard();
  }
}, [token]);


  return (
    <AdminLayout>

      <h1 className="mb-6 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Products</h2>
          <h1 className="mt-3 text-4xl font-bold">
  {loading ? "..." : stats.totalProducts}
</h1>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Users</h2>
          <h1 className="mt-3 text-4xl font-bold">
  {loading ? "..." : stats.totalUsers}
</h1>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Orders</h2>
         <h1 className="mt-3 text-4xl font-bold">
  {loading ? "..." : stats.totalOrders}
</h1>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Revenue</h2>
          <h1 className="mt-3 text-4xl font-bold text-green-600">
  {loading ? "..." : `₹${stats.totalRevenue}`}
</h1>
        </div>
<div className="mt-10 rounded-xl bg-white p-6 shadow">

  <h2 className="mb-6 text-2xl font-bold">
    Latest Orders
  </h2>

  {loading ? (

    <p>Loading...</p>

  ) : stats.latestOrders.length === 0 ? (

    <p>No Orders Found</p>

  ) : (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="py-3 text-left">
              Customer
            </th>

            <th className="py-3 text-left">
              Amount
            </th>

            <th className="py-3 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {stats.latestOrders.map((order) => (

            <tr
              key={order._id}
              className="border-b"
            >

              <td className="py-4">

                {order.user?.name}

              </td>

              <td>

                ₹ {order.totalAmount}

              </td>

              <td>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-600">

                  {order.status}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )}

</div>
      </div>

    </AdminLayout>
  );
};

export default Dashboard;