import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {LogOut, Package, User, Settings, History} from "lucide-react"

import { Headphones } from "lucide-react";

function ProfileSidebar(){
    const location=useLocation()

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