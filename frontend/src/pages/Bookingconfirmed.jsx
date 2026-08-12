import { useLocation, useNavigate } from "react-router-dom";
import {CheckCircle2,FileText,Calendar,CreditCard,IndianRupee,Package,Star,Clock,ShieldCheck,User,Phone,
    MapPin,Mail,Download,List,ShoppingBag} from "lucide-react";


function Bookingconfirmed() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="no-booking">
        <h2>No Booking Found!</h2>

        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  const { booking, payment } = state;

  const product = booking?.productId;

  

  const paymentId = payment?._id || payment?.razorpay_payment_id || "N/A";

  const bookingId = booking?._id || "N/A";

  const calculateDuration = () => {
    if (!booking?.startDate || !booking.endDate) {
      return 0;
    }

    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);

    const diffrence = end - start;

    return Math.ceil(diffrence / (1000 * 60 * 60 * 24)) + 1;
  };

  const duration = calculateDuration();

  const formatDate = (dateString) => {
    if (!dateString) {
      return "N/A";
    }

    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const rentPrice =
    Number(booking?.rentPrice) || Number(product?.rentPrice) || 0;

  const deposit = Number(booking?.deposit) || Number(product?.deposit) || 0;

  const totalAmount = Number(booking?.totalAmount) || 0;

  const owner = product?.ownerId || {};

  const calculateRent = rentPrice * duration;

  return (
    <div className="confirmation-page">
      <div className="confirm-header">
        <div className="success-icon-wrapper">
          <CheckCircle2 size={50} color="#ffffff" />
        </div>

        <h1>Payment Successful!</h1>

        <h3 className="subtitle">Your Booking is Confirmed 🎉</h3>

        <p className="thank-you-text">
          Thank you for your booking. Your rental has been successfully
          confirmed.
        </p>

        <div className="info-bar">
          <div className="info-item">
            <div className="icon-box">
              <FileText size={18} />
            </div>

            <div>
              <span>Booking ID</span>

              <strong>
                {bookingId !== "N/A"
                  ? bookingId.slice(-8).toUpperCase()
                  : "N/A"}
              </strong>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-box">
              <Calendar size={18} />
            </div>

            <div>
              <span>Booking Date</span>

              <strong>{formatDate(booking?.createdAt)}</strong>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-box">
              <CreditCard size={18} />
            </div>

            <div>
              <span>Payment ID</span>

              <strong>{paymentId}</strong>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-box">
              <IndianRupee size={18} />
            </div>

            <div>
              <span>Total Paid</span>

              <strong>₹{totalAmount}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="confirm-content">
        <div className="confirm-left">
          <div className="card-section">
            <div className="section-header">
              <Package size={20} className="section-icon" />

              <h2>Booking Details</h2>
            </div>

            <div className="product-summary">
              <img
                src={
                  product?.images?.[0]
                    ? `http://localhost:5200${product.images[0]}`
                    : "/placeholder.jpg"
                }
                alt={product?.title || "Product"}
              />

              <div className="product-info-text">
                <span className="category-badge">
                  {product?.category || "Category"}
                </span>

                <h3>{product?.title || "Product"}</h3>

                <div className="rating">
                  <Star size={14} color="#f59e0b" fill="#f59e0b" />

                  <span>
                    {product?.averageRating || 0} ({product?.totalReview || 0}{" "}
                    Reviews )
                  </span>
                </div>

                <div className="price">
                  ₹{product?.rentPrice || 0}
                  <span>/ day</span>
                </div>
              </div>
            </div>

            <div className="dates-box">
              <div className="date-item">
                <Calendar size={18} />

                <div>
                  <span>Start Date</span>

                  <strong>{formatDate(booking?.startDate)}</strong>
                </div>
              </div>

              <div className="date-item">
                <Calendar size={18} />

                <div>
                  <span>End Date</span>

                  <strong>{formatDate(booking?.endDate)}</strong>
                </div>
              </div>

              <div className="date-item">
                <Clock size={18} />

                <div>
                  <span>Duration</span>

                  <strong>{duration} Days</strong>
                </div>
              </div>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>
                  Rent ( ₹{rentPrice}×{duration} Days)
                </span>

                {/* <span>₹{booking?.rentPrice || calculateDuration}</span> */}
                <span>₹{rentPrice * duration}</span>
              </div>

              <div className="price-row">
                <span>Security Deposit</span>

                <span>₹{deposit}</span>
              </div>
{/* 
              {serviceFee > 0 && (
                <div className="price-row">
                  <span>Service Fee</span>

                  <span>₹{serviceFee}</span>
                </div>
              )} */}

              <hr className="divider" />

              <div className="price-row total-row">
                <span>Total Paid</span>

                <span>₹{totalAmount}</span>
              </div>
            </div>

            <div className="security-alert">
              <ShieldCheck size={20} className="alert-icon" />

              <div>
                <strong>
                  Your payment has been secured and your booking is confirmed.
                </strong>

                <p>Keep your booking details for future reference.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="confirm-right">
          <div className="card-section owner-section">
  <div className="section-header">
    <User size={20} className="section-icon" />
    <h2>Owner Information</h2>
  </div>

  <div className="owner-highlight">

    {/* Owner Profile */}
    <div className="owner-main">
      <div className="owner-avatar">
    {owner?.profileImage ? (
        <img
            src={`http://localhost:5200${owner.profileImage}`}
            alt={owner?.name || "Owner"}
        />
    ) : (
        owner?.name?.charAt(0)?.toUpperCase() || "O"
    )}
</div>

      <div className="owner-identity">
        <h3>{owner?.name || "Product Owner"}</h3>

        <span className="verified-tag">
          <ShieldCheck size={13} />
          Verified Owner
        </span>
      </div>
    </div>

    {/* Owner Details */}
    <div className="owner-details">

      <div className="owner-detail">
        <div className="owner-detail-icon location-icon">
          <MapPin size={17} />
        </div>

        <div>
          <span>Location</span>
          <strong>
            {[owner?.city, owner?.state]
              .filter(Boolean)
              .join(", ") || "Location not available"}
          </strong>
        </div>
      </div>

      {owner?.phone && (
    <div className="owner-detail">
        <div className="owner-detail-icon phone-icon">
            <Phone size={17} />
        </div>

        <div>
            <span>Phone</span>
            <strong>{owner.phone}</strong>
        </div>
    </div>
)}

      {owner?.email && (
    <div className="owner-detail">
        <div className="owner-detail-icon email-icon">
            <Mail size={17} />
        </div>

        <div>
            <span>Email</span>
            <strong>{owner.email}</strong>
        </div>
    </div>
)}

    </div>
  </div>
</div>

<div className="card-section rental-journey-section">
  <div className="section-header">
    <Package size={20} className="section-icon" />
    <h2>Rental Journey</h2>
  </div>

  <div className="rental-journey">

    {/* STEP 1 */}
    <div className="journey-step completed">
      <div className="journey-icon">
        <CheckCircle2 size={19} />
      </div>

      <div className="journey-content">
        <h4>Booking Confirmed</h4>
        <p>
          Your booking and payment have been successfully confirmed.
        </p>
      </div>
    </div>

    {/* STEP 2 */}
    <div className="journey-step">
      <div className="journey-icon">
        <User size={19} />
      </div>

      <div className="journey-content">
        <h4>Owner Confirmation</h4>
        <p>
          The owner will review your booking and prepare your rental.
        </p>
      </div>
    </div>

    {/* STEP 3 */}
    <div className="journey-step">
      <div className="journey-icon">
        <Package size={19} />
      </div>

      <div className="journey-content">
        <h4>Pickup Day</h4>
        <p>
          Collect your rental on your scheduled start date.
        </p>
      </div>
    </div>

  </div>
</div>
        </div>
      </div>

      <div className="confirm-actions">
        {/* <button className="btn-outline">
          <Download size={16} />
          Download Invoice
        </button> */}

        <div className="right-actions">
          <button
            className="btn-outline"
            onClick={() => navigate("/myrentals")}
          >
            <List size={16} />
            View My Bookings
          </button>

          <button className="btn-primary" onClick={() => navigate("/products")}>
            <ShoppingBag size={16} />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bookingconfirmed;

// import { useLocation, useNavigate } from "react-router-dom"

// function Bookingconfirmed(){
//     const navigate=useNavigate()
//     const {state}=useLocation()

//     // console.log("State:",state)

//     if(!state){
//         return <h2>No Booking Found</h2>
//     }

//     const {booking,payment}=state

//     return(
//         <>
//         <div className="confirm-container">
//             <div className="success-icon">
//                 ✅
//             </div>

//             <h1>Booking Confirmed!</h1>

//             <p>
//                 Your booking has been confirmed and payment was successful.
//             </p>

//             <div className="booking-card">
//                 <img src={`http://localhost:5200${booking.productId.images[0]}`} alt={booking.productId.title} />
//             </div>

//             <div className="booking-info">
//                 <h2>{booking.productId.title}</h2>

//                 <p>₹{booking.productId.rentPrice}</p>

//                 <p>Deposite: {booking.productId.deposit}</p>

//                 <hr />

//                 <p>Rental Peroid</p>

//                 <strong>
//                     {booking.startDate.split("T")[0]}{" - "}{booking.endDate.split("T")[0]}
//                 </strong>

//                 <hr />

//                 <div className="price-row">
//                     <span>Rent</span>
//                     <span>₹{booking.rentPrice}</span>
//                 </div>

//                 <div className="price-row">
//                     <span>Deposit</span>
//                     <span>₹{booking.deposit}</span>
//                 </div>

//                 <div className="price-row">
//                     <span>Total</span>
//                     <span>₹{booking.totalAmount}</span>
//                 </div>

//                 <div className="status">
//                     Payment Status:
//                     <span>Paid ✅</span>
//                 </div>
//             </div>
//         </div>

//         <div className="btns">

//             <button onClick={()=>navigate("/booking")}>
//                 View My Bookings
//             </button>

//             <button onClick={()=>navigate("products")}>
//                 Continue Shopping
//             </button>

//         </div>

//     </>

//     )
// }

// export default Bookingconfirmed
