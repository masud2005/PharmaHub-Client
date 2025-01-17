import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";


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
            },
            {
                path: '/dashboard',
                element: <h1>Dashboard</h1>
            }
        ]
    }
])

export default router;