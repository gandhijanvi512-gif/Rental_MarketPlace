import { useEffect } from "react"
import { useState } from "react"
import api from "../service/api"

const OwnerHistory=()=>{

    const[history,setHistory]=useState([])
    const[loading,setLoading]=useState(true)


    const fetchHistory=async()=>{
        try{
            const res=await api.get("/bookinghistory",{
                withCredentials:true
            })




            setHistory(res.data.bookings||[])
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchHistory()
    },[])

    const formatDate=(date)=>{
        if(!date){
            return "-"
        }

        return new Date(date).toLocaleDateString("en-In",{
            day:"2-digit",
            month:"short",
            year:"numeric"
        })
    }

    if(loading){
        return(
            <div className="owner-history-page">
                <div className="owner-history-loading">
                    Loading rental history...
                </div>
            </div>
        )
    }


    return(
        <div className="owner-history-page">
            <div className="owner-history-header">
                <div>
                    <h2>Rental History</h2>

                    <p>View all completed rentals of your products.</p>
                </div>

                <div className="history-count">
                    <span>{history.length}</span>
                    <p>Completed Rentals</p>
                </div>
            </div>


            {history.length===0?(
                <div className="no-owner-history">
                    <div className="history-empty-icon">
                        📋
                    </div>

                    <h2>No Rental History</h2>
                    <p>
                        You don't have any completed rentals yet.
                    </p>

                </div>
            ):(
                <div className="owner-history-table-wrapper">
                    <table className="owner-history-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Rented By</th>
                                <th>Rental Period</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {history.map((booking)=>(
                                <tr key={booking._id}>
                                    <td>
                                        <div className="history-product">
                                            {booking.productId?.images?.length>0?(
                                                <img src={booking.productId.images[0]?.url} 
                                                alt={booking.productId.title} />
                                            ):(
                                                 <div className="history-no-image">
                                                    📦
                                                </div>
                                            )}

                                            <div>
                                                <h3>{booking.productId?.title||"Product"}</h3>

                                                <p>₹{booking.productId?.rentPrice||0}/day</p>
                                            </div>
                                        </div>
                                    </td>


                                    {/* user */}

                                    <td>
                                        <div className="history-user">
                                            <strong>
                                                {booking.userId?.name||"Unknown User"}
                                            </strong>

                                            <strong>
                                                {booking.userId?.email||"-"}
                                            </strong>
                                        </div>
                                    </td>


                                    {/* dates */}

                                    <td>
                                        <div className="history-date">
                                            <span>
                                                {formatDate(booking.startDate)}
                                            </span>

                                            <span className="date-arrow">
                                                →
                                            </span>

                                            <span className="history-date">
                                                {formatDate(booking.endDate)}
                                            </span>
                                        </div>
                                    </td>

                                    {/* amount */}

                                    <td>
                                        <strong className="history-amount">
                                            ₹{booking.totalAmount||0}
                                        </strong>
                                    </td>

                                    <td>
                                        <span className="completed-badge">
                                            ✓ Completed
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default OwnerHistory


