import { useNavigate, useParams } from "react-router-dom";
import api from "../../service/api";
import { useState } from "react";
import { useEffect } from "react";


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
        alert(response.data.message);

        navigate("/products")
        }catch(err){
            console.log(err)

            alert(err.response?.data?.message || "Update Failed")
        }

    }


    return(
        <div className="add-product-page">
            <div className="add-product-card">
                <h1>Edit Product</h1>

                <form onSubmit={handleUpdate}>
                    <label>Enter Product Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange}/>

                    <label>Enter Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange}/>

                    <label>Enter Category</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange}/>

                    <label>Enter Rent Price (Per Day)</label>
                    <input type="number" name="rentPrice" value={formData.rentPrice} onChange={handleChange} />

                    <label>Enter Security Deposit</label>
                    <input type="number" name="deposit" value={formData.deposit} onChange={handleChange} />

                    <button type="submit">
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Updateproduct
