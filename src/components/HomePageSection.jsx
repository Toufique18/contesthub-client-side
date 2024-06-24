import { useEffect, useState } from 'react';
import axios from 'axios';
import 'daisyui/dist/full.css';
import { Link } from 'react-router-dom';

const HomePageSection = () => {
  const [stats, setStats] = useState({
    totalParticipants: 0,
    totalWinners: 0,
    latestWinner: null,
    contestWithMostParticipants: null,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('https://contesthub-server-gules.vercel.app/home-contest-statistics');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching contest statistics for home page:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Join Our Exciting Contests!</h1>

      {stats.latestWinner && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Latest Contest Winner</h2>
          <div className="flex items-center justify-center">
            {stats.latestWinner.winner.photoURL && (
              <img
                src={stats.latestWinner.winner.photoURL}
                alt={stats.latestWinner.winner.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg mr-4"
              />
            )}
            <div>
              <p className="text-xl font-semibold">{stats.latestWinner.winner.name}</p>
              <p className="text-sm text-gray-600">{stats.latestWinner.contestName}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Total Participants</h2>
          <p className="text-3xl font-bold text-primary">{stats.totalParticipants}</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Total Winners</h2>
          <p className="text-3xl font-bold text-primary">{stats.totalWinners}</p>
        </div>

        {stats.contestWithMostParticipants && (
          <div className="p-4 bg-white rounded-lg shadow-lg text-center md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Most Popular Contest</h2>
            <p className="text-lg font-semibold">{stats.contestWithMostParticipants.contestName}</p>
            <p className="text-sm text-gray-600">#{stats.contestWithMostParticipants.selectedTag}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <Link to={'/contests'}><button className="btn btn-primary btn-wide md:btn-md lg:btn-lg">Join a Contest Now!</button></Link>
      </div>
    </div>
  );
};

export default HomePageSection;
