import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Contest from "../pages/Contest";
import Dashboard from "../layouts/Dashboard";
import ManageUser from "../pages/ManageUser";
import AddContest from "../pages/AddContest";
import MyCreatedContests from "../pages/MyCreatedContests";
import ContestSubmittedPage from "../pages/ContestSubmittedPage";
import MyParticipatedContests from "../pages/MyParticipatedContests";
import MyWinningContests from "../pages/MyWinningContests";
import MyProfile from "../pages/MyProfile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Edit from "../pages/Edit";
import ManageContest from "../pages/ManageContest";
import Details from "../pages/Details";
import Payment from "../pages/payment/Payment";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "../pages/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: () => fetch("https://contesthub-server-gules.vercel.app/contest_info")
            },
            {
                path: '/contests',
                element: <PrivateRoute><Contest></Contest></PrivateRoute>,
                loader: () => fetch("https://contesthub-server-gules.vercel.app/contest_info")
            },
            {
                path: '/details/:_id',
                element: <PrivateRoute><Details></Details></PrivateRoute>,
                loader: () => fetch("https://contesthub-server-gules.vercel.app/contest_info")
            },
            {
                path: '/payment/:contestId',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
                
            },
            {
                path: '/login',
                element: <PrivateRoute><Login /></PrivateRoute>
            },
            {
                path: '/register',
                element: <PrivateRoute><Register /></PrivateRoute>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                path: 'manageUser',
                element: <ManageUser />
            },
            {
                path: 'manageContest',
                element: <ManageContest></ManageContest>
            },
            {
                path: 'addContest',
                element: <AddContest />
            },
            {
                path: 'myCreatedContests',
                element: <MyCreatedContests />
            },
            {
                path: 'contestSubmittedPage',
                element: <ContestSubmittedPage />
            },
            {
                path: 'myParticipatedContests',
                element: <MyParticipatedContests />
            },
            {
                path: 'myWinningContests',
                element: <MyWinningContests />
            },
            {
                path: 'myProfile',
                element: <MyProfile />
            },
            {
                path: 'edit/:id',
                element: <Edit></Edit>,
                loader: () => fetch("https://contesthub-server-gules.vercel.app/pending")

            },
        ]
    }
]);

export default router;
