import { useState } from "react";
import api from "../../service/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MyProduct=()=>{
    const [products,setProducts]=useState([])

    const navigate=useNavigate()

    const fetchMyProducts=async()=>{
        try{
            const res=await api.get("/getmyproduct",
                {
                    withCredentials:true
                }
            )
            console.log(res.data);
            setProducts(res.data.product)
        }catch(err){
            console.log(err);
            
        }
    }
    useEffect(()=>{
        fetchMyProducts()
    },[])

    const handleEdit=(id)=>{
        navigate(`/updateProduct/${id}`)
    }

    const handleDelete=async(id)=>{
        try{
            const response=await api.delete(`/deleteproduct/${id}`,
                {
                    withCredentials:true
                }
            )
            console.log(response.data);
            alert(response.data.message);
            
            fetchMyProducts()
        }catch(err){
            console.log(err);
            alert(err.response?.data?.message);
            
        }
    }

    return(
        <div className="product-container">
            <h1>My Products</h1>  

            <div className="product-grid">
                {products?.map((product)=>(
                    <div className="product-card" key={product._id}>
                        {/* <img src={`http://localhost:5200${product.images[0]}`} alt={product.title} /> */}

                        {product.images?.length > 0 && (
                            <img
                                src={`http://localhost:5200${product.images[0]}`}
                                alt={product.title}
                            />
                            )}

                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <h3>₹{product.rentPrice}</h3>
                        <span>Deposit:{product.deposit}</span>
                        <p>Category:{product.category}</p>

                        <div className="product-actions">
                            <button onClick={()=>handleEdit(product._id)}>
                                Edit
                            </button>

                            <button onClick={()=>handleDelete(product._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))} 
            </div>   
        </div>
    )
}

export default  MyProduct