import { useState } from "react";
import api from "../../service/api";
import "../../css/AddProduct.css";
import { useNavigate } from "react-router-dom";
import categoryData from "../../data/categorydata";
import { useEffect } from "react";
import toast from "react-hot-toast";


const AddProduct = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    rentPrice: "",
    deposit: "",
  });

  const [images, setImages] = useState([]);
  const[previewUrls,setPreviewUrls]=useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFiles=Array.from(e.target.files)
  
    if(images.length+selectedFiles.length>5){
      //  alert("You can upload a maximum of 5 images.");
      // e.target.value="";
      return
    }
    setImages((prev)=>[...prev,...selectedFiles])
    e.target.value="";
  }

  const handleRemoveImage=(index)=>{
    setImages((prev)=>prev.filter((_,i)=>i!==index))
  }

   useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (images.length === 0) {
      toast.error("Please upload at least one product image.");
      return;
    }

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("subcategory",formData.subcategory)
      data.append("rentPrice", formData.rentPrice);
      data.append("deposit", formData.deposit);

      // for (let i = 0; i < images.length; i++) {
      //   data.append("images", images[i]);
      // }

      images.forEach((image)=>{
        data.append("images",image)
      })

      const response=await api.post("/addproduct",data,{
        withCredentials:true,
      })

      toast.success(response.data.message);

      setTimeout(()=>{
        navigate("/products");
      },1000)
      

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
        <p className="subtitle">Add a new product to your rental marketplace.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter product title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                    subcategory: "",
                  })
                }
                required
              >
                <option value="">Select Category</option>
                {Object.keys(categoryData).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Sub Category</label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                required
                disabled={!formData.category}
              >
                <option value="">Select Sub Category</option>
                {formData.category &&
                  categoryData[formData.category].map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rent Price (Per Day)</label>
              <div className="input-with-icon">
                <span className="rupee-icon">₹</span>
                <input
                  type="text"
                  name="rentPrice"
                  placeholder="Enter rent price"
                  value={formData.rentPrice}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Security Deposit</label>
              <div className="input-with-icon">
                <span className="rupee-icon">₹</span>
                <input
                  type="text"
                  name="deposit"
                  placeholder="Enter deposit amount"
                  value={formData.deposit}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="images">Product Images</label>
            <div className="file-upload-box">
              <div className="file-upload-left">
                <span className="file-icon">🖼️</span>
                <div>
                  <p className="file-title">Choose files</p>
                  <p className="file-subtitle">You can select multiple images</p>
                </div>
              </div>
              <label htmlFor="images" className="browse-btn">
                Browse
              </label>
              <input
                type="file"
                name="images"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </div>
          </div>

          {previewUrls.length > 0 && (
            <div className="image-preview-grid">
              {previewUrls.map((image, index) => (
                <div className="image-preview-item" key={index}>
                  <img src={image} alt={`preview-${index}`} />
                  <button
                    type="button"
                    className="remove-img-btn"
                    onClick={() => handleRemoveImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
