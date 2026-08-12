import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar";

function ProfileLayout({user}) {
    return (
        <div className="profile-layout">

            {/* Sidebar */}
            <ProfileSidebar user={user} />

            {/* Main Content */}
            <div className="profile-content">
                <Outlet />
            </div>

        </div>
    );
}

export default ProfileLayout;