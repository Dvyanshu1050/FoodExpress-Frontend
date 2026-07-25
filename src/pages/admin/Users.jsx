import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
         
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">All Users</h2>

          <span className="bg-orange-500 text-white px-4 py-2 rounded-lg">
            Total Users : {users.length}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-10">
            Loading...
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">

            <table className="w-full">

              <thead className="bg-orange-500 text-white">

                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Joined</th>
                </tr>

              </thead>

              <tbody>

                {users.map((user, index) => (

                  <tr
                    key={user._id}
                    className="text-center border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{index + 1}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          user.role === "admin"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;