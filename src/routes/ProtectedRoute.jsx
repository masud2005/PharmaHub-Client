import { Navigate, Outlet, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();
    const location = useLocation();

    if (loading || isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!user) {
        return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
    }

    if (role === "Admin") {
        return <Navigate to="/dashboard/admin-home" replace />;
    } else if (role === "Seller") {
        return <Navigate to="/dashboard/seller-home" replace />;
    } else if (role === "User") {
        return <Navigate to="/dashboard/pay-history" replace />;
    }

    // Render children for protected routes
    return <Outlet />;
};

export default ProtectedRoute;
