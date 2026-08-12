import { Outlet } from "react-router-dom"
import OwnerSidebar from "../components/OwnerSidebar"


function OwnerLayout(){
    return(
        <div className="owner-layout">
            <OwnerSidebar />

            <div className="owner-content">
                <Outlet />
            </div>
        </div>
    )
}
export default OwnerLayout