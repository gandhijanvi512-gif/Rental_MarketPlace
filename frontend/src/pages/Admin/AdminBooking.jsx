import { useEffect, useState } from "react"
import api from "../../service/api"

const AdminBooking=()=>{

    const [bookings,setBookings]=useState([])
    const [loading,setLoading]=useState(true)

    const fetchBooking=async()=>{
        try{
            const res=await api.get("/admin/bookings")

            setBookings(res.data.bookings||[])
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchBooking()
    },[])

    if(loading){
        return(
            <div className="admin-page-loading"> 
                Loading Bookings
            </div>
        )
    }

    return(
        <div className="admin-page">
            <div className="admin-page-header">
                <div>
                    <h1>Bookings</h1>
                    <p>Manage all rental bookings</p>
                </div>

                <div className="booking-count">
                    {bookings.length} Bookings
                </div>

            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Dates</th>
                            <th>Amount</th>
                            <th>Status</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length>0?(
                            bookings.map((booking,index)=>(
                                <tr key={booking._id}>
                                    <td>
                                        {index+1}
                                    </td>

                                    <td>
                                        <div className="booking-user">
                                            <div className="booking-avatar">
                                                {booking.userId?.name?.charAt(0)?.toUpperCase() || "U"}
                                            </div>

                                            <div>
                                                <strong>
                                                    {booking.userId?.name||"N/A"}
                                                </strong>

                                                <small>
                                                    {booking.userId?.email||"N/A"}
                                                </small>
                                            </div>
                                        </div>
                                    </td>


                                    {/* product */}

                                    <td>
                                        <div className="booking-product">
                                            <div className="booking-product-icon">
                                                📦
                                            </div>

                                            <div className="booking-product-info">
                                                <strong>
                                                    {booking.productId?.title || "N/A"}
                                                </strong>

                                                <small>
                                                    {booking.productId?.category || "N/A"}
                                                </small>
                                            </div>
                                        
                                           
                                        </div>
                                    </td>

                                    {/* dates */}

                                    <td>
                                        <div className="booking-dates">
                                            <span className="date-label">FROM</span>
                                            <strong>
                                                {new Date(booking.startDate).toLocaleDateString("en-IN",{
                                                    day:"2-digit",
                                                    month:"short",
                                                    year:"numeric"
                                                })}
                                            </strong>

                                            <span className="date-arrow">
                                                →
                                            </span>

                                            <span className="date-label">TO</span>
                                            <strong>    
                                                {new Date(booking.endDate).toLocaleDateString("en-IN",{
                                                    day:"2-digit",
                                                    month:"short",
                                                    year:"numeric"
                                                })}

                                            </strong>
                                            
                                        </div>
                                    </td>


                                    {/* amount */}

                                    <td>
                                        <div className="booking-amount-box">
                                            <span>₹</span>
                                        
                                            {Number(booking.totalAmount||0).toLocaleString("en-IN",{maximumFractionDigits:2})}
                                        </div>
                                    </td>

                                    <td>
                                        <span className={`booking-status ${booking.status}`}>
                                            <span className="status-dot"></span>
                                            {booking.status}
                                        </span>
                                    </td>

                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan="7" className="empty-table">
                                    No Booking Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminBooking