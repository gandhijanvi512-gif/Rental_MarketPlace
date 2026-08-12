import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {LogOut, Package, User, Settings, History, Import, Store} from "lucide-react"

import { Headphones } from "lucide-react";

import api from "../service/api";
import { useNavigate } from "react-router-dom";

function ProfileSidebar({user}){
    const location=useLocation()
    const navigate = useNavigate();

    const menuItem=[
        {
            name:"My Profile",
            icon: <User size={20}/>,
            path: "/profile"
        },
        {
            name:"My Rentals",
            icon: <Package size={20}/>,
            path: "/myrentals"
        },
        {
            name:"Rental History",
            icon: <History size={20}/>,
            path: "/rentalhistory"
        },
        {
            name:"Settings",
            icon:<Settings size={20}/>,
            path:"/setting"
        },
    ];

    const handleBecomeOwner = async () => {

                //Already Owner
        if(user?.role?.includes("owner")){
            navigate("/ownerdashboard")
            return;
        }
    try {

        const response = await api.put(
            "/becomeowner",
            {},
            {
                withCredentials: true
            }
        );

        if (response.data.success) {
            alert("You are now an owner!");

            navigate("/ownerSetup");
        }

    } catch (error) {
        console.log(error);

        alert(
            error.response?.data?.message ||
            "Something went wrong"
        );
    }
};

    return(
        <aside className="profile-sidebar">
            <ul className="sidebar-menu">
                {menuItem.map((item)=>(
                    <li key={item.name}>
                        <Link to={item.path} 
                        className={`sidebar-link ${location.pathname===item.path?"active" : ""}`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <button
                className="become-owner-btn"
                onClick={handleBecomeOwner}
            >
                <Store size={20}/>
                <span>
                   {user?.role?.includes("owner")?"Owner Dashboard":"Become an Owner"} 
                   
                </span> 
            </button>

            <button className="logout-btn">
                <LogOut size={20}/>
                <span>Logout</span>
            </button>

            <div className="support-card">
                <div className="support-icon">
                    <Headphones size={34}/>
                </div>

                <h3>Need Help?</h3>
                    
                <p>
                    If you have any questions or need support, feel free to contact us.
                </p>
                <button className="support-btn">
                    Contact Support
                </button>
                    
                
            </div>

        </aside>
    )
}

export default ProfileSidebar