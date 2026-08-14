import { useState } from "react"
import api from "../service/api"
import { useEffect } from "react"
// import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from "recharts";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const OwnerEarning=()=>{
    const[earnings,setEarnings]=useState([])
    // const[monthlyEarning,setMonthlyEarning]=useState([])
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const[summary,setSummary]=useState({
        totalEarning:0,
        totalCommission:0,
        totalRentals:0,
        averageEarning:0
    })
    const[loading,setLoading]=useState(true)


    const getOwnerEarning=async()=>{
        try{
            const res=await api.get("/getownerearning",{
                withCredentials:true
            })

            setEarnings(res.data.earnings||[]);
            setSummary(res.data.summary||{})
            setMonthlyEarning(res.data.monthlyEarning||[])
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
    }

const monthlyData = Array.from({ length: 12 }, (_, index) => {

    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    const earning = earnings
        .filter((booking) => {

            const bookingDate = new Date(booking.endDate);

            return (
                bookingDate.getFullYear() === selectedYear &&
                bookingDate.getMonth() === index
            );
        })
        .reduce(
            (total, booking) =>
                total + Number(booking.ownerEarning || 0),
            0
        );

    return {
        month: monthNames[index],
        earning
    };
});

    useEffect(()=>{
        getOwnerEarning()
    },[])

    const formatDate=(date)=>{{
        if(!date){
            return "-"
        }

        return new Date(date).toLocaleDateString("en-IN",{
            day:"2-digit",
            month:"short",
            year:"numeric"
        })

    }}

    const currentYear = new Date().getFullYear();
    const availableYears = [];

    for(let year = currentYear; year >= 2025; year--) {
        availableYears.push(year);
    }

    if(loading){
        return (
            <div className="earnings-page">
                <div className="earnings-loading">
                    Loading Earnings...
                </div>
            </div>
        )
    }

    return(
        <div className="earnings-page">
            <div className="earning-header">
                <div>
                    <h1>Earning</h1>
                    <p>
                        Track your rental earnings and payment history.
                    </p>
                </div>
            </div>


            {/* summary card */}

            <div className="earning-stats">
                <div className="earning-stat-card">
                    <div className="earning-stat-icon">
                        ₹
                    </div>

                    <div>
                        <span>Total Earnings</span>

                        <h2>₹{Number(
                            summary.totalEarning||0
                        ).toFixed(2)}
                        </h2>
                         <p>Your earnings from completed rentals</p>
                    </div>
                </div>


                <div className="earning-stat-card">
                    <div className="earning-stat-icon commission-icon">
                        %
                    </div>

                    <div>
                        <span>PlateForm Commission</span>
                        
                        <h2>₹{Number(
                            summary.totalCommission||0
                        ).toFixed(2)}
                        </h2>

                        <p>Commission paid to platform</p>
                    </div>
                </div>


                <div className="earning-stat-card">
                    <div className="earning-stat-icon rental-icon">
                        📦
                    </div>

                    <div>
                        <span>Total Rentals</span>

                        <h2>{summary.totalRentals||0}</h2>

                        <p>Completed rentals</p>
                    </div>
                </div>

                <div className="earning-stat-card">
                    <div className="earning-stat-icon average-icon">
                        📊
                    </div>
                    
                    <div>
                        <span>Aevrage Earning</span>

                        <h2>₹{Number(summary.averageEarning||0).toFixed(2)}</h2>
                        <p>Average earning per rental</p>
                    </div>
                </div>
            </div>


            {/* <div className="earnings-chart-section">

    <div className="chart-header">
        <div>
            <h2>Monthly Earnings</h2>
            <p>
                Track your earnings over the last 6 months
            </p>
        </div>

        <div className="chart-total">
            <span>Total Earnings</span>
            <strong>
                ₹{Number(summary.totalEarning || 0).toFixed(2)}
            </strong>
        </div>
    </div>

    <div className="chart-container">
        <div className="earnings-chart">

        <div className="overview-header">

    <div>
        <h2>Earning Overview</h2>

        <p>
            Monthly earnings for {selectedYear}
        </p>
    </div>

<select
    value={selectedYear}
    onChange={(e) => setSelectedYear(Number(e.target.value))}
>
    {availableYears.map((year) => (
        <option key={year} value={year}>
            {year}
        </option>
    ))}
</select>

</div>

    <ResponsiveContainer width="100%" height={350}>
        <BarChart
            data={monthlyData}
            margin={{
                top: 20,
                right: 30,
                left: 10,
                bottom: 10
            }}
            barCategoryGap="35%"
        >
            <CartesianGrid
                strokeDasharray="4 5"
                vertical={false}
            />

            <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
            />

            <YAxis
                tickLine={false}
                axisLine={false}
            />

            <Tooltip
                formatter={(value) => [
                    `₹${Number(value).toFixed(2)}`,
                    "Earning"
                ]}
                cursor={{ fill: "rgba(33,53,85,0.05)" }}
            />

            <Bar
                dataKey="earning"
                fill="#213555"
                radius={[8, 8, 0, 0]}
                maxBarSize={55}
            />
        </BarChart>
    </ResponsiveContainer>
</div>
    </div>

</div> */}

            <div className="earnings-overview">

    <div className="overview-header">

        <div>
            <h2>Earning Overview</h2>

            <p>
                Summary of your completed rental payments
            </p>
        </div>

        <div className="year-selector">

            <label>Year</label>

            <select
                value={selectedYear}
                onChange={(e) =>
                    setSelectedYear(Number(e.target.value))
                }
            >
                {availableYears.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

        </div>

    </div>


    <div className="earning-chart-section">

        <div className="earning-chart-title">

            <h3>
                Monthly Earnings
            </h3>

            <p>
                Your rental earnings for {selectedYear}
            </p>

        </div>


        <div className="earning-chart">

            <ResponsiveContainer width="100%" height={330}>

                <BarChart data={monthlyData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip
                        formatter={(value) =>
                            [`₹${value}`, "Earning"]
                        }
                    />

                    <Bar
                        dataKey="earning"
                        name="Owner Earning"
                        fill="#213555"
                        radius={[6, 6, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    </div>

</div>



            {/* Earning Overview */}
            <div className="earnings-overview">
                <div className="overview-header">
                    <div>
                        <h2>Earning Overview</h2>
                    </div>

                    <p>summary of your completed rental payments</p>
                </div>

                            <div className="overview-content">
                <div className="overview-box">
                    <span>Total Customer Payment</span>

                    <strong>
                        ₹{earnings.reduce((total,booking)=>
                            total+Number(booking.totalAmount||0),0).toFixed(2)}
                    </strong>
                </div>

                <div className="overview-box">
                    <span>Total GST Collected</span>

                    <strong>
                        ₹{earnings.reduce((total,booking)=>
                            total+Number(booking.gstAmount||0),0
                        ).toFixed(2)}
                    </strong>
                </div>

                <div className="overview-box">
                    <span>Total Deposit</span>

                    <strong>
                        ₹{earnings.reduce((total,booking)=>
                        total+Number(booking.depositAmount||0),0).toFixed(2)}
                    </strong>
                </div>


            </div>
            </div>



            {/* Earning History */}

            <div className="earnings-history">
                <div className="earnings-history-header">
                    <div>
                        <h2>Earning History</h2>
                        <p>Details of your completed rentals</p>
                    </div>

                    <div className="history-count">
                        {earnings.length} Rentals
                    </div>
                </div> 

                {earnings.length===0?(
                    <div className="no-earnings">
                        <div className="no-earnings-icon">
                            💰
                        </div>

                        <h3>No Earnings Yet</h3>

                        <p>
                            Your completed rental earnings will
                            appear here.
                        </p>

                    </div>
                ):(
                    <div className="earnings-table-wrapper">
                        <table className="earnings-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Booking ID</th>
                                    <th>Customer</th>
                                    <th>Rental Period</th>
                                    <th>Rent</th>
                                    <th>GST</th>
                                    <th>Deposit</th>
                                    <th>Total Paid</th>
                                    <th>Commission</th>
                                    <th>Your Earning</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {earnings.map((booking)=>(
                                    <tr key={booking._id}> 
                                        <td>
                                            <div className="earning-product">
                                                <div className="earning-product-image">
                                                    {booking.productId?.images?.length>0?(
                                                        <img src={`http://localhost:5200${booking.productId.images[0]}`} 
                                                        alt={booking.productId.title||"Product"} />
                                                    ):(
                                                        <div>
                                                            📦

                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <strong>
                                                        {booking.productId?.title||"Product"}

                                                    </strong>

                                                    <small>
                                                        ₹{booking.productId?.rentPrice||0} /day
                                                    </small>
                                                </div>

                                            </div>
                                        </td>

                                        <td>
                                            <span className="booking-id">
                                                #{booking._id.slice(-6)}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="customer-info">
                                                <strong>
                                                    {booking.userId?.name||"Unknown"}
                                                </strong>

                                                <small>
                                                    {booking.userId?.email||"-"}
                                                </small>
                                            </div>
                                        </td>

                                        {/* Rental period */}

                                        <td>
                                            <div className="rental-period">
                                                <span>
                                                    {formatDate(booking.startDate)}
                                                </span>

                                                <span>→</span>

                                                <span>
                                                    {formatDate(booking.endDate)}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            ₹{Number(booking.rentAmount||0).toFixed(2)}
                                        </td>

                                        <td>
                                            <div className="gst-value">
                                                <strong>
                                                    ₹{Number(booking.gstAmount||0).toFixed(2)}
                                                </strong>

                                                <small>
                                                    {booking.gstRate|| 0}%
                                                </small>
                                            </div>
                                        </td>

                                        <td>
                                            ₹{Number(booking.depositAmount|| 0).toFixed(2)}                                           
                                        </td>

                                        <td>
                                            <strong>
                                                ₹{Number(booking.totalAmount||0).toFixed(2)}
                                            </strong>
                                        </td>

                                        <td>
                                            <span className="commissionAmount">
                                                ₹{Number(booking.commissionAmount|| 0).toFixed(2)}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="owner-earning-value">
                                                ₹{Number(booking.ownerEarning|| 0).toFixed(2)}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="completed-badge">
                                                Completed
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}        
            </div>
        </div>
    )
}

export default OwnerEarning