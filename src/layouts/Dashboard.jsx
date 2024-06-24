import { NavLink, Outlet } from "react-router-dom";
//import { useEffect, useState } from "react";
import useAdmin from "../pages/hook/useAdmin";
import useContestCreator from "../pages/hook/useContestCreator";
import useUserRole from "../pages/hook/useUserRole";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isContestCreator, isContestCreatorLoading] = useContestCreator();
    const [isUser, isUserLoading] = useUserRole();
    const { logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }

    if (isAdminLoading || isContestCreatorLoading || isUserLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="lg:flex">
            <div className="drawer lg:w-80 lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content   items-start justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden">Open sidebar</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><NavLink to={'/'}>Home</NavLink></li>
                        <div className="divider"></div>
                        {isAdmin && (
                            <>
                                <li><NavLink to={'/dashboard/manageUser'}>Manage User</NavLink></li>
                                <li><NavLink to={'/dashboard/manageContest'}>Manage Contests</NavLink></li>
                            </>
                        )}
                        {isContestCreator && (
                            <>
                                <li><NavLink to={'/dashboard/addContest'}>Add Contest</NavLink></li>
                                <li><NavLink to={'/dashboard/myCreatedContests'}>My Created Contests</NavLink></li>
                                <li><NavLink to={'/dashboard/contestSubmittedPage'}>Contest Submitted Page</NavLink></li>
                            </>
                        )}
                        {isUser && (
                            <>
                                <li><NavLink to={'/dashboard/myParticipatedContests'}>My Participated Contests</NavLink></li>
                                <li><NavLink to={'/dashboard/myWinningContests'}>My Winning Contests</NavLink></li>
                            </>
                        )}
                        {(isAdmin || isContestCreator || isUser) && <li><NavLink to={'/dashboard/myProfile'}>My Profile</NavLink></li>}
                        <div className="divider"></div>
                        {/* <li><Button onClick={handleLogOut}>Log Out</Button></li> */}
                        <li><button onClick={handleLogOut}>Log Out</button></li>
                    </ul>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
