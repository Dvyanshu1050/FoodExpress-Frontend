import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();

  // ==========================
  // Product State
  // ==========================
  const [product, setProduct] = useState({
      name: "",
      price: "",
      category: "",
    });
    const [categories, setCategories] = useState([]);

  // Image State
  const [image, setImage] = useState(null);
const getCategories = async () => {
  try {
    const res = await api.get("/categories");



    setCategories(res.data.categories);

  } catch (error) {
    console.log(error);
  }
};
  // ==========================
  // Handle Input Change
  // ==========================
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Add Product
  // ==========================
  useEffect(() => {
  getCategories();
}, []);

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("image", image);

      await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Added Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <AdminLayout>
      <h1 className="mb-6 text-3xl font-bold">
        Add Product
      </h1>

      <form
        onSubmit={addProduct}
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

        {/* Product Image */}
        <label className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-orange-400 bg-orange-50 transition hover:bg-orange-100">
  <FaCloudUploadAlt className="mb-3 text-5xl text-orange-500" />

  <p className="text-lg font-semibold text-gray-700">
    Click to Upload Image
  </p>

  <p className="mt-2 text-sm text-gray-500">
    JPG, PNG, JPEG
  </p>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
    className="hidden"
  />
</label>

{image && (
  <div className="mt-5">
    <img
      src={URL.createObjectURL(image)}
      alt="Preview"
      className="h-44 w-44 rounded-xl border object-cover shadow-lg"
    />
  </div>
)}
       

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

        <p>Total Categories: {categories.length}</p>
        <select
  name="category"
  value={product.category}
  onChange={handleChange}
  className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
>

  <option value="">
    Select Category
  </option>

  {categories.map((category) => (
    <option
      key={category._id}
      value={category._id}
    >
      {category.name}
    </option>
  ))}

</select>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Add Product
        </button>
      </form>
    </AdminLayout>
  );
};

export default AddProduct;