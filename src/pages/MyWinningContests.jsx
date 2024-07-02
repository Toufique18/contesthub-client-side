import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';

const MyWinningContests = () => {
  const { user } = useContext(AuthContext);
  const [participatedCount, setParticipatedCount] = useState(0);
  const [wonCount, setWonCount] = useState(0);
  const [wonContests, setWonContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchParticipationData = async () => {
        try {
          const [participatedRes, wonRes, wonContestsRes] = await Promise.all([
            axios.get(`https://contesthub-server-gules.vercel.app/participated-contest/${user.uid}`),
            axios.get(`https://contesthub-server-gules.vercel.app/won-contests/${user.uid}`),
            axios.get(`https://contesthub-server-gules.vercel.app/won-contests-details/${user.uid}`)
          ]);
          setParticipatedCount(participatedRes.data.count); // Update participated count
          setWonCount(wonRes.data.count); // Update won count
          setWonContests(wonContestsRes.data.contests); // Update won contests data
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchParticipationData();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  const winPercentage = participatedCount > 0 ? (wonCount / participatedCount) * 100 : 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Winning Contests</h1>

      <div className="flex items-center justify-around mb-6">
        <div>
          <div className="radial-progress text-primary" style={{ "--value": winPercentage }} role="progressbar">
            {winPercentage.toFixed(2)}%
          </div>
          <p className="text-center mt-2">Win Percentage</p>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold">Contests Participated</h2>
          <p className="text-2xl">{participatedCount}</p>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold">Contests Won</h2>
          <p className="text-2xl">{wonCount}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Won Contests</h2>
        {wonContests.length === 0 ? (
          <p>No contests won yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wonContests.map(contest => (
              <div key={contest._id} className="p-4 border rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-semibold mb-2">{contest.contestName}</h3>
                {contest.image && (
                  <div className="mb-2">
                    <img src={contest.image} alt={contest.contestName} className="rounded-lg shadow-md max-w-full h-auto" />
                  </div>
                )}
                <p><strong>Prize:</strong> {contest.prizeMoney}</p>
                <p><strong>Description:</strong> {contest.description}</p>
                <p><strong>Deadline:</strong> {new Date(contest.deadline).toLocaleDateString()}</p>
                <Link to={`/details/${contest._id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWinningContests;
