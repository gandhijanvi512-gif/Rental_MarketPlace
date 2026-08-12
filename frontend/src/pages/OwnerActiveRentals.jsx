import { useState } from "react"
import api from '../service/api'
import { useEffect } from "react"

const OwnerActiveRentals=()=>{
    const [rentals,setRentals]=useState([])
    const [loading,setLoading]=useState(true)


    const fetchActiveRentals=async()=>{
        try{
            const res=await api.get("/activerentals",{
                withCredentials:true
            })
            console.log("ACTIVE RENTALS:", res.data);
            setRentals(res.data.activeRentals||[])
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchActiveRentals()
    },[])

    const formatDate=(date)=>{
        if(!date){
            return "-"
        }

        return new Date(date).toLocaleDateString("en-IN",{
            day:"2-digit",
            month:"short",
            year:"numeric"
        })
    }

    if(loading){
        return(
            <div className="active-rentals-page">
                <div className="active-rentals-loading">
                    Loading active rentals...
                </div>
            </div>
        )
    }


    return(
        <div className="active-rentals-page">
            <div className="active-rentals-header">
                <div>
                    <h1>Active Rentals</h1>

                    <p>
                        Manage products that are currently rented by users.
                    </p>
                </div>

                <div className="active-rentals-count">
                    <span>{rentals.length}</span>
                    <p>Active Rentals</p>
                </div>
            </div>
            


                {rentals.length===0?(
                    <div className="no-active-rentals">
                        <div className="no-rental-icon">
                            📦
                        </div>

                        <h2>No Active Rentals</h2>
                        <p>You don't have any products currently being rented.</p>
                    </div>
                ):(
                    <div className="active-rentals-grid">
                        {rentals.map((rental)=>(
                            <div className="active-rental-card" key={rental._id}>
                                <div className="active-rental-image">
                                    {rental.productId?.images?.length>0?(
                                        <img src={`http://localhost:5200${rental.productId.images[0]}`} 
                                        alt={rental.productId.title} />
                                    ):(
                                    <div className="no-product-image">
                                        📦
                                    </div>
                                    )}
                                    <span className="ongoing-badge">
                                         Ongoing
                                    </span>
                                </div>


                                {/* product information */}

                                <div className="active-rental-content">
                                    <div className="product-title-row">
                                        <h2>
                                            {rental.productId?.title||"Product"}
                                        </h2>
                                    </div>

                                    <div className="renter-section">
                                        <h3>Rented By</h3>

                                        <p className="renter-name">
                                            👤 {rental.userId?.name||"Unknown User"}                           
                                        </p>

                                        <p className="renter-email">
                                            ✉ {rental.userId?.email||"-"}
                                        </p>
                                    </div>


                                    {/* dates */}

                                    <div className="rental-date-box">
                                        <div className="date-item">
                                            <span>Start Date</span>

                                            <strong>
                                                {formatDate(rental.startDate)}
                                            </strong>
                                        </div>

                                        <div className="date-divider">
                                            →
                                        </div>

                                        <div className="date-item">
                                            <span>End Date</span>

                                            <strong>
                                                {formatDate(rental.endDate)}
                                            </strong>
                                        </div>

                                    </div>


                                    <div className="rental-bottom">
                                        <div>
                                            <span>Rent / Day</span>

                                            <strong>
                                                ₹{rental.productId?.rentPrice||0}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Total Amount</span>

                                            <strong className="total-amount">
                                                ₹{rental.totalAmount||0}
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            
        </div>
    )
}

export default OwnerActiveRentals