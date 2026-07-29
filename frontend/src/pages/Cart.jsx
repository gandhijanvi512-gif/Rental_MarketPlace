import { useEffect, useState } from "react";
import api from "../service/api";
// import "../css/cart.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [startDate, setStartDate] = useState(null);

  const navigate=useNavigate()

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/getCart");

      const serverCart = res.data.items || [];

      const savedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

      serverCart.forEach((item) => {
        const localItem = savedCart.find((i) => i._id === item._id);

        if (localItem) {
          item.startDate = localItem.startDate;
          item.endDate = localItem.endDate;
        }
      });

      setCartItems(serverCart);

      localStorage.setItem("cartItems", JSON.stringify(serverCart));
    } catch (error) {
      console.log(error);
    }
  };

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    return diff > 0 ? diff : 0;
  };

  const calculateTotal = (item) => {
    const days = calculateDays(item.startDate, item.endDate);

    return item.productId.deposit + item.productId.rentPrice * days;
  };

  const handleDateChange = (index, field, date) => {
    setCartItems((prevItems) => {
      // 1. Create a shallow copy of the entire array
      const newItems = [...prevItems];

      //Create a deep copy of the specific item being changed
      newItems[index] = { ...newItems[index], [field]: date };

      localStorage.setItem("cartItems", JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(`/removefromcart/${productId}`);

      const updatedCart = cartItems.filter((item) => item._id !== productId);

      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookNow=(item)=>{
    if(!item.startDate || !item.endDate){
      alert("Please select start date or end date")
      return
    }

    navigate("/checkout",{
      state:{
        item,
      },
    })
  }


  const rentTotal = cartItems.reduce((total, item) => {
    const days = calculateDays(item.startDate, item.endDate);

    return total + (item.productId?.rentPrice || 0) * days;
  }, 0);

  const depositTotal = cartItems.reduce((total, item) => {
    return total + (item.productId?.deposit || 0);
  }, 0);

  const grandTotal = rentTotal + depositTotal;

  return (
    <div className="cart-container">
      <h1 className="cart-title">My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
        </div>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div className="cart-card" key={item._id}>
              {/* TOP RIGHT DELETE ICON */}
              <button
                className="delete-icon"
                onClick={() => removeItem(item._id)}
                title="Remove Item"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>

              {/* ================= LEFT COLUMN ================= */}
              <div className="cart-left">
                <div className="cart-image-wrapper">
                  <img
                    src={`http://localhost:5200${item.productId?.images?.[0]}`}
                    alt={item.productId?.title}
                  />
                </div>

                <div className="cart-left-bottom">
                  <h2 className="total-price">
                    Total: ₹{calculateTotal(item)}
                  </h2>

                  <div className="cart-actions">
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item._id)}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                      Remove
                    </button>
                    <button className="book-btn" onClick={()=>handleBookNow(item)}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              {/* ================= RIGHT COLUMN ================= */}
              <div className="cart-right">
                <h2 className="product-title">{item.productId?.title}</h2>

                <div className="price-info">
                  <span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                      <line x1="7" y1="7" x2="7.01" y2="7"></line>
                    </svg>
                    Rent Price: ₹{item.productId?.rentPrice}/day
                  </span>
                  <span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    Deposit: ₹{item.productId?.deposit}
                  </span>
                </div>

                <div className="date-section">
                  {/* START DATE GROUP */}
                  <div className="input-group">
                    <label>Start Date</label>

                    {/* ફોટા જેવું જ ઇનપુટ બોક્સ જેમાં સિલેક્ટ કરેલી ડેટ દેખાશે */}
                    <div className="custom-date-display-box">
                      <span>
                        {item.startDate
                          ? new Date(item.startDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "Select Start Date"}
                      </span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>

                    {/* કાયમ માટે ખુલ્લું રહેતું કેલેન્ડર */}
                    <div className="inline-calendar-container">
                      <DatePicker
                        selected={
                          item.startDate ? new Date(item.startDate) : null
                        }
                        onChange={(date) =>
                          handleDateChange(index, "startDate", date)
                        }
                        inline
                        minDate={new Date()}
                      />
                    </div>
                  </div>

                  {/* END DATE GROUP */}
                  <div className="input-group">
                    <label>End Date</label>

                    {/* display selected date */}
                    <div className="custom-date-display-box">
                      <span>
                        {item.endDate
                          ? new Date(item.endDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "Select End Date"}
                      </span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>

                    {/* always open calender */}
                    <div className="inline-calendar-container">
                      <DatePicker
                        selected={item.endDate ? new Date(item.endDate) : null}
                        onChange={(date) =>
                          handleDateChange(index, "endDate", date)
                        }
                        inline
                        minDate={
                          item.startDate ? new Date(item.startDate) : new Date()
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CART SUMMARY */}

          <div className="cart-summary-card">
            <div className="summary-header">
              <div className="summary-icon-box">
                {/* clipboard icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#213555"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h2>Order Summary</h2>
            </div>

            <div className="summary-body">
              {/* Rent Total Item */}
              <div className="summary-item">
                <div className="item-label-group">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3E5879"
                    strokeWidth="2"
                  >
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                  <h3>Rent Total</h3>
                </div>
                <p className="item-value">₹{rentTotal}</p>
              </div>

              {/* Deposit Total Item */}
              <div className="summary-item">
                <div className="item-label-group">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3E5879"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <h3>Deposit Total</h3>
                </div>
                <p className="item-value">₹{depositTotal}</p>
              </div>

              {/* Divider Line */}
              <div className="summary-divider"></div>

              {/* Grand Total Item - Bold and Distinct */}
              <div className="summary-item grand-total-item">
                <div className="item-label-group">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#213555"
                    strokeWidth="2.5"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  <h3>Grand Total</h3>
                </div>
                <p className="item-value total-amount">₹{grandTotal}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
