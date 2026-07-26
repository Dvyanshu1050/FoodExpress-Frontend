import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products");
      setProducts(data || []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Unable to delete product");
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Products</h1>
          <p className="mt-1 text-gray-500">
            Total Products : {products.length}
          </p>
        </div>

        <Link
          to="/admin/add-product"
          className="rounded-lg bg-orange-500 px-5 py-2.5 font-medium text-white transition hover:bg-orange-600"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="table-fixed w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="w-24 px-4 py-4">Image</th>
              <th className="px-4 py-4 text-left">Name</th>
              <th className="w-48 px-4 py-4">Category</th>
              <th className="w-32 px-4 py-4">Price</th>
              <th className="w-40 px-4 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-10 text-center">
                  Loading Products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-10 text-center">
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr
                  key={item._id}
                  className="border-b last:border-none hover:bg-orange-50"
                >
                  <td className="p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      width={60}
                      height={60}
                      className="mx-auto h-14 w-14 rounded-lg object-cover"
                    />
                  </td>

                  <td className="px-4 font-medium">{item.name}</td>

                  <td className="text-center">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-600">
                      {item.category?.name || "Uncategorized"}
                    </span>
                  </td>

                  <td className="text-center font-semibold">
                    ₹ {item.price}
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/edit-product/${item._id}`}
                        className="rounded-lg bg-blue-500 p-2.5 text-white hover:bg-blue-600"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => deleteProduct(item._id)}
                        className="rounded-lg bg-red-500 p-2.5 text-white hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Products;