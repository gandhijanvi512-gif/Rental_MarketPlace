import { useEffect } from "react"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import api from "../service/api";
import {Heart,Search,Star,User,MapPin,FolderHeart,ShieldCheck,RefreshCcw} from "lucide-react";

const Wishlist=()=>{

    const navigate=useNavigate()
    

    const [wishlist,setwishlist]=useState([])
    const [loading,setLoading]=useState(true)
    const [search,setSearch]=useState("")

    const fetchWishlist=async()=>{
        try{
            setLoading(true)
            const res=await api.get("/getwishlist",{
                withCredentials: true,
            })
            setwishlist(res.data.wishlist||[])
        }catch(err){
            console.log(err);
            setwishlist([])
        }finally{
            setLoading(false)
        }
    }

    const removeWishlist=async()=>{
        try{
            const res=await api.delete(`/removefromwishlist/${productId}`,{
                withCredentials:true
            })

            setwishlist((prev)=>prev.filter((item)=>item.productId._id!==productId))
        }catch(err){
            console.log(err);
            alert(err.response?.data?.message||"Something Went Wrong")
            
        }
    }

    const filterwishlist=wishlist.filter((item)=>{
        return item.productId.title
        .toLowerCase()
        .includes(search.toLowerCase())
    })

    useEffect(()=>{
        fetchWishlist()
    },[])

    if(loading){
        return(
            <div className="wishlist-loading">
                <h2>Loading Wishlist...</h2>
            </div>
        )
    }


    return(
        <div className="wishlist-page">
            <div className="wishlist-header">
                <div className="wishlist-title-group">
                <div className="wishlist-title">
                    <Heart 
                        size={38}
                        color="red"
                        fill="red"
                    />
                    <h1>My Wishlist</h1>
                </div>
                    <p>Your favourite item saved for later</p>
                </div>
            

                <div className="wishlist-count">
                    <span>{wishlist.length} Items</span>
                </div>
            </div>

            {/* search */}

            <div className="wishlist-search">
                <Search size={20}/>
                <input type="text" 
                    placeholder="Search in Wishlist"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />

            </div>

            {
                filterwishlist.length>0?(
                    <div className="wishlist-list">
{
    filterwishlist.map((item) => (
        <div className="wishlist-card" key={item._id}>
            
            {/* 1. LEFT COLUMN: Image */}
            <div className="wishlist-image">
                <button className="wishlist-remove"
                    onClick={(e) => removeWishlist(item.productId._id)}
                >
                    <Heart size={18} color="#ef4444" fill="#ef4444" />
                </button>
                <img src={item.productId.images?.[0]} 
                     alt={item.productId.title} />
            </div>

            {/* 2. MIDDLE COLUMN: Details */}
            <div className="wishlist-details">
                <span className="wishlist-category">
                    {item.productId.category || "Category"}
                </span>
                
                <h2>{item.productId.title}</h2> 
                
                <h3>
                    ₹{item.productId.rentPrice} <span className="price-suffix">/ day</span>
                </h3>
                
                <div className="wishlist-rating">
                    <Star size={18} color="#f59e0b" fill="#f59e0b" />
                    <span>
                        {item.productId.averageRating || "5.0"} ({item.productId.totalReviews || 0} Reviews)
                    </span>
                </div>

                <div className="wishlist-divider"></div>

                {/* <div className="wishlist-badges">
                    <div className="feature-badge">
                        <ShieldCheck size={15} />
                        <span>Secure Booking</span>
                    </div>
                    <div className="feature-badge">
                        <RefreshCcw size={15} />
                        <span>Easy Returns</span>
                    </div>
                </div> */}
            </div>

            {/* 3. RIGHT COLUMN: Actions & Owner */}
            <div className="wishlist-actions">
                <div className="owner-information">
                    <div className="owner-info-header">
                        <div className="owner-icon">
                            <User size={18} />
                        </div>
                        <h4>Owner Information</h4>
                    </div>

                    <div className="owner-info-details">
                        <div className="owner-detail">
                            <User size={16} />
                            <div>
                                <span className="owner-label">Name</span>
                                <strong>{item.productId.ownerId?.name || "Unknown Owner"}</strong>
                            </div>
                        </div>

                        <div className="owner-detail">
                            <MapPin size={16} />
                            <div>
                                <span className="owner-label">Location</span>
                                <strong>
                                    {[
                                        item.productId.ownerId?.city,
                                        item.productId.ownerId?.state,
                                    ].filter(Boolean).join(", ") || "Location not available"}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={() => navigate(`/productsdetails/${item.productId._id}`)}>
                    View Details &gt;
                </button>
            </div>
        </div>
    ))
}
                    </div>
                ):(
                    <div className="empty-wishlist">
                        <FolderHeart 
                            size={70}
                            color="#94a3b8"
                        />

                        <h2>
                            Your Wishlist is Empty
                        </h2>

                        <p>
                            Looks like you haven't added anything to your wishlist yet.
                        </p>

                        <button onClick={()=>navigate("/products")}>
                            Browse Products
                        </button>
                    </div>
                )
            }

        </div>
    )

}
export default Wishlist