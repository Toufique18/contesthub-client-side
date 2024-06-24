import { Link, useLoaderData, useParams } from "react-router-dom";
import Countdown from 'react-countdown';
import 'daisyui/dist/full.css';

const Details = () => {
  const contests = useLoaderData();
  const { _id } = useParams();
  const contest = contests.find(contest => contest._id === _id);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-500">Not Available</span>;
    } else {
      return <span>{days}d {hours}h {minutes}m {seconds}s</span>;
    }
  };

  // Check if contest is undefined or null to prevent errors
  if (!contest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 bg-base-200 rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center">{contest.contestName}</h1>

      {contest.image && (
        <div className="flex justify-center mb-4 md:mb-6">
          <img
            src={contest.image}
            alt={contest.contestName}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      )}

      <p className="text-sm md:text-base lg:text-lg mb-2 md:mb-4"><strong>Description:</strong> {contest.description}</p>

      <div className="mb-2 md:mb-4">
        <strong className="block text-sm md:text-base lg:text-lg">Participation Count:</strong>
        <span className="badge badge-secondary">{contest.participationCount || 0}</span>
      </div>

      <div className="mb-2 md:mb-4">
        <strong className="block text-sm md:text-base lg:text-lg">Prize:</strong>
        <span className="badge badge-primary">{contest.prizeMoney} $</span>
      </div>

      {contest.winner && contest.winner.name && (
        <div className="mb-2 md:mb-4">
          <strong className="block text-sm md:text-base lg:text-lg">Winner:</strong>
          <div className="flex items-center mt-2">
            <span className="mr-2">{contest.winner.name}</span>
            {contest.winner.photoURL && (
              <img src={contest.winner.photoURL} alt={contest.winner.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full" />
            )}
          </div>
        </div>
      )}

      <div className="mb-2 md:mb-4">
        <strong className="block text-sm md:text-base lg:text-lg">Deadline:</strong>
        <span className="badge badge-outline badge-accent">
          <Countdown date={new Date(contest.deadline)} renderer={renderer} />
        </span>
      </div>

      <div className="mb-2 md:mb-4">
        <strong className="block text-sm md:text-base lg:text-lg">Task Instruction:</strong>
        <p>{contest.taskInstruction}</p>
      </div>

      <div className="mb-2 md:mb-4">
        <strong className="block text-sm md:text-base lg:text-lg">Price:</strong>
        <span className="badge badge-info">{contest.price}</span>
      </div>

      <div className="mb-2 md:mb-4">
        <strong className="block text-sm md:text-base lg:text-lg">Tag:</strong>
        <span className="badge badge-success">{contest.selectedTag}</span>
      </div>

      <div className="flex justify-center mt-6">
        {/* Conditionally render based on countdown completion */}
        {new Date(contest.deadline) > new Date() ? (
          <Link to={`/payment/${contest._id}`}>
            <button className="btn btn-primary btn-wide md:btn-md lg:btn-lg">Register for Contest</button>
          </Link>
        ) : (
          <button className="btn btn-primary btn-wide md:btn-md lg:btn-lg" disabled>Registration Closed</button>
        )}

      </div>
    </div>
  );
};

export default Details;
