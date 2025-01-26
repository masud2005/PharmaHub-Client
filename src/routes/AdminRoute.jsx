import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();

    if (loading || isLoading) {
        return <h1 className='text-5xl font-bold'>Loading...</h1>
    }

    if (user && role === 'Admin') {
        return children;
    }

    return <Navigate to={'/'} state={location.pathname}></Navigate>

};

export default AdminRoute;