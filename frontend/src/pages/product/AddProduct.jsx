import { useState } from "react";
import api from "../../service/api";
import "../../css/AddProduct.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const categories={
    Vehicles: [
      "Bike","Car","Scooter","Truck","Bus"
    ],

    Electronics: [
      "Laptop", "Camera", "Mobile", "Tablet", "Projector"
    ],

    Furniture: [
      "Chair", "Table", "Sofa", "Bed", "Cupboard", "Dining Table"
    ],

    Properties: [
      "Room", "Flat", "Apartment", "Bungalow", "Villa"
    ],

    Books: [
      "Academic", "Novel", "Comics"
    ],

  }

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    rentPrice: "",
    deposit: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("subcategory",formData.subcategory)
      data.append("rentPrice", formData.rentPrice);
      data.append("deposit", formData.deposit);

      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      const response = await api.post("/addproduct", data, {
        withCredentials: true,
      });

      alert(response.data.message);
      navigate("/products");

      setFormData({
        title: "",
        description: "",
        category: "",
        subcategory: "",
        rentPrice: "",
        deposit: "",
      });

      setImages([]);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <h1>Add Product</h1>

        <form onSubmit={handleSubmit}>
          <label>Product Title</label>

          <input
            type="text"
            name="title"
            placeholder="Enter product title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>

          <textarea
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Category</label>

          <select 
            name="category" 
            value={formData.category}
            onChange={(e)=>setFormData({
              ...formData,
              category: e.target.value,
              subcategory:""
            })} required>
            
            <option value="">Select Category</option>

            {Object.keys(categories).map((cat)=>(
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label htmlFor="">Sub Category</label>

          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            required
            disabled={!formData.category}
          >
            <option value="">Select Sub Category</option>
              {formData.category && categories[formData.category].map((sub)=>(
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}

          </select>

          <label>Rent Price (Per Day)</label>

          <input
            type="text"
            name="rentPrice"
            placeholder="Enter rent price"
            value={formData.rentPrice}
            onChange={handleChange}
            required
          />

          <label>Security Deposit</label>

          <input
            type="text"
            name="deposit"
            placeholder="Enter deposit amount"
            value={formData.deposit}
            onChange={handleChange}
            required
          />

          <label>Product Images</label>

          <input type="file" multiple onChange={handleImageChange} required />

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
