

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../service/api"
import userImage from "../assets/user.jpg"
import toast from "react-hot-toast"

function EditProfile({setUser}){
    const navigate=useNavigate()

    const [loading,setLoading]=useState(false)
    const [preview,setPreview]=useState("");
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        phone:"",
        address:"",
        city:"",
        state:"",
        pincode:"",
        profileImage:null
    })

    useEffect(()=>{
        getProfile()
    },[])

    const getProfile=async()=>{
        try{
            const res=await api.get("/getProfile")

            const user=res.data.user

            setFormData({
                name:user.name||"",
                email:user.email||"",
                phone:user.phone||"",
                address:user.address||"",
                city:user.city||"",
                state:user.state||"",
                pincode:user.pincode||"",
                profileImage:null
            })

            if(user.profileImage?.url){
                setPreview(user.profileImage.url)
            }
        }catch(err){
            console.log(err)  
        }
    }

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleImage=(e)=>{
        const file=e.target.files[0];

        if(!file) return;

        setFormData({
            ...formData,
            profileImage:file
        })
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        try{
            setLoading(true)

            const data=new FormData()

            data.append("name",formData.name)
            data.append("phone",formData.phone)
            data.append("address",formData.address)
            data.append("city",formData.city)
            data.append("state",formData.state)
            data.append("pincode",formData.pincode)

            if(formData.profileImage){
                data.append("profileImage",formData.profileImage)
            }

            const res=await api.put("/updateProfile",data)

            if (res.data?.user) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                if (setUser) {
                    setUser(res.data.user);
                }
            }
        

            toast.success("Profile Updated Successfully!");

            navigate("/profile")
        }catch(err){
            console.log(err);

            toast.error(err.response?.data?.message || "Something Went Wrong")
            
        }finally{
            setLoading(false)
        }
    }


    return (
    <div className="edit-profile-page">
        <div className="edit-profile-container">
            <div className="edit-profile-header">
                <div className="edit-profile-title">
                    <div>
                        <h1>Edit Profile</h1>
                        <p>Update your personal information</p>
                    </div>
                </div>
            </div>

            <div className="edit-profile-body">

                {/* LEFT SIDE */}

                <div className="profile-image-section">
                    <div className="profile-image-wrapper">
                        <img src={preview||userImage}
                            alt="Profile"
                        />
                    </div>

                    <label className="upload-btn">
                        Choose Photo
                        <input
                            type="file" accept="image/*"
                            onChange={handleImage}
                            hidden
                        />
                    </label>

                    <p className="upload-note">
                        JPG, PNG up to 2MB
                    </p>

                </div>

                {/* RIGHT SIDE */}

                <form
                    className="edit-profile-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Phone</label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Address</label>

                        <textarea
                            rows="4"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
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
                            />

                        </div>

                        <div className="form-group">

                            <label>State</label>

                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
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
                        />

                    </div>

                    <div className="edit-profile-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/profile")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                            disabled={loading}
                        >
                            {loading?"saving...":"Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
    
}

export default EditProfile