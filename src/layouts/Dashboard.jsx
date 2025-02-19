import { FaHome } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { useEffect } from "react";
import useRole from "../hooks/useRole";


const Dashboard = () => {
    const navigate = useNavigate();
    const [role, isLoading] = useRole();
    // console.log(role);

    

    useEffect(() => {
        if (!isLoading) {
            if (role === "Admin") {
                navigate("/dashboard/admin-overview", { replace: true });
            } else if (role === "Seller") {
                navigate("/dashboard/seller-overview", { replace: true });
            } else if (role === "User") {
                navigate("/dashboard/pay-history", { replace: true });
            }
        }
    }, [role, isLoading, navigate]);

    return (
        <div className='relative md:flex md:h-screen bg-white'>
            {/* <Sidebar /> */}
            <ul className='menu p-0 text-base md:h-full overflow-hidden'>
                <Sidebar />
            </ul>

            {/* Dynamic Contents */}
            <div className='flex-1 bg-teal-50 md:pl-64  overflow-auto mt-10 md:mt-0'>
                <div className="p-2 md:p-5 md:container mx-auto ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;