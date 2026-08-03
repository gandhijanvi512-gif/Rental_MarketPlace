import { Calendar, CheckCircle2, Mail, MapPin, Pencil, Phone, Shield, User } from "lucide-react";

function ProfileCard({user}){
    
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

    return(
        
        <div className="profile-card">
            <div className="profile-left">
                <div className="profile-avatar-container">
                    <div className="profile-avatar">
                        {
                            user.profileImage?(
                                <img src={user.profileImage} alt={user.name} className="profile-image"/>
                            ):(
                                <User size={45} color="#fffffff"/>
                            )
                        }
                    </div>
                    
                    <button className="edit-profile-btn">
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