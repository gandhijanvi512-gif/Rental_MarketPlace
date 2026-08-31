import { Calendar, CheckCircle2, Import, Mail, MapPin, Pencil, Phone, Shield, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import userImage from "../assets/user.jpg"

function ProfileCard({user}){
    const navigate=useNavigate()

    if(!user){
        return null;
    }

    const memberSince=new Date(user.createdAt || Date.now()).toLocaleDateString("en-IN",{
        day:"numeric",
        month:"long",
        year:"numeric"
    })

    const addressString=[user.address,user.city,user.state,user.pincode]
    .filter(Boolean)
    .join(", ")

    // console.log(user);
    // console.log(user.profileImage);
    return(
        
        <div className="profile-card">
            <div className="profile-left">
                <div className="profile-avatar-container">
                    <div className="profile-avatar">


                        <img src={user.profileImage?.url || userImage
                            // user.profileImage?`http://localhost:5200${user.profileImage}`:userImage
                        } alt={user.name} className="profile-image" />

                        


                    </div>
                    
                    <button className="edit-profile-btn"
                        onClick={()=>navigate("/editprofile")}
                    >
                        {/* <Pencil size={18}/> */}
                        Edit Profile
                    </button>
                </div>
                
                        <div className="profile-details">
            <h2>{user.name}</h2>

            <p>
                <span className="icon-wrapper">
                    <Mail size={18}/>  
                </span>
                {user.email}
            </p>

            <p>
                <span className="icon-wrapper">
                    <Phone size={18}/>    
                </span>
                {user.phone || "Not Added"}
            </p>

            <p>
                <span className="icon-wrapper">
                    <MapPin size={18}/>
                    
                </span>
                {addressString || "Address Not Added"}
            </p>
        </div>
    </div>
            {/* left section */}

        <div className="profile-right">
            <div className="profile-info">
                <div className="info-label">
                    <Calendar size={18}/>

                    Member Since:
                
                </div>
                <div className="info-value">{memberSince}</div>

            </div>

            <div className="profile-info">
                <div className="info-label">
                    <Shield size={18}/>
                        Account Type
                </div>
                <div className="info-value badge-user">{user.role || "User"}</div>
            </div>

            <div className="profile-info">
                <div className="info-label">
                    <CheckCircle2 size={18}/>
                        Email Verified
                </div>

                <div className="info-value icon-verified">
                    <CheckCircle2 size={20}/>
                </div>
            </div>

        </div>

        </div>

    )
}

export default ProfileCard