import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../provider/AuthProvider";

const MyWinningContests = () => {
  const { user } = useContext(AuthContext);
  const [participatedContests, setParticipatedContests] = useState(0);
  const [wonContests, setWonContests] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchContestsData = async () => {
        try {
          // Fetch the total number of participated contests
          const participatedResponse = await axios.get(`https://contesthub-server-gules.vercel.app/participated-contests/${user.uid}`);
          setParticipatedContests(participatedResponse.data.count);

          // Fetch the total number of won contests
          const wonResponse = await axios.get(`https://contesthub-server-gules.vercel.app/won-contests/${user.uid}`);
          setWonContests(wonResponse.data.count);

          setLoading(false);
        } catch (error) {
          console.error('Error fetching contest data:', error);
          setLoading(false);
        }
      };

      fetchContestsData();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const winPercentage = participatedContests > 0 ? (wonContests / participatedContests) * 100 : 0;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 bg-base-200 rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center">My Winning Contests</h1>
      
      <div className="flex justify-center mb-4 md:mb-6">
        <div className="radial-progress text-primary" style={{ "--value": winPercentage }} role="progressbar">
          {winPercentage.toFixed(2)}%
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm md:text-base lg:text-lg mb-2"><strong>Participated Contests:</strong> {participatedContests}</p>
        <p className="text-sm md:text-base lg:text-lg mb-2"><strong>Won Contests:</strong> {wonContests}</p>
      </div>
    </div>
  );
};

export default MyWinningContests;
