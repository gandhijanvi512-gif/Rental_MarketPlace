import { ClipboardList, LayoutDashboard, Package, UserRoundCheck, Users, LogOut, Contact } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import api from "../service/api"

const AdminSidebar=()=>{

    const navigate=useNavigate()

    // const handleLogout=async()=>{
    //     try{
    //         const res=await api.post("/admin/logout")

    //         navigate("/admin/signin")
    //     }catch(err){
    //         console.log(err);
            
    //     }
    // }

    const handleLogout=async()=>{
        try{
            await api.post("/admin/logout")
        }catch(err){
            console.log(err);
            
        }finally{
            localStorage.removeItem("admintoken");
            navigate("/admin/signin")
        }
    }

    return(
        <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
                <h2>Admin Panel</h2>
                <p>Rental MarketPlace</p>
            </div>

            <nav className="admin-sidebar-nav">
                <NavLink 
                    to="/admin/dashboard"
                    className={({isActive})=>
                        `admin-nav-item ${isActive ? "active" : ""}`}
                >
                    <LayoutDashboard className="admin-nav-icon" />
                    <span>Dashboard</span>
                </NavLink>


                <NavLink
                    to="/admin/users"
                    className={({isActive})=>
                        `admin-nav-item ${isActive ? "active" : ""}`}
                >
                    <Users className="admin-nav-icon" />
                    <span>Users</span>

                </NavLink>

                <NavLink
                    to="/admin/owners"
                    className={({isActive})=>
                        `admin-nav-item ${isActive ? "active" : ""}`
                    }
                >
                    <UserRoundCheck className="admin-nav-icon" />
                    <span>Owners</span>
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className={({isActive})=>
                        `admin-nav-item ${isActive ? "active" : ""}`
                    }   
                >
                    <Package className="admin-nav-icon" />
                    <span>Products</span>
                </NavLink>

                <NavLink
                    to="/admin/bookings"
                    className={({isActive})=>
                        `admin-nav-item ${isActive ? "active" : ""}`
                    }  
                >
                    <ClipboardList className="admin-nav-icon" />
                    <span>Bookings</span>
                </NavLink>

                <NavLink
                    to="/admin/contacts"
                    className={({isActive})=>
                        `admin-nav-item ${isActive ? "active" : ""}`
                    } 
                >
                    <Contact className="admin-nav-icon" />
                    <span>Contacts</span>
                </NavLink>
            </nav>

            {/* bottom sections */}

            <div className="admin-sidebar-bottom">
                <button className="admin-logout-btn" onClick={handleLogout}>
                    <LogOut className="admin-nav-icon" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    )
}

export default AdminSidebar