import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import 'daisyui/dist/full.css';

const ManageContest = () => {
    const [contests, setContests] = useState([]);
    const [selectedContest, setSelectedContest] = useState(null);
    const [comment, setComment] = useState("");

    useEffect(() => {
        fetch(`https://contesthub-server-gules.vercel.app/fetch-all-contests`)
            .then(res => res.json())
            .then(data => {
                setContests(data);
            })
            .catch(error => console.error('Error fetching contests:', error));
    }, []);

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
                            // Remove the deleted contest from the state
                            setContests(contests => contests.filter(contest => contest._id !== _id));
                        }
                    })
                    .catch(error => console.error('Error deleting contest:', error));
            }
        });
    };

    const handleComment = () => {
        if (!comment) return;

        fetch(`https://contesthub-server-gules.vercel.app/add-comment/${selectedContest._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment })
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Comment Added!",
                    text: "Your comment has been added.",
                    icon: "success"
                });
                setComment("");
                setSelectedContest(null);
            }
        })
        .catch(error => console.error('Error adding comment:', error));
    };

    const handleConfirm = _id => {
        Swal.fire({
          title: "Are you sure?",
          text: "This will confirm the contest!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, confirm it!"
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`https://contesthub-server-gules.vercel.app/confirm-contest/${_id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                Swal.fire({
                  title: "Confirmed!",
                  text: "The contest has been confirmed.",
                  icon: "success"
                });
                // Optionally, update the local state to reflect the change
                setContests(contests => contests.filter(contest => contest._id !== _id));
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Failed to confirm contest.",
                  icon: "error"
                });
              }
            })
            .catch(error => {
              console.error('Error confirming contest:', error);
              Swal.fire({
                title: "Error!",
                text: "Failed to confirm contest.",
                icon: "error"
              });
            });
          }
        });
      };
      

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-6">Pending Contests</h1>
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
                        {contests.map(contest => (
                            <tr key={contest._id}>
                                <td>{contest.contestName}</td>
                                <td>{contest.prizeMoney}</td>
                                <td>Pending</td>
                                <td className="space-x-2">
                                    <button className="btn btn-sm btn-primary" onClick={() => handleConfirm(contest._id)}>Confirm</button>
                                    <button 
                                        className="btn btn-sm btn-error" 
                                        onClick={() => handleDelete(contest._id)}>
                                        Delete
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => setSelectedContest(contest)}>
                                        Comment
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedContest && (
                <div className={`modal ${selectedContest ? "modal-open" : ""}`}>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add Comment for {selectedContest.contestName}</h3>
                        <textarea
                            className="textarea textarea-bordered w-full my-4"
                            placeholder="Write your comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <div className="modal-action">
                            <button className="btn" onClick={handleComment}>OK</button>
                            <button className="btn btn-error" onClick={() => setSelectedContest(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageContest;
