import { Box, Bike, Users, Wallet, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

import api from "../service/api";

function OwnerDashboard() {

    const[dashboard,setDashboard]=useState(null);
    const[loading,setLoading]=useState(true)

    


    const getDashboard=async()=>{
        try{
            const res=await api.get("/ownerdashboard",{
                withCredentials:true
            })
            console.log("owner dashboard",res.data);
            setDashboard(res.data)
            
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getDashboard()
    },[])

    if(loading){
        return <h2>Loading Dashboard...</h2>
    }
  



    return (
        <div className="owner-dashboard">
            <div className="owner-dashboard-header">
                <div>
                    <h1>Owner Dashboard</h1>
                    <p>Manage your products, rentals, and earnings</p>
                </div>

                <button className="owner-add-product-btn" onClick={() => navigate("/addProduct")}>
                    <PlusCircle size={20} />
                    Add Product
                </button>
            </div>

            <div className="owner-stats">
                <div className="owner-stat-card">
                    <div className="owner-stat-icon icon-blue">
                        <Box size={20} />
                    </div>
                    <div className="owner-stat-text">
                        <h3>Total Products</h3>
                        <h2>{dashboard?.stats?.totalProducts || 0}</h2>
                        <span className="owner-stat-delta">
                            +{dashboard?.stats?.productsDelta || 0} this month
                        </span>
                    </div>
                </div>

                <div className="owner-stat-card">
                    <div className="owner-stat-icon icon-green">
                        <Bike size={20} />
                    </div>
                    <div className="owner-stat-text">
                        <h3>Active Rentals</h3>
                        <h2>{dashboard?.stats?.activeRentals || 0}</h2>
                        <span className="owner-stat-delta">
                            +{dashboard?.stats?.rentalsDelta || 0} this month
                        </span>
                    </div>
                </div>

                <div className="owner-stat-card">
                    <div className="owner-stat-icon icon-purple">
                        <Users size={20} />
                    </div>
                    <div className="owner-stat-text">
                        <h3>Total Bookings</h3>
                        <h2>{dashboard?.stats?.totalBookings || 0}</h2>
                        <span className="owner-stat-delta">
                            +{dashboard?.stats?.bookingsDelta || 0} this month
                        </span>
                    </div>
                </div>

                <div className="owner-stat-card">
    <div className="owner-stat-icon icon-orange">
        <Wallet size={20} />
    </div>

    <div className="owner-stat-text">
        <h3>Total Earnings</h3>

        <h2>
            ₹{Number(
                dashboard?.stats?.totalEarnings || 0
            ).toLocaleString("en-IN")}
        </h2>

        <span className="owner-stat-delta">
            +{dashboard?.stats?.earningsDelta || 0}% this month
        </span>
    </div>
</div>
            </div>

            {/* stats card */}

        </div>
    );
}

export default OwnerDashboard;