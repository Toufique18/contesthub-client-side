import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://contesthub-server-gules.vercel.app/users');
            const data = await response.json();
            console.log("Fetched users:", data); // Logging the fetched users
            setUsers(data);
        } catch (error) {
            //console.error("Error fetching users:", error);
        }
    };

    const toggleUserRole = async (userId, newRole) => {
        try {
            await fetch(`https://contesthub-server-gules.vercel.app/users/${userId}/role`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: newRole })
            });
            Swal.fire('Success', 'User role updated successfully', 'success');
            fetchUsers(); // Refresh the users list
        } catch (error) {
            //console.error("Error updating user role:", error);
            Swal.fire('Error', 'Error updating user role', 'error');
        }
    };

    const deleteUser = async (userId) => {
        try {
            await fetch(`https://contesthub-server-gules.vercel.app/users/${userId}`, {
                method: 'DELETE'
            });
            Swal.fire('Success', 'User deleted successfully', 'success');
            fetchUsers(); // Refresh the users list
        } catch (error) {
            console.error("Error deleting user:", error);
            Swal.fire('Error', 'Error deleting user', 'error');
        }
    };

    return (
        <div>
            <h2 className="text-3xl my-10 text-center">Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.displayName}</td>
                                <td className="border px-4 py-2">{user.role}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="btn btn-xs btn-warning mr-2"
                                        onClick={() => toggleUserRole(user._id, user.role === 'admin' ? 'contest_creator' : user.role === 'contest_creator' ? 'user' : 'admin')}
                                    >
                                        Toggle Role
                                    </button>
                                    <button
                                        className="btn btn-xs btn-danger"
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
