import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import Dashboard from "../layouts/Dashboard";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageCategory from "../pages/Dashboard/ManageCategory/ManageCategory";
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Payment/Checkout";
import Payment from "../pages/Payment/Payment";
import Invoice from "../pages/Payment/Invoice";
import PaymentManagement from "../pages/Dashboard/PaymentManagement/PaymentManagement";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <h1>Home</h1>
            },
            {
                path: '/shop',
                element: <Shop />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/checkout',
                element: <Payment />
            },
            {
                path: '/invoice',
                element: <Invoice />
            },
            {
                path: '/sign-up',
                element: <SignUp />
            },
            {
                path: '/sign-in',
                element: <SignIn />
            },
            {
                path: '/update-profile',
                element: <h1>Update Profile</h1>
            }
        ]
    },

    // Dashboard
    {
        path: '/dashboard',
        element: <Dashboard />,
        children:[
            {
                path: '/dashboard/admin-home',
                element: <h1>Admin Home</h1>
            },
            {
                path: '/dashboard/manage-users',
                element: <ManageUsers />
            },
            {
                path: '/dashboard/manage-category',
                element: <ManageCategory />
            },
            {
                path: '/dashboard/payment-management',
                element: <PaymentManagement />
            },
            {
                path: '/dashboard/sales-report',
                element: <h1>Sales Report</h1>
            },
        ]
    }
])

export default router;