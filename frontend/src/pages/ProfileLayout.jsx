import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar";

function ProfileLayout({user,setUser}) {
    return (
        <div className="profile-layout">

            {/* Sidebar */}
            <ProfileSidebar user={user} setUser={setUser} />

            {/* Main Content */}
            <div className="profile-content">
                <Outlet />
            </div>

        </div>
    );
}

export default ProfileLayout;