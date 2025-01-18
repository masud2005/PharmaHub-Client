import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import Dashboard from "../layouts/Dashboard";


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
                element: <h1>Shop</h1>
            },
            {
                path: '/cart',
                element: <h1>Cart</h1>
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
                element: <h1>Manage users</h1>
            },
            {
                path: '/dashboard/manage-category',
                element: <h1>Manage Category</h1>
            },
            {
                path: '/dashboard/payment-management',
                element: <h1>Payment Management</h1>
            },
            {
                path: '/dashboard/sales-report',
                element: <h1>Sales Report</h1>
            },
        ]
    }
])

export default router;