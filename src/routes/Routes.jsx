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


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
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
        children: [

            // Admin Dashboard
            {
                path: '/dashboard/admin-home',
                element: <AdminHome />
            },
            {
                path: '/dashboard/manage-users',
                element: <ManageUsers />
            },
            {
                path: '/dashboard/manage-category',
                element: <ManageCategory />
            },
            // {
            //     path: '/dashboard/manage-category/:id',
            //     element: <UpdateCategory />
            // },
            {
                path: '/dashboard/payment-management',
                element: <PaymentManagement />
            },
            {
                path: '/dashboard/sales-report',
                element: <SalesReport />
            },
            {
                path: '/dashboard/banner-advertise',
                element: <BannerAdvertise />
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