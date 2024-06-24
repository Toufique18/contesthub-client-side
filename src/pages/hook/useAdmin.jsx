import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        const fetchAdminStatus = async () => {
            if (!loading && user?.email) {
                try {
                    setIsAdminLoading(true);
                    const response = await axios.get(`https://contesthub-server-gules.vercel.app/users/admin/${user.email}`);
                    setIsAdmin(response.data?.admin || false);
                } catch (error) {
                    console.error("Error checking admin status:", error);
                    setIsAdmin(false);
                } finally {
                    setIsAdminLoading(false);
                }
            }
        };

        fetchAdminStatus();
    }, [user, loading]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
