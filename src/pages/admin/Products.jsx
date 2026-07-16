import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Deleted Successfully");

      getProducts();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>

        <Link
          to="/admin/add-product"
          className="rounded-lg bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-5 py-3 text-left">Image</th>
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Category</th>
              <th className="px-5 py-3 text-left">Price</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="px-5 py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </td>

                <td className="px-5 py-3 font-medium">{item.name}</td>

                <td className="px-5 py-3">
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
                    {item.category?.name || "Uncategorized"}
                  </span>
                </td>

                <td className="px-5 py-3">₹ {item.price}</td>

                <td className="px-5 py-3">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/admin/edit-product/${item._id}`}
                      className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Products;
