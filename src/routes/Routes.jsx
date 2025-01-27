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
import PaymentHistory from "../pages/Dashboard/UserPaymentHistory/UserPaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import ManageMedicines from "../pages/Dashboard/SellerDashboard/ManageMedicines";
import SellerPayHistory from "../pages/Dashboard/SellerDashboard/SellerPayHistory";
import Advertisement from "../pages/Dashboard/SellerDashboard/Advertisement";
import SellerHome from "../pages/Dashboard/SellerDashboard/SellerHome";
import UpdateCategory from "../pages/Dashboard/UpdateCategory/UpdateCategory";
import SalesReport from "../pages/Dashboard/SalesReport/SalesReport";
import BannerAdvertise from "../pages/Dashboard/BannerAdvertise/BannerAdvertise";
import Home from "../pages/Home/Home";
import CategoryMedicinesDetails from "../pages/Home/CategoryMedicinesDetails";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/categories/:category',
                element: <CategoryMedicinesDetails />
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
                element: <PrivateRoute><Checkout /></PrivateRoute>
            },
            {
                path: '/invoice',
                element: <PrivateRoute><Invoice /></PrivateRoute>
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
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [

            // Admin Dashboard
            {
                path: '/dashboard/admin-home',
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: '/dashboard/manage-users',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: '/dashboard/manage-category',
                element: <AdminRoute><ManageCategory /></AdminRoute>
            },
            // {
            //     path: '/dashboard/manage-category/:id',
            //     element: <UpdateCategory />
            // },
            {
                path: '/dashboard/payment-management',
                element: <AdminRoute><PaymentManagement /></AdminRoute>
            },
            {
                path: '/dashboard/sales-report',
                element: <AdminRoute><SalesReport /></AdminRoute>
            },
            {
                path: '/dashboard/banner-advertise',
                element: <AdminRoute><BannerAdvertise /></AdminRoute>
            },

            // Seller Dashboard
            {
                path: '/dashboard/seller-home',
                element: <SellerHome />
            },
            {
                path: '/dashboard/manage-medicines',
                element: <ManageMedicines />
            },
            {
                path: '/dashboard/payment-history',
                element: <SellerPayHistory />
            },
            {
                path: '/dashboard/advertisement',
                element: <Advertisement />
            },

            // User Dashboard
            {
                path: '/dashboard/pay-history',
                element: <PaymentHistory />
            }
        ]
    }
])

export default router;