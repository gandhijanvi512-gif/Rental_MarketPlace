import { useNavigate } from "react-router-dom";
import api from "../service/api";
import { useLocation } from "react-router-dom";
import { useState } from "react";


function Checkout(){
    const location=useLocation()
    const navigate=useNavigate()

    const item=location.state?.item

    const[loading,setLoading]=useState(false)
    const[verifying,setVerifying]=useState(false)

    if(!item){
        navigate("/cart")
        return null
    }

    const calculateDays=()=>{
        const start=new Date(item.startDate);
        const end=new Date(item.endDate)

        return(
            Math.ceil((end-start)/(1000*60*60*24))+1
        )
    }

    const rentTotal=item.productId.rentPrice*calculateDays()

    const grandTotal=rentTotal+item.productId.deposit;

    const handlePayment=async()=>{
        try{
            setLoading(true)

            //booking

            const bookingRes=await api.post("/createbooking",{
                productId: item.productId._id,
                startDate: new Date(item.startDate).toISOString(),
                endDate: new Date(item.endDate).toISOString()
            })

            //recive booking
            const booking=bookingRes.data.booking

            //razorpay order

            const orderRes=await api.post("/createorder",
                {
                    bookingId:booking._id,
                }
            )

            const {order}=orderRes.data
            console.log(order);

            const options={
                key:import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount:order.amount,
                currency:order.currency,
                name:"Rental MarketPlace",
                description:"Rental Payment",
                order_id:order.id,


//                 handler:async function(response) {
//                     try{
//                         const verifyRes=await api.post("/verifypayment",{
//                             razorpay_order_id:response.razorpay_order_id,
//                             razorpay_payment_id:response.razorpay_payment_id,
//                             razorpay_signature:response.razorpay_signature,
//                         })

//                         if(verifyRes.data.success){
//                             setVerifying(true)

//                             const interval=setInterval(async()=>{
//                                 const statusRes=await api.get(`/paymentstatus/${response.razorpay_order_id}`)
//                             })
                            
//                             if(statusRes.data.status==="PAID"){
//                                 clearInterval(interval)
//                                 setVerifying(false)
                            
                        

//                         // console.log(verifyRes.data);

//                         await api.delete(`/removefromcart/${item._id}`)

//                         alert("Payment Successful")

//                         navigate("/bookingconfirmed",{
//                                 state:{
//                                     booking:verifyRes.data.booking,
//                                     // payment:{
//                                     //     razorpay_order_id:response.razorpay_order_id,
//                                     //     razorpay_payment_id:response.razorpay_payment_id,
//                                     //     razorpay_signature:response.razorpay_signature
//                                     // }
//                                     payment:response
//                                 }
//                             })
//                         }

//                         // if(verifyRes.data.success){
//                         //     // console.log("Navigating....",verifyRes.data);
                            
                            
//                         // }

//                         if(statusRes.data.status==="FAILED"){
//                             clearInterval(interval)
//                             setVerifying(false)
//                             alert("Payment Failed")
//                         }
//                     }
                    

                        
//                     }catch(err){
//                         console.log(err);
//                         console.log(err.response?.data);
//                         console.log(err.message);

//                         // alert(err.response?.data?.message || err.message);
// }
//                 },

                handler: async function (response) {
                    try {

                        const verifyRes = await api.post("/verifypayment", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if(verifyRes.data.success){
                            setVerifying(true);

                            const interval = setInterval(async () => {
                                const statusRes = await api.get(
                                    `/paymentstatus/${response.razorpay_order_id}`
                                );
                                // console.log("Payment Status:", statusRes.data);

                                if (statusRes.data.status === "PAID") {
                                    console.log("Payment is PAID");
                                    clearInterval(interval);
                                    setVerifying(false);

                                    await api.delete(`/removefromcart/${item._id}`);

                                    alert("Payment Successful");

                                    console.log("Cart item removed");
                                    navigate("/bookingconfirmed", {
                                        state: {
                                            booking: verifyRes.data.booking,
                                            payment: response
                                        }
                                    });
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
                    name:"",
                    email:"",
                },
                theme:{
                    color:"#213555"
                }
            }
            const razor=new window.Razorpay(options)

            razor.open()

            setLoading(false)

        }catch(err){
            console.log(err);
            alert(err.response?.data?.message || "Something Went Wrong")
            setLoading(false)
            
        }
    }
    return(
        <div className="checkout-page">

    {verifying && (
        <div className="payment-verifying">
            <h3>Payment received.</h3>
            <p>Confirming payment...</p>
        </div>
    )}


        <div className="checkout-header">
            <button className="back-btn">←</button>
            <h2>Confirm Booking</h2>
        </div>

        <div className="product-card">

            <img
            src={`http://localhost:5200${item.productId.images[0]}`}
            alt={item.productId.title}
            />

            <div className="product-details">
           <h3>{item.productId.title}</h3>

                <p className="price">
                    ₹{item.productId.rentPrice} / day
                </p>

                <p>
                    Deposit : ₹{item.productId.deposit}
                </p>
            </div>

        </div>

        <div className="summary-card">

            <h3>Rental Period</h3>

            <p>
            {new Date(item.startDate).toLocaleDateString()} -
            {new Date(item.endDate).toLocaleDateString()}
            ({calculateDays()} days)
            </p>

            <div className="price-row">
            <span>Rent</span>
            <span>₹{rentTotal}</span>
            </div>

            <div className="price-row">
            <span>Deposit</span>
            <span>₹{item.productId.deposit}</span>
            </div>

            <hr />

            <div className="price-row total">
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
            </div>

        </div>

        <div className="info-box">
            ℹ You will be redirected to Razorpay to complete payment.
        </div>

        <button
            className="pay-btn"
            onClick={handlePayment}
            disabled={loading}
        >
            {loading
            ? "Processing..."
            : `Proceed to Pay ₹${grandTotal}`}
        </button>

        </div>
            )
        }

export default Checkout
