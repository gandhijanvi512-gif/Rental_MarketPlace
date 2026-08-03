import { useState } from "react"
import api from "../service/api"
import { useEffect } from "react"
import ProfileCard from "../components/ProfileCard"
import StatsCards from "../components/StatsCards"
import ActiveRentals from "../components/ActiveRentals"
import RentalHistory from "../components/RentalHistory"

function Profile(){

    const[profileData,setProfileData]=useState(null)
    const[loading,setLoading]=useState(true)

    const getProfile=async()=>{
        try{
            const res=await api.get("/getProfile")
             console.log("PROFILE DATA:", res.data);
            setProfileData(res.data)
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getProfile()
    },[])

    if(loading){
        return(
            <h2 className="profile-loading">Loading Profile...</h2>
        )
    }

    return(
        <>
            <div className="profile-page">
                <div className="profile-header">
                    <h1>My Profile</h1>

                    <p>
                        Manage your account and view your rental activity.
                    </p>
                </div>
                {profileData && (
                    <>
                        <ProfileCard user={profileData.user}/>

                        <StatsCards stats={profileData.stats}/>

                        <div className="rental-section-grid">
                            
                            <ActiveRentals rentals={profileData.activeRentals}/>

                            <RentalHistory history={profileData.rentalHistory}/>
                        </div>

                    </>
                )}


            </div>
        </>
    )
}

export default Profile;