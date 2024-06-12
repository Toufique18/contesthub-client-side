import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
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
                        <li><NavLink to={'/dashboard/manageUser'}>Manage User</NavLink></li>
                        <li><NavLink>Manage Contests</NavLink></li>
                        <div className="divider"></div>
                        <li><NavLink>Log Out</NavLink></li>
                    </ul>

                </div>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;