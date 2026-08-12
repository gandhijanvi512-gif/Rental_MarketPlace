import { useState } from "react";
import api from "../../service/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MyProduct=()=>{
    const [products,setProducts]=useState([])
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("All Status");

    const itemsPerPage = 6;

    const navigate=useNavigate()

    const fetchMyProducts=async()=>{
        try{
            const res=await api.get("/getmyproduct",
                {
                    withCredentials:true
                }
            )
            
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

    // derived stats-------------------

    const total=products.length;

    const activeCount=products.filter(
        (p)=>p.status==="Active"
    ).length

    const inActiveCount=products.filter(
        (p)=>p.status==="Inactive"
    ).length

    const outOfStockCount=products.filter(
        (p)=>p.status==="Out Of Stock"
    ).length


    // filter--------------------

    const filteredProducts=products.filter((p)=>{
        const matchSearch=p.title?.toLowerCase().includes(search.toLowerCase())

        const matchesStatus=statusFilter==="All Status" || statusFilter==="All" || p.status===statusFilter

        return matchSearch && matchesStatus
    })

    


    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const statusClass = (status) => {
    if (status === "Active") return "badge-active";
    if (status === "Inactive") return "badge-inactive";
    if (status === "Out of Stock") return "badge-outofstock";
    return "";
  };


    // return(
    //     <div className="product-container">
    //         <h1>My Products</h1>  

    //         <div className="product-grid">
    //             {products?.map((product)=>(
    //                 <div className="product-card" key={product._id}>
    //                     {/* <img src={`http://localhost:5200${product.images[0]}`} alt={product.title} /> */}

    //                     {product.images?.length > 0 && (
    //                         <img
    //                             src={`http://localhost:5200${product.images[0]}`}
    //                             alt={product.title}
    //                         />
    //                         )}

    //                     <h2>{product.title}</h2>
    //                     <p>{product.description}</p>
    //                     <h3>₹{product.rentPrice}</h3>
    //                     <span>Deposit:{product.deposit}</span>
    //                     <p>Category:{product.category}</p>

    //                     <div className="product-actions">
    //                         <button onClick={()=>handleEdit(product._id)}>
    //                             Edit
    //                         </button>

    //                         <button onClick={()=>handleDelete(product._id)}>
    //                             Delete
    //                         </button>
    //                     </div>
    //                 </div>
    //             ))} 
    //         </div>   
    //     </div>
    // )

     return (
    <div className="product-container">
      {/* Header */}
      <div className="product-header">
        <div>
          <h1>My Products</h1>
          <p className="subtitle">Manage all your listed products.</p>
        </div>

        <button
          className="add-product-btn"
          onClick={() => navigate("/addProduct")}
        >
          + Add New Product
        </button>
      </div>

      {/* Stats */}
      <div className="stats-card">
        <div className="stat-item">
          <div className="stat-icon icon-blue">📦</div>
          <div>
            <h3>{total}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon icon-green">✔</div>
          <div>
            <h3>{activeCount}</h3>
            <p>Active</p>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon icon-yellow">⏸</div>
          <div>
            <h3>{inActiveCount}</h3>
            <p>Inactive</p>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon icon-red">🗑</div>
          <div>
            <h3>{outOfStockCount}</h3>
            <p>Out of Stock</p>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="filter-bar">
        <div className="search-box">
          {/* <span className="search-icon">🔍</span> */}
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="All Status">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Product grid */}
      <div className="product-grid">
        {paginatedProducts?.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-image-wrap">
              {product.images?.length > 0 && (
                <img
                  src={`http://localhost:5200${product.images[0]}`}
                  alt={product.title}
                />
              )}
              {product.status && (
                <span className={`status-badge ${statusClass(product.status)}`}>
                  {product.status}
                </span>
              )}
            </div>

            <div className="product-info">
              <h2>{product.title}</h2>
              <p className="category">{product.category}</p>
              <h3 className="price">
                ₹{product.rentPrice} <span>/ day</span>
              </h3>
              <span className="deposit">Deposit: ₹{product.deposit}</span>
            </div>

            <div className="product-actions">
              <button className="edit-btn" onClick={() => handleEdit(product._id)}>
                ✎ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(product._id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={num === page ? "active-page" : ""}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default  MyProduct