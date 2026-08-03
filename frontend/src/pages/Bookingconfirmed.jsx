import { useLocation, useNavigate } from "react-router-dom"

function Bookingconfirmed(){
    const navigate=useNavigate()
    const {state}=useLocation()

    // console.log("State:",state)

    if(!state){
        return <h2>No Booking Found</h2>
    }

    const {booking,payment}=state

    return(
        <>
        <div className="confirm-container">
            <div className="success-icon">
                ✅
            </div>

            <h1>Booking Confirmed!</h1>

            <p>
                Your booking has been confirmed and payment was successful.
            </p>

            <div className="booking-card">
                <img src={`http://localhost:5200${booking.productId.images[0]}`} alt={booking.productId.title} />
            </div>

            <div className="booking-info">
                <h2>{booking.productId.title}</h2>

                <p>₹{booking.productId.rentPrice}</p>

                <p>Deposite: {booking.productId.deposit}</p>

                <hr />

                <p>Rental Peroid</p>

                <strong>
                    {booking.startDate.split("T")[0]}{" - "}{booking.endDate.split("T")[0]}
                </strong>

                <hr />

                <div className="price-row">
                    <span>Rent</span>
                    <span>₹{booking.rentPrice}</span>
                </div>

                <div className="price-row">
                    <span>Deposit</span>
                    <span>₹{booking.deposit}</span>
                </div>

                <div className="price-row">
                    <span>Total</span>
                    <span>₹{booking.totalAmount}</span>
                </div>

                <div className="status">
                    Payment Status:
                    <span>Paid ✅</span>
                </div>
            </div>
        </div>

        <div className="btns">

            <button onClick={()=>navigate("/booking")}>
                View My Bookings
            </button>

            <button onClick={()=>navigate("products")}>
                Continue Shopping
            </button>
            
        </div>


    </>
        
    )
}

export default Bookingconfirmed 