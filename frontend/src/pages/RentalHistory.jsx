
import { useEffect, useMemo, useState } from "react"
import api from "../service/api"
import { useNavigate } from "react-router-dom";


function RentalHistory(){

    const navigate=useNavigate()

    const[history,setHistory]=useState([]);
    const[loading,setLoading]=useState(true);

    const[search,setSearch]=useState("");
    const[month,setMonth]=useState("all");
    const[sort,setSort]=useState("new");


    useEffect(()=>{
        getRentalHistory()
    },[])

    const getRentalHistory=async()=>{
        try{
            setLoading(true)

            const res=await api.get("/getbookinghistory")
            setHistory(res.data.bookings||[])
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
    }

    const filteredHistory=useMemo(()=>{
        return[...history]

        .filter((item)=>{
            const title=item.productId?.title?.toLowerCase() || "";

            const category=item.productId?.category?.toLowerCase() || "";

            const keyword=search.toLowerCase();

            const searchMatch=title.includes(keyword)||category.includes(keyword)

            const monthMatch=month==="all"?true : new Date(item.startDate).getMonth()+1===Number(month)

            return searchMatch && monthMatch
        })

        .sort((a,b)=>{
            if(sort==="new"){
                return(
                    new Date(b.startDate)-new Date(a.startDate)
                )
            }
                return(
                    new Date(a.startDate)-new Date(b.startDate)
                )
        })

        
    },[history,search,month,sort])

    return (
<div className="history-page">

    {/* Header */}

    <div className="history-header">

        <div>

            <h1>Rental History</h1>

            <p>
                Completed Rentals :
                <span>{filteredHistory.length}</span>
            </p>

        </div>

        <input type="text" className="history-search"
            placeholder="🔍 Search Rentals..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        />

    </div>

    {/* Filters */}

    <div className="history-filter-bar">

        <select
            value={month}
            onChange={(e)=>setMonth(e.target.value)}
        >
            <option value="all">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>

        <select
            value={sort}
            onChange={(e)=>setSort(e.target.value)}
        >
            <option value="new">Newest to Oldest</option>
            <option value="old">Oldest to Newest</option>
        </select>

    </div>

    {/* Loading */}

    {loading ? (

        <div className="history-loading">
            Loading Rental History...
        </div>

    ):filteredHistory.length===0?(
        <div className="empty-history">
            <div className="empty-icon">
                📦
            </div>
            <h2>No Rental History Found</h2>
            <p>Try changing search or filters.</p>

        </div>

    ):(
        filteredHistory.map((item)=>{
            const days =Math.ceil((new Date(item.endDate)-new Date(item.startDate))/(1000*60*60*24))+1;

            return(
                <div className="history-card" key={item._id}>

                    {/* Product Image */}
                    <div className="history-image">
                        <img
                            src={`http://localhost:5200${item.productId.images[0]}`}
                            alt={item.productId.title}
                        />
                    </div>

                    {/* Product Details */}

                    <div className="history-info">
                        <h2>{item.productId.title}</h2>
                        <span className="category">{item.productId.category}</span>

                        <div className="history-dates">
                            <p>
                                📅 Start Date :{new Date(item.startDate).toLocaleDateString()}
                            </p>

                            <p>
                                📅 End Date :{new Date(item.endDate).toLocaleDateString()}
                            </p>
                        </div>

                    </div>

                    {/* Rental Period */}

                    <div className="history-period">
                        <div className="period-icon">
                            📅
                        </div>

                        <div>
                            <h3>{new Date(item.startDate).toLocaleDateString()}</h3>

                            <span>-</span>

                            <h3>{new Date(item.endDate).toLocaleDateString()}</h3>

                            <p>Rental Period</p>
                        </div>
                    </div>

                    {/* Price */}

                    <div className="history-price">
                        <p>Total Paid</p>
                        <h2>₹{item.totalAmount}</h2>
                    </div>

                    {/* Action */}

                    <div className="history-action">
                        <div className="completed-badge">
                            COMPLETED ✓
                        </div>

                        <button
                            onClick={()=>
                                navigate(`/productdetails/${item.productId._id}`)
                            }
                        >
                            View Product
                        </button>
                    </div>
                </div>
            );
        })
    )}

    {!loading && filteredHistory.length>0 && (

        <div className="history-footer">
            No more history to show
        </div>

    )}

</div>
);
}

export default RentalHistory





