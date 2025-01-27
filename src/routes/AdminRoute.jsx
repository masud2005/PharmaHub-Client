import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();

    if (loading || isLoading) {
        return <Loading />
    }

    if (user && role === 'Admin') {
        return children;
    }

    return <Navigate to={'/'} state={location.pathname}></Navigate>

};

export default AdminRoute;