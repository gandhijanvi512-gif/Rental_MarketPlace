import { useNavigate } from "react-router-dom";
import api from "../service/api";
import { useState } from "react";
import { useEffect } from "react";


function OwnerSetup(){
    
    const navigate=useNavigate()

    const[formData,setFormData]=useState({
        phone:"",
        address:"",
        city:"",
        state:"",
        pincode:""
    });

    const[loading,setLoading]=useState(true)
    const[saving,setSaving]=useState(false)

    const getProfile=async()=>{
        try{
            const res=await api.get("/getProfile")
            const user=res.data.user;

            setFormData({
                phone:user.phone||"",
                address:user.address||"",
                city:user.city||"",
                state:user.state||"",
                pincode:user.pincode||""
            })
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getProfile()
    },[])

    const handleChange=(e)=>{
        const {name,value}=e.target

        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        try{
            setSaving(true)

            const data=new FormData()

            data.append("phone",formData.phone)
            data.append("address",formData.address)
            data.append("city",formData.city)
            data.append("state",formData.state)
            data.append("pincode",formData.pincode)

            const res=await api.put("/updateprofile",data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })

            if(res.data.success){
                alert("Owner Setup Completed")
                navigate("/ownerdashboard")
            }
        }catch(err){
            console.log(err);

            alert(
                err.response?.data?.message||"Something went wrong"
            )
            
        }finally{
            setSaving(false)
        }
    }
    if(loading){
        return(
            <h2 className="profile-loading">Loading....</h2>
        )
    }



     return (
        <div className="owner-setup-page">

            <div className="owner-setup-card">

                <h1>Become an Owner</h1>

                <p>
                    Complete your information to start
                    renting your products.
                </p>

                <form onSubmit={handleSubmit}>

<div className="form-group">
    <label>Phone</label>

    <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter phone number"
    />
</div>

<div className="form-group">
    <label>Address</label>

    <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Enter your address"
    />
</div>

<div className="form-row">

    <div className="form-group">
        <label>City</label>

        <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
        />
    </div>

    <div className="form-group">
        <label>State</label>

        <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
        />
    </div>

</div>

<div className="form-group">
    <label>Pincode</label>

    <input
        type="text"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        placeholder="Enter pincode"
    />
</div>

                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : "Complete Owner Setup"
                        }
                    </button>

                </form>

            </div>

        </div>
    );

}

export default OwnerSetup