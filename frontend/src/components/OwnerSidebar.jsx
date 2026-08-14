import { Layout,Clipboard, Activity, History, icons, Package, PlusCircle, Star, User, Wallet } from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function OwnerSidebar(){
    const location=useLocation()
    const navigate=useNavigate()

    const menuItems=[
        {
            name:"Dashboard",
            icon: <Layout size={20}/>,
            path:"/ownerdashboard"
        },
        {
            name:"Add Product",
            icon: <PlusCircle size={20}/>,
            path:"/addProduct"
        },
        {
            name:"My Product",
            icon: <Package size={20}/>,
            path:"/myproducts"
        },
        // {
        //     name:"Rental Request",
        //     icon: <Clipboard size={20}/>,
        //     path:"/owner/rentalrequest"
        // },
        {
            name:"Active Rentals",
            icon:<Activity size={20}/>,
            path:"/owner/activerentals"
        },
        {
            name:"Rental History",
            icon: <History size={20}/>,
            path:"/owner/rentalhistory"
        },
        {
            name:"Earnings",
            icon:<Wallet size={20}/>,
            path:"/owner/earnings"
        },
        {
            name:"Review",
            icon:<Star size={20}/>,
            path:"/owner/review"
        }
    ]


    return(
        <aside className="owner-sidebar">
            <div className="owner-sidebar-header">
                <h2>🏪 Owner Panel</h2>
            </div>

            <ul className="owner-sidebar-menu"> 
                {menuItems.map((item)=>(
                    <li key={item.name}> 
                        <Link
                            to={item.path}
                            className={`owner-sidebar-link ${location.pathname===item.path?"active":""}`}
                        >
                            {item.icon}

                            <span>
                                {item.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>


            <div className="owner-sidebar-button">
                <button className="back-profile-btn"
                    onClick={()=>navigate("/profile")}
                >
                    <User size={20} />
                    <span>
                        Back to My Profile
                    </span>
                </button>
            </div>
        </aside>
    )
}

export default OwnerSidebar