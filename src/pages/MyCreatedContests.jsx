import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyCreatedContests = () => {
    const { user } = useContext(AuthContext);
    const [pendingContests, setPendingContests] = useState([]);
    const [acceptedContests, setAcceptedContests] = useState([]);

    useEffect(() => {
        fetch(`https://contesthub-server-gules.vercel.app/fetch-my-contests/${user?.email}`)
            .then(res => res.json())
            .then(data => setPendingContests(data));
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:5000/fetch-accepted-contests/${user?.email}`)
            .then(res => res.json())
            .then(data => setAcceptedContests(data));
    }, [user]);

    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://contesthub-server-gules.vercel.app/pending/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your contest has been deleted.",
                                icon: "success"
                            });
                            setPendingContests(prevContests => prevContests.filter(contest => contest._id !== _id));
                        }
                    });
            }
        });
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl text-center font-semibold mb-6">My Created Contests</h1>
            
            <h1 className="text-3xl font-semibold mb-6">My Pending Contests</h1>
            <div className="overflow-x-auto mb-6">
                <table className="table w-full">
                    <thead>
                        <tr>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {pendingContests.map(contest => (
                            <tr key={contest._id}>
                                <td>{contest.contestName}</td>
                                <td>{contest.prizeMoney}</td>
                                <td>Pending</td>
                                <td>{contest.comments}</td>
                                <td className="space-x-2">
                                    <Link to={`/dashboard/edit/${contest._id}`}><button className="btn btn-sm btn-primary">Edit</button></Link>
                                    <button 
                                        className="btn btn-sm btn-error" 
                                        onClick={() => handleDelete(contest._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <h1 className="text-3xl font-semibold mb-6 mt-6">My Accepted Contests</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Contest Name</th>
                            <th>Prize Money</th>
                            <th>Status</th>
                            
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {acceptedContests.map(contest => (
                            <tr key={contest._id}>
                                <td>{contest.contestName}</td>
                                <td>{contest.prizeMoney}</td>
                                <td>Accepted</td>
                                <td className="space-x-2">
                                    <Link to={`/dashboard/contestSubmittedPage`}><button className="btn btn-sm btn-secondary">See Submission</button></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCreatedContests;
