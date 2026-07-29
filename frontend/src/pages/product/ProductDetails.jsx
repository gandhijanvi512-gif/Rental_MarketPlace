import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../service/api"
import "../../css/AddProduct.css"

const ProductDetails=()=>{
  const {id}=useParams()
  const navigate=useNavigate()

  const [product,setProduct]=useState(null)

  const handleAddToCart=async()=>{
    try{
      await api.post("/addtocart",{
        productId: product._id
      })
      alert("Product add to cart")
      navigate("/cart")
    }catch(err){
      console.log(err);
      alert("Failed to add product to cart")
      
    }
  }

  const fetchProducts=async()=>{
    try{
      const res=await api.get(`/getproductdetails/${id}`)

      setProduct(res.data.product)
    }catch(err){
      console.log(err);
      
    }
  }


  useEffect(()=>{
    fetchProducts()
  },[])

  if(!product)
    return <h2>Loading...</h2>

  return(
<div className="details-container">

  <div className="image-gallery">
    {product.images?.map((img, index) => (
      <img
        key={index}
        src={`http://localhost:5200${img}`}
        alt={product.title}
      />
    ))}
  </div>

  <div className="product-info">

    <h1>{product.title}</h1>

    <p className="description">
      {product.description}
    </p>

    <div className="price-box">
      ₹{product.rentPrice}
      <span>/day</span>
    </div>

    <div>
      <button className="cart-btn" onClick={handleAddToCart}>Add To Cart</button>
    </div>

    <div className="product-meta">
      <p>
        <strong>Deposit:</strong>
        ₹{product.deposit}
      </p>

      <p>
        <strong>Category:</strong>
        {product.category}
      </p>

      <p>
        <strong>Sub Category:</strong>
        {product.subcategory}
      </p>
    </div>

    <div className="owner-card">

      <h2>Owner Information</h2>

      <p>
        <strong>Name:</strong>
        {product.ownerId?.name}
      </p>

      <p>
        <strong>Email:</strong>
        {product.ownerId?.email}
      </p>

    </div>



  </div>

</div>
  )

}

export default ProductDetails