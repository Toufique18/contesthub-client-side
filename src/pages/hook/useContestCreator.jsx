import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";

const useContestCreator = () => {
    const { user, loading } = useContext(AuthContext);
    const [isContestCreator, setIsContestCreator] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkContestCreator = async () => {
            if (loading || !user) return;

            try {
                const response = await axios.get(`https://contesthub-server-gules.vercel.app/users/contest_creator/${user.email}`);
                setIsContestCreator(response.data.contestCreator);
            } catch (error) {
                console.error('Error checking contest creator status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkContestCreator();
    }, [user, loading]);

    return [isContestCreator, isLoading];
};

export default useContestCreator;
