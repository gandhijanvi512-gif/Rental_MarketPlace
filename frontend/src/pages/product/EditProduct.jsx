import { useNavigate, useParams } from "react-router-dom";
import api from "../../service/api";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";


const Updateproduct=()=>{
    const {id}=useParams()

    const navigate=useNavigate();

    const [formData,setFormData]=useState({
        title:"",
        description:"",
        category:"",
        rentPrice:"",
        deposit:""
    })

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const getproduct=async()=>{
        try{
            const res=await api.get(`/getsingleproduct/${id}`,
                {
                    withCredentials:true
                }
            )
            setFormData(res.data.product)
        }catch(err){
            console.log(err);
            
        }
    }

    useEffect(()=>{
        getproduct()
    },[])

    const handleUpdate=async(e)=>{
        e.preventDefault()
        try{
        const response=await api.patch(`/updateproduct/${id}`,
            formData,
            {
                withCredentials:true
            }
        )
        toast.success(response.data.message);

        navigate("/products")
        }catch(err){
            console.log(err)

            alert(err.response?.data?.message || "Update Failed")
        }

    }

      return (
    <div className="add-product-page">
      <div className="add-product-card">
        <h1>Edit Product</h1>
        <p className="subtitle">Update your product details below.</p>

        <form onSubmit={handleUpdate}>
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

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rent Price (Per Day)</label>
              <div className="input-with-icon">
                <span className="rupee-icon">₹</span>
                <input
                  type="number"
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
                  type="number"
                  name="deposit"
                  placeholder="Enter deposit amount"
                  value={formData.deposit}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );


    // return(
    //     <div className="add-product-page">
    //         <div className="add-product-card">
    //             <h1>Edit Product</h1>

    //             <form onSubmit={handleUpdate}>
    //                 <label>Enter Product Title</label>
    //                 <input type="text" name="title" value={formData.title} onChange={handleChange}/>

    //                 <label>Enter Description</label>
    //                 <textarea name="description" value={formData.description} onChange={handleChange}/>

    //                 <label>Enter Category</label>
    //                 <input type="text" name="category" value={formData.category} onChange={handleChange}/>

    //                 <label>Enter Rent Price (Per Day)</label>
    //                 <input type="number" name="rentPrice" value={formData.rentPrice} onChange={handleChange} />

    //                 <label>Enter Security Deposit</label>
    //                 <input type="number" name="deposit" value={formData.deposit} onChange={handleChange} />

    //                 <button type="submit">
    //                     Update
    //                 </button>
    //             </form>
    //         </div>
    //     </div>
    // )
}

export default Updateproduct








