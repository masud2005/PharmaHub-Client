import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // const { data: role = [], isLoading } = useQuery({
    //     queryKey: ['role', user?.email],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/users/role/${user?.email}`);
    //         // console.log(res.data);
    //         return res.data.role;
    //     }
    // })
    const { data: role = [], isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !!user?.email, // Only run query if user?.email exists
        queryFn: async () => {
            if (!user?.email) return []; // Avoid undefined query results
            const res = await axiosSecure.get(`/users/role/${user?.email}`);
            return res.data.role;
        }
    });
    return [role, isLoading]
};

export default useRole;