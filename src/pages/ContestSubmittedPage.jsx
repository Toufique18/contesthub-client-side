import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';

const ContestSubmittedPage = () => {
    const { user } = useContext(AuthContext);

    const [contests, setContests] = useState([]);
    const [selectedContest, setSelectedContest] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/fetch-accepted-contests/${user?.email}`);
                setContests(response.data);
            } catch (error) {
                console.error('Error fetching contests:', error);
            }
        };

        fetchContests();
    }, []);

    const handleContestClick = async (contest) => {
        setSelectedContest(contest);
        try {
            const response = await axios.get(`http://localhost:5000/participated-contests/${contest._id}`);
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
        setShowModal(true);
    };

    const handleDeclareWin = async (participant) => {
        if (new Date(selectedContest.deadline) > new Date()) {
            alert('Deadline is not over yet');
            return;
        }

        try {
            await axios.post('http://localhost:5000/declare-winner', {
                contestId: selectedContest._id,
                winner: participant,
            });
            alert('Winner declared successfully');
        } catch (error) {
            console.error('Error declaring winner:', error);
        }

        setShowModal(false);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">My Contests</h1>
            <ul className="list-disc pl-5">
                {contests.map((contest) => (
                    <li 
                        key={contest._id} 
                        className="cursor-pointer text-blue-500 hover:underline"
                        onClick={() => handleContestClick(contest)}
                    >
                        {contest.contestName}
                    </li>
                ))}
            </ul>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Participants</h2>
                        <ul className="list-disc pl-5">
                            {participants.map((participant) => (
                                <li key={participant._id} className="mb-4">
                                    <p><span className="font-semibold">Name:</span> {participant.name}</p>
                                    <p><span className="font-semibold">Email:</span> {participant.email}</p>
                                    <p><span className="font-semibold">Submission URL:</span> <a href={participant.submissionURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{participant.submissionURL}</a></p>
                                    <button
                                        onClick={() => handleDeclareWin(participant)}
                                        disabled={new Date(selectedContest.deadline) > new Date()}
                                        className={`btn mt-2 ${new Date(selectedContest.deadline) > new Date() ? 'btn-disabled' : 'btn-primary'}`}
                                    >
                                        Declare Win
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button className="btn mt-4" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContestSubmittedPage;
