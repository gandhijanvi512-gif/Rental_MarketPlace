import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout=()=>{
    return(
        <div className="admin-dashboard">
            <AdminSidebar />

            <main className="admin-main">
                <Outlet/>
            </main>
        </div>
    )
}

export default AdminLayout