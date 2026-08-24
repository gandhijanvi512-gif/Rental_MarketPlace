import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../service/api";

const AdminProtectedRoute = () => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await api.get("/admin/check", {
                    withCredentials: true
                });

                if (res.data.success && res.data.admin) {
                    setAdmin(res.data.admin);
                }
            } catch (err) {
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };

        checkAdmin();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!admin) {
        return <Navigate to="/admin/signin" replace />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;