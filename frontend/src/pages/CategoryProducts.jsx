import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import categoryData from "../data/categorydata"
import api from "../service/api"

function CategoryProducts(){
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

                <h3>Loading...</h3>

            ):filteredProducts.length===0?(
                <h3>No Products Found</h3>
            ):(

                <div className="product-grid">
                    {filteredProducts.map((item) => (
                        // <div className="product-card" key={item._id}>
                        //     <img
                        //         src={`http://localhost:5200${item.images[0]}`}
                        //         alt={item.title}
                        //     />

                        //     <div className="product-content">
                        //         <h3>{item.title}</h3>

                        //         <p><strong>Category: </strong>{item.category}</p>
                        //         {item.subcategory && (
                        //             <p><strong>SubCategory: </strong>{item.subcategory}</p>
                                    
                        //         )}

                        //         <div className="price-row">
                        //             <span>₹{item.rentPrice}/day</span>
                        //             <span>₹{item.deposit}</span>
                        //         </div>
                                
                        //         <button className="details-btn">
                        //             View Details
                        //         </button>
                        //     </div>

                        // </div>

                        <div className="product-card" key={item._id}>
    <img
        src={`http://localhost:5200${item.images[0]}`}
        alt={item.title}
    />

    <div className="product-content">

        <h3>{item.title}</h3>

        <p className="product-category">
            <strong>Category:</strong> {item.category}
        </p>

        <p className="product-sub">
            <strong>Sub Category:</strong> {item.subcategory}
        </p>

        <div className="price-row">
            <div className="rent">
                ₹{item.rentPrice}
                <span>/day</span>
            </div>

            <div className="deposit">
                ₹{item.deposit}
            </div>
        </div>

        <button className="details-btn">
            View Details
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