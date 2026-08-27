import { useNavigate } from "react-router-dom";
import api from "../service/api";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const Product=()=>{
    const navigate=useNavigate()

    const [products,setProducts]=useState([]);
    const [search,setSearch]=useState("");
    const [category,setCategory]=useState("");
    const [minPrice,setMinPrice]=useState("");
    const [maxPrice,setMaxPrice]=useState("");
    const [loading,setLoading]=useState(false)
    const [wishlistIds,setwishlistIds]=useState([]);


    const fetchProducts=async(productId)=>{
        try{
            const res=await api.get("/getProduct",{
                params:{
                    search,
                    category,
                    minPrice,
                    maxPrice
                }
            })
            setProducts(res.data.products||[])
        }catch(err){
            console.log(err);
            setProducts([])
            
        }
    }

    const handlewishlist=async(productId)=>{
      try{
        setLoading(true)

        if(wishlistIds.includes(productId)){
          await api.delete(`/removefromwishlist/${productId}`,{
            withCredentials:true
          })

          setwishlistIds((prev)=>prev.filter((id)=>id!==productId))
        }else{
          await api.post(`/addtowishlist/${productId}`,{},{withCredentials:true})
          setwishlistIds((prev) => [...prev, productId]);
        }
        

      }catch(err){
        alert(err.response?.data?.message||"Something went wrong")
      }finally{
        setLoading(false)
      }
    }

    const fetchWishlist=async()=>{
      try{
        const res=await api.get("/getwishlist",{
          withCredentials:true
        })

        const ids=res.data.wishlist.map((item)=>item.productId._id)

        setwishlistIds(ids)
      }catch(err){
        console.log(err)
        
      }
    }

    useEffect(()=>{
        fetchProducts()
    },[search,category,minPrice,maxPrice])

    useEffect(()=>{
      fetchWishlist()
    },[])

    return (
    <div className="min-h-screen p-6">
      {/* Filters */}
        {/* Search & Filter Bar */}
<div className="max-w-7xl mx-auto mb-12">
  <div
    className="
      flex items-center
      bg-[#F5EFE7]/20
      backdrop-blur-xl
      border border-white/30
      rounded-full
      shadow-2xl
      overflow-hidden
    "
  >
    {/* Search */}
    <div className="flex-1 px-8 py-5 border-r border-white/20">
      <p className="text-xs font-bold uppercase text-[#213555]">
        What
      </p>
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          bg-transparent
          outline-none
          text-[#213555]
          placeholder:text-gray-500
        "
      />
    </div>

    {/* Category */}
    {/* <div className="w-56 px-8 py-5 border-r border-white/20">
      <p className="text-xs font-bold uppercase text-[#213555]">
        Category
      </p>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="
          w-full
          bg-transparent
          outline-none
          text-[#213555]
        "
      >
        <option value="">All</option>
        <option value="Bike">Bike</option>
        <option value="Camera">Camera</option>
        <option value="Laptop">Laptop</option>
        <option value="Book">Book</option>
        <option value="Home">Home</option>
        <option value="">Furniture</option>
      </select>
    </div> */}

    {/* Min Price */}
    <div className="w-48 px-8 py-5 border-r border-white/20">
      <p className="text-xs font-bold uppercase text-[#213555]">
        Min Price
      </p>

      <input
        type="number"
        placeholder="₹0"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="
          w-full
          bg-transparent
          outline-none
          text-[#213555]
          placeholder:text-gray-500
        "
      />
    </div>

    {/* Max Price */}
    <div className="w-48 px-8 py-5">
      <p className="text-xs font-bold uppercase text-[#213555]">
        Max Price
      </p>

      <input
        type="number"
        placeholder="₹10000"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="
          w-full
          bg-transparent
          outline-none
          text-[#213555]
          placeholder:text-gray-500
        "
      />
    </div>

    {/* Search Button */}
    {/* <button
      onClick={fetchProducts}
      className="
        mr-3
        px-8
        py-4
        rounded-full
        bg-[#213555]
        text-white
        font-semibold
        hover:bg-[#3E5879]
        transition-all
      "
    >
      Search
    </button> */}
  </div>
</div>

      {/* Products */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
{products?.map((product) => (
  <div
    key={product._id}
    className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
  >
    <button
      className="wishlist-btn"
      onClick={() => handlewishlist(product._id)}
      disabled={loading}
    >
      <Heart
        size={22}
        fill={
          wishlistIds.includes(product._id) ? "red" : "none"
        }
        color={
          wishlistIds.includes(product._id) ? "red" : "#374151"
        }
      />
    </button>

    <img
      src={`http://localhost:5200${product.images?.[0]}`}
      alt={product.title}
      className="w-120 h-80 object-cover product-card-image"
    />

    <div className="p-5">
      <h2 className="text-xl font-medium text-[#213555]">
        {product.title}
      </h2>

      <h3 className="mt-2 text-[#3E5879]">
        Category: {product.category}
      </h3>

      <h3 className="mt-2 text-[#3E5879]">
        ₹{product.rentPrice}/day
      </h3>

      {product.availability?.available ? (
        <div className="mt-3 px-3 py-2 rounded-lg bg-[#F5EFE7] text-[#213555] text-sm font-medium">
          Available Today
        </div>
      ) : (
        <div className="mt-3 px-3 py-2 rounded-lg bg-[#F5EFE7] text-[#213555] text-sm">
          <strong>
            Unavailable for {product.availability?.unavailableDays} day
            {product.availability?.unavailableDays > 1 ? "s" : ""}
          </strong>

          <br />

          Available from{" "}
          {product.availability?.availableFrom
            ? new Date(
                product.availability.availableFrom
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              })
            : "-"}
        </div>
      )}

      <button
        onClick={() =>
          navigate(`/productsdetails/${product._id}`)
        }
        className="mt-4 w-full bg-[#213555] text-white py-2 rounded-xl hover:bg-[#3E5879] transition"
      >
        View Details
      </button>
    </div>
  </div>
))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No products found.
        </p>
      )}
    </div>
  );

  



}

export default Product