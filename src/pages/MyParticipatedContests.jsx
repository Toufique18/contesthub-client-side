import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const MyParticipatedContests = () => {
  const { user } = useContext(AuthContext);
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContestId, setCurrentContestId] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState("");

  useEffect(() => {
    const fetchParticipatedContests = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(
            `https://contesthub-server-gules.vercel.app/participated-contests-by-email/${user.email}`
          );
          setContests(response.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching participated contests:", err);
          setError("Failed to fetch participated contests");
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchParticipatedContests();
  }, [user]);

  const handleSubmit = async () => {
    if (!submissionUrl) return;

    try {
      await axios.post("https://contesthub-server-gules.vercel.app/submit-url", {
        contestId: currentContestId,
        userId: user.uid,
        url: submissionUrl,
      });

      setIsModalOpen(false);
      setSubmissionUrl("");
      alert("URL submitted successfully!");
    } catch (err) {
      console.error("Error submitting URL:", err);
      alert("Failed to submit URL");
    }
  };

  const isDeadlineOver = (deadline) => {
    return new Date(deadline) < new Date();
  };

  if (!user) {
    return <div>You must be logged in to view your participated contests.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Participated Contests</h1>
      {contests.length === 0 ? (
        <div>You have not participated in any contests yet.</div>
      ) : (
        <ul>
          {contests.map((contest) => (
            <li key={contest._id} className="mb-4 p-4 border rounded">
              <h2 className="text-xl font-semibold">{contest.contestName}</h2>
              <p>{contest.description}</p>
              <button
                className="btn btn-primary"
                disabled={isDeadlineOver(contest.deadline)}
                onClick={() => {
                  setCurrentContestId(contest._id);
                  setIsModalOpen(true);
                }}
              >
                Submit URL
              </button>
              {isDeadlineOver(contest.deadline) && (
                <p className="text-red-500 mt-2">Deadline is over</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Submit URL</h2>
            <input
              type="text"
              className="input input-bordered w-full mb-4"
              placeholder="Enter URL"
              value={submissionUrl}
              onChange={(e) => setSubmissionUrl(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="btn btn-secondary mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParticipatedContests;
