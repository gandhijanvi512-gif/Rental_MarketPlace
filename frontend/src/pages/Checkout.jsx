import { useNavigate } from "react-router-dom";
import api from "../service/api";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";


function Checkout(){
    const location=useLocation()
    const navigate=useNavigate()

    const item=location.state?.item

    const[loading,setLoading]=useState(false)
    const[verifying,setVerifying]=useState(false)
    const[user,setUser]=useState(null)

    useEffect(()=>{
        if(!item){
        navigate("/cart")
        
    }
    },[item,navigate])

    const calculateDays=()=>{

        if(!item?.startDate||!item?.endDate){
            return 0
        }

        const start=new Date(item.startDate);
        const end=new Date(item.endDate)

        return(
            Math.ceil((end-start)/(1000*60*60*24))+1
        )
    }

    const days=calculateDays()

    const rentTotal=Number(item?.productId?.rentPrice||0)*days

    const deposit=Number(item?.productId?.deposit||0)

    // GST

    const GST_RATE=18;
    const gstAmount=rentTotal * GST_RATE / 100;

    // grand total

    const grandTotal=rentTotal+gstAmount+deposit


    const handlePayment=async()=>{
        try{
            setLoading(true)

            //booking

            const bookingRes=await api.post("/createbooking",{
                productId: item.productId._id,
                startDate: new Date(item.startDate).toISOString(),
                endDate: new Date(item.endDate).toISOString()
            })


            if (!bookingRes.data.success) {

                throw new Error(
                    bookingRes.data.message ||
                    "Booking creation failed"
                );

            }

            //recive booking
            const booking=bookingRes.data.booking

            //razorpay order

            const orderRes=await api.post("/createorder",
                {
                    bookingId:booking._id,
                }
            )

             if (!orderRes.data.success) {

                throw new Error(
                    orderRes.data.message ||
                    "Unable to create payment order"
                );

            }

            const {order}=orderRes.data
            console.log(order);

            const options={
                key:import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount:order.amount,
                currency:order.currency,
                name:"Rental MarketPlace",
                description:"Rental Payment",
                order_id:order.id,


                handler: async function (response) {

                    try {
                        console.log("1️⃣ RAZORPAY RESPONSE:", response);

                        const verifyRes = await api.post("/verifypayment", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        console.log("2️⃣ VERIFY RESPONSE:", verifyRes.data);

                        if(verifyRes.data.success){
                            setVerifying(true);

                            const interval = setInterval(async () => {
                                const statusRes = await api.get(
                                    `/paymentstatus/${response.razorpay_order_id}`
                                );
                                // console.log("Payment Status:", statusRes.data);
                                console.log("3️⃣ PAYMENT STATUS:", statusRes.data);

                                if (statusRes.data.status === "PAID") {
                                    console.log("4️⃣ PAYMENT IS PAID");
                                    clearInterval(interval);
                                    setVerifying(false);

                                    await api.delete(`/removefromcart/${item._id}`);

                                    console.log("5️⃣ NAVIGATING...");

                                    toast.success("Payment Successful");

                                    
                                    navigate("/bookingconfirmed", {
                                        state: {
                                            booking: verifyRes.data.booking,
                                            payment: response
                                        }
                                    });
                                    

                                    console.log("Cart item removed");

                                }

                                if (statusRes.data.status === "FAILED") {
                                    clearInterval(interval);
                                    setVerifying(false);
                                    alert("Payment Failed");
                                }
                            },2000);
                        }
                    } catch(err){
                        console.log(err);
                        console.log(err.response?.data);
                        console.log(err.message);


                    }
                },
                prefill:{
                    name:user?.name||"",
                    email:user?.email||"",
                    contact:user?.contact||""
                },
                theme:{
                    color:"#213555"
                }
            }
            
            // const razor=new window.Razorpay(options)
            
            // razor.open()
            
            // setLoading(false)

            const razor = new window.Razorpay(options);

            razor.on("payment.failed", function (response) {
                console.log("PAYMENT FAILED:", response);
                setLoading(false);

                alert(
                    response.error?.description ||
                    "Payment Failed"
                );
            });

            razor.open();
            setLoading(false);

        }catch(err){
            console.log(err);
            alert(err.response?.data?.message || "Something Went Wrong")
            setLoading(false)
            
        }
    }

    useEffect(()=>{
        const getUser=async()=>{
            try{
                const res=await api.get("/getme")
                setUser(res.data.user)
            }catch(err){
                console.log(err);
                
            }
        }
        getUser()
    },[])

return (
    <div className="checkout-wrapper">

        {verifying && (
            <div className="payment-verifying">
                <h3>Payment received.</h3>
                <p>Confirming payment...</p>
            </div>
        )}

        <div className="checkout-grid">

            {/* ================= LEFT COLUMN ================= */}
            <div className="checkout-main">

                <div className="checkout-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        ←
                    </button>
                    <div>
                        <h2>Confirm Booking</h2>
                        <p>Review your booking details before payment</p>
                    </div>
                </div>

                <div className="product-card">
                    <div className="product-image-box">
                        <img
                        // src={`http://localhost:5200${item.productId.images[0]}`}
                        src={item.productId?.images[0]?.url || "/placeholder.jpg"}
                        alt={item.productId.title}
                    />
                    </div>
                    

                    <div className="product-details">
                        <h3>{item.productId?.title || "Xyz"}</h3>
                        <p className="product-desc">
                            Premium item available for rent. Enjoy flexible rental and affordable pricing.
                        </p>

                        <div className="product-price-row">
                            <div className="price-badge">
                                <span className="price-amount">
                                    ₹{Number(item.productId?.rentPrice || 0).toLocaleString("en-IN")}
                                </span>
                                <span className="price-unit">/ day</span>
                            </div>

                            <div className="deposit-badge">
                                <span className="deposit-label">
                                    Deposit: ₹{Number(deposit || 0).toLocaleString("en-IN")}
                                </span>

                                <span className="deposit-sub">(Refundable)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rental-period-card">
                    <div className="rental-period-left">
                        <div className="rental-period-icon">📅</div>
                        <div>
                            <h3>Rental Period</h3>
                            <p>
                                {new Date(item.startDate).toLocaleDateString("en-IN")} –{" "}
                                {new Date(item.endDate).toLocaleDateString("en-IN")} ({days} days)
                            </p>
                        </div>
                    </div>

                    <div className="days-pill">
                        📅 {days} Days
                    </div>
                </div>

            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <div className="checkout-sidebar">

                <div className="summary-card">
                    <div className="summary-header">
                        <div className="summary-icon">📄</div>
                        <h3>Order Summary</h3>
                    </div>

                    <div className="price-row">
                        <span>Rent ({days} days × ₹{item.productId?.rentPrice})</span>
                        <span>₹{rentTotal.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="price-row">
                        <span>GST ({GST_RATE}%)</span>
                        <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="price-row">
                        <span>Deposit (Refundable)</span>
                        <span>₹{deposit.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="grand-total-box">
                        <div>
                            <strong>Grand Total</strong>
                            <p>(Incl. of all taxes)</p>
                        </div>
                        <span className="grand-total-amount">
                            ₹{grandTotal.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div className="info-box">
                        <div>
                            You will be redirected to <strong>Razorpay</strong> to complete payment securely.
                        </div>
                    </div>

                    <button
                        className="pay-btn"
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : (
                            <>🔒 Proceed to Payment →</>
                        )}
                    </button>

                    <p className="secure-note">
                        Secure payments powered by Razorpay
                    </p>
                </div>

            </div>

        </div>

    </div>
);


}

export default Checkout
