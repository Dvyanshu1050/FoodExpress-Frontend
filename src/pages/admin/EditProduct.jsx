import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const [image, setImage] = useState(null);

  // ==========================
  // Get Single Product
  // ==========================
  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct({
        ...res.data,
        category: res.data.category?._id || "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to fetch product");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  // ==========================
  // Handle Input
  // ==========================
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Update Product
  // ==========================
  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);

      if (image) {
        formData.append("image", image);
      }

      await api.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <AdminLayout>
      <h1 className="mb-6 text-3xl font-bold">Edit Product</h1>

      <form
        onSubmit={updateProduct}
        className="space-y-5 rounded-xl bg-white p-6 shadow"
      >
        {/* Product Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
        />

        {/* Upload Image */}
        <label className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-orange-400 bg-orange-50 transition hover:bg-orange-100">
          <FaCloudUploadAlt className="mb-3 text-5xl text-orange-500" />

          <p className="text-lg font-semibold text-gray-700">
            Click to Upload New Image
          </p>

          <p className="mt-2 text-sm text-gray-500">JPG, PNG, JPEG</p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
        </label>

        {/* Preview */}
        <div className="flex justify-center">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-44 w-44 rounded-xl border object-cover shadow-lg"
            />
          ) : (
            product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="h-44 w-44 rounded-xl border object-cover shadow-lg"
              />
            )
          )}
        </div>

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
        />

        {/* Category */}
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Update Product
        </button>
      </form>
    </AdminLayout>
  );
};

export default EditProduct;
