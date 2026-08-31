import { useEffect, useState } from "react"
import api from "../service/api"
import { Link } from "react-router-dom"
import { CalendarDays } from "lucide-react"

function MyRental(){
    const [rentals,setRentals]=useState([])
    const [filteredRentals,setFilteredRentals]=useState([])
    const [search,setSearch]=useState("")
    const [loading,setLoading]=useState(true)

    const getRentals=async()=>{
        try{
            const res=await api.get("/getprofile");
            setRentals(res.data.activeRentals)
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getRentals()
    },[])

    useEffect(()=>{
        const filter=rentals.filter((item)=>
            item.productId.title
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        setFilteredRentals(filter)
    },[search,rentals])
    
    if(loading){
        return(
            <h2 className="profile-loading">Loading...</h2>
        )
    }

    return(
        <>
            <div className="myrentals-page">
                <div className="myrentals-header">
                    <div className="">
                        <h1>My Active Rentals</h1>

                        <p>Currently Renting {filteredRentals.length} Items</p>
                    </div>

                    <div className="search-wrapper">
                        <input type="text" placeholder="Search Rentals.." 
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)} 
                        className="search-box"       
                    />
                    <span className="search-icon">🔍</span>
                    </div>

                    
                </div>


                <div className="active-list">
                                    {
                    filteredRentals.map((rental)=>{
                        const today=new Date()

                        const end=new Date(rental.endDate)

                        today.setHours(0,0,0,0)
                        end.setHours(0,0,0,0)

                        const daysLeft=Math.ceil((end-today)/(1000*60*60*24))

                        return(
                            <div className="rental-card" key={rental._id}>

                                <img
                                src={rental.productId.images[0]?.url} 
                                // src={`http://localhost:5200${rental.productId.images[0]}`} 
                                alt={rental.productId.title}
                                className="rental-image" />

                                <div className="rental-details">
                                    <h3>{rental.productId.title}</h3>

                                    <span>{rental.productId.category}</span>

                                    <span>
                                        📅Start Date: {" "}{new Date(rental.startDate).toLocaleDateString()}
                                    </span>

                                    <span>
                                        📅End Date: {" "}{new Date(rental.endDate).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* days left */}

                                <div className="days-card">
                                     <CalendarDays size={22} className="calender-icon" />
                                        <span>
                                            {daysLeft<=0?"Today":`${daysLeft} Days Left`}
                                        </span>
                                    
                                        {/* <span>
                                            {daysLeft<=0?"":"Days Left"}
                                        </span> */}
                                </div>

                                {/* price */}

                                <div className="price-box">
                                    <span>Total Paid</span>

                                    <h3 className="">
                                        ₹{rental.totalAmount}
                                    </h3>
                                </div>

                                <div className="action-box">
                                    <span className="active-badge">
                                        ACTIVE
                                    </span>

                                    <Link to={`/productsdetails/${rental.productId._id}`} className="view-btn">
                                        View Product
                                    </Link>
                                </div>
                            </div>
                            
                        )
                    })
                    
                }
                </div>

            </div>
        </>  
    )
}

export default MyRental