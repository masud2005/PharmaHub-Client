import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";


const Dashboard = () => {
    return (
        <div className='container mx-auto relative min-h-screen md:flex bg-white'>
            {/* <Sidebar /> */}
            <ul className='menu p-0 text-base '>
                <Sidebar />
            </ul>

            {/* Dynamic Contents */}
            <div className='flex-1  md:ml-64'>
                <div className="p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;