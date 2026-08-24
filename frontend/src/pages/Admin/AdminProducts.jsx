import { useState } from "react"
import api from "../../service/api"
import { useEffect } from "react"
import { Eye, Package, Search, Trash2 } from "lucide-react"

const AdminProducts=()=>{
    
    const [products,setProducts]=useState([])
    const [search, setSearch]=useState("")
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState("")


    const fetchAllProduct=async()=>{
        try{
            const res=await api.get("/getadminproducts")

            if(res.data.success){
                setProducts(res.data.products||[])
            }
        }catch(err){
            console.log(err);
            
            setError(
                err.response?.data?.message || "Failed to load products"
            )
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllProduct()
    },[])


    // delete product

    const handleDelete=async(id)=>{
        const confirmDelete=window.confirm(
            "Are you sure you want to delete this product?"
        )

        if(!confirmDelete){
            return;
        }

        try{    
            const res=await api.delete(`/deleteproduct/${id}`)

            if(res.data.success){
                setProducts(prev=>prev.filter(product=>product._id!==id))
            }
        }catch(err){
            console.log(err);
            
            alert(err.response?.data?.message||"Unable to delete product")
        }
    }


    // search products

    const filteredProducts=(products||[]).filter(product=>{
        const searchValue=search.toLowerCase()

        const title=product.title?.toLowerCase()||"";
        const category=product.category?.toLowerCase()||"";
        const subcategory=product.subcategory?.toLowerCase()||"";
        const ownerName=product.ownerId?.name?.toLowerCase()||"";
        const ownerEmail=product.ownerEmail?.email?.toLowerCase() ||"";


        return(
            title.includes(searchValue) ||
            category.includes(searchValue) ||
            subcategory.includes(searchValue) ||
            ownerName.includes(searchValue) ||
            ownerEmail.includes(searchValue)
        )
    })

    return(
        <div className="admin-product-page">
            <div className="admin-products-header">
                <div>
                    <h1>Products</h1>

                    <p>Manage all products listed on the platform</p>
                </div>
            

                <div className="admin-products-count">
                    <Package size={20}/>

                    <span>{products.length} Products</span>
                </div>

                {/* search */}

                <div className="admin-products-toolbar">
                    <div className="admin-products-search">
                        <Search size={20} />

                        <input type="text"
                            placeholder="Search by product, category or owner..."
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />

                    </div>
                </div>


                {/* error */}

                {error && (
                    <div className="admin-products-error">
                        {error}
                    </div>
                )}

                {/* loading */}

                {loading?(
                    <div className="admin-products-loading">
                        Loading products...

                    </div>
                ):(
                    <div className="admin-products-table-wrapper">
                        <table className="admin-products-table">
                            <thead>
                                <tr>
                                    <th>Products</th>
                                    <th>Category</th>
                                    <th>Owner</th>
                                    <th>Rent Price</th>
                                    <th>Deposit</th>
                                    <th>Rating</th>
                                    <th>Reviews</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredProducts.length>0?(
                                    filteredProducts.map(product=>(
                                        <tr key={product._id}>
                                            <td>
                                                <div className="admin-product-info">
                                                    <div className="admin-product-image">
                                                        {product.images?.length>0?(
                                                            <img src={`http://localhost:5200${product.images[0]}`} 
                                                            alt={product.title} />
                                                        ):(
                                                            <Package size={22} />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            {product.title}
                                                        </strong>

                                                        <span>
                                                            {product.description?product.description.slice(0,45)+(product.description.length>45?"...":""):"No description"}
                                                        </span>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>
                                                <div className="admin-product-category">
                                                    <span>
                                                        {product.category || "-"}
                                                    </span>

                                                    {product.subcategory && (
                                                        <small>
                                                            {product.subcategory}
                                                        </small>
                                                    )}
                                                </div>
                                            </td>

                                            <td>
                                                <div className="admin-product-owner">
                                                    <strong>
                                                        {product.ownerId?.name || "Unknown"}
                                                    </strong>

                                                    <span>
                                                        {product.ownerId?.email || "-"}
                                                    </span>
                                                </div>
                                            </td>

                                            <td>
                                                <strong>
                                                    ₹{Number(
                                                        product.rentPrice || 0
                                                    ).toLocaleString("en-IN")}
                                                </strong>

                                                <small>
                                                    / day
                                                </small>
                                            </td>

                                            <td>
                                                ₹{Number(
                                                    product.deposit || 0
                                                ).toLocaleString("en-IN")}
                                            </td>

                                            <td>
                                                <span className="admin-product-rating">
                                                    ★{" "}

                                                    {Number(
                                                        product.averageRating || 0
                                                    ).toFixed(1)}
                                                </span>
                                            </td>

                                            <td>
                                                {product.totalReview || 0}
                                            </td>

                                            <td>
                                                <div className="admin-product-actions">
                                                    <button className="admin-product-action-view"
                                                        title="View Product"
                                                    >   
                                                        <Eye size={17} />
                                                    </button>

                                                    <button className="admin-product-action-delete"
                                                        title="Delete Product"

                                                        onClick={()=>handleDelete(product._id)}
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>
                                                </div>
                                            </td>


                                        </tr>
                                    ))
                                ):(
                                    <tr>
                                        <td colSpan="8"
                                            className="admin-products-empty"
                                        >
                                            No Products found
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>
        </div>

        

        
        
    )
}

export default AdminProducts