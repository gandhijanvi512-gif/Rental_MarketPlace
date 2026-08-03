import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar";

function ProfileLayout() {
    return (
        <div className="profile-layout">

            {/* Sidebar */}
            <ProfileSidebar />

            {/* Main Content */}
            <div className="profile-content">
                <Outlet />
            </div>

        </div>
    );
}

export default ProfileLayout;