import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";

const useUserRole = () => {
    const { user, loading } = useContext(AuthContext);
    const [isUser, setIsUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUserRole = async () => {
            if (loading || !user) return;

            try {
                const response = await axios.get(`https://contesthub-server-gules.vercel.app/users/user/${user.email}`);
                setIsUser(response.data.user);
            } catch (error) {
                console.error('Error checking user role status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkUserRole();
    }, [user, loading]);

    return [isUser, isLoading];
};

export default useUserRole;
