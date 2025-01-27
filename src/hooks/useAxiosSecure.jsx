import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { toast } from "react-toastify";
import { el } from "date-fns/locale";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { signOutUser } = useAuth()

    // let isLoggingOut = false;

    // request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        // console.log('request stopped by interceptors', token);
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptors', status);

        // for 401 or 403 logout the user and move the user to the login
        if (status === 401) {
            // toast.error("Unauthorized access. Please login again to continue.");
            // Swal.fire({
            //     title: 'Unauthorized access',
            //     text: 'Please login again to continue.',
            //     icon: 'error',
            //     confirmButtonText: 'OK',
            //     customClass: {
            //         confirmButton: 'bg-red-500'
            //     }
            // })
            await signOutUser();
            navigate('/sign-in')
        }
        else if (status === 403) {
            // toast.error("Forbidden access. You don't have permission to perform this action.");
            // Swal.fire({
            //     title: 'Forbidden access',
            //     text: "You don't have permission to perform this action.",
            //     icon: 'error',
            //     confirmButtonText: 'OK',
            //     customClass: {
            //         confirmButton: 'bg-red-500'
            //     }
            // })
            await signOutUser();
            navigate('/sign-in')
        }
        return Promise.reject(error);
    });


    return axiosSecure;
};

export default useAxiosSecure;