import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import categoryData from "../data/categorydata"
import api from "../service/api"


function CategoryProducts(){
    const navigate=useNavigate()

    const {category}=useParams()

    const [products,setProducts]=useState([])
    const [filteredProducts,setFilteredProducts]=useState([])
    const [loading,setLoading]=useState(true)
    const [selectedSubCategory,setSelectedSubCategory]=useState("All")

    useEffect(()=>{
        getProduct()
    },[category])

    const getProduct=async()=>{
        try{
            setLoading(true)
            const res=await api.get(`/getproductbycategory/${category}`)
            setProducts(res.data.products);
            setFilteredProducts(res.data.products);
            setSelectedSubCategory("All")

        }catch(err){
            console.log(err);

        }finally{
            setLoading(false)
        }
    }

    const filterProducts=(sub)=>{
        setSelectedSubCategory(sub)

        if(sub=="All"){
            setFilteredProducts(products)
        }else{
            const data=products.filter((item)=>item.subcategory===sub)
            setFilteredProducts(data)
        }
    }

    return(
        <>
            <div className="category-products-container">
                <h1 className="section-title">{category}</h1>

                <div className="subcategory-button">
                    <button className={selectedSubCategory==="All" ? "active":""}
                        onClick={()=>filterProducts("All")}
                    >
                        All
                    </button>

                    {categoryData[category]?.map((sub)=>(
                        <button
                            key={sub}
                            className={selectedSubCategory===sub?"active":""}
                            onClick={()=>filterProducts(sub)}
                        >
                            {sub}
                        </button>
                    ))}
                </div>

                {loading? (

                <h3 className="status-text">Loading...</h3>

            ):filteredProducts.length===0?(
                <h3 className="status-text">No Products Found</h3>
            ):(

                <div className="product-grid">
                    {filteredProducts.map((item) => (

                        <div className="product-card" key={item._id}>
                            <div className="product-image-container">
                                    <img
                                        src={`http://localhost:5200${item.images[0]}`}
                                        alt={item.title}
                                    />
                                    <span className="badge-rent">FOR RENT</span>
                            </div>


    <div className="pd-content">
        <div className="pd-tags">
            <span className="pd-tag">{item.subcategory||item.category}</span>
        </div>

        <h3 className="pd-title">{item.title}</h3>

        {/* <p className="product-category">
            <strong>Category:</strong> {item.category}
        </p>

        <p className="product-sub">
            <strong>Sub Category:</strong> {item.subcategory}
        </p> */}

        <div className="pd-price-row">
            <div className="pd-rent">
                <span className="pd-currency">₹</span>
                <span className="pd-amount">{item.rentPrice}</span>
                <span className="pd-period">/day</span>
            </div>

            {item.deposit && (
            <div className="pd-deposit">
                Deposit: ₹{item.deposit}
            </div>
            )}

        </div>

        <button className="pd-btn" onClick={()=>navigate(`/productsdetails/${item._id}`)}>
            View Details

            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
        </button>

    </div>
</div>

                    ))}

                </div>

            )}
            </div>
        </>
    )
}

export default CategoryProducts