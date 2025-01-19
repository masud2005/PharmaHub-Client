import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";


const Dashboard = () => {
    return (
        <div className='relative md:flex md:h-screen bg-white'>
            {/* <Sidebar /> */}
            <ul className='menu p-0 text-base md:h-full overflow-hidden'>
                <Sidebar />
            </ul>

            {/* Dynamic Contents */}
            <div className='flex-1 bg-teal-50 md:pl-64  overflow-auto mt-10 md:mt-0'>
                <div className="p-5 md:container mx-auto ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;