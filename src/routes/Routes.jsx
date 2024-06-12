import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
//import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Contest from "../pages/Contest";
import Dashboard from "../layouts/Dashboard";
import ManageUser from "../pages/ManageUser";
import Login from "../pages/Login";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        //errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path:'/',
                element: <Home></Home>,
                loader: ()=> fetch("http://localhost:5000/contest_info")

            },
            {
                path:'/contests',
                element: <Contest></Contest>,
                loader: ()=> fetch("http://localhost:5000/contest_info")

            },
            {
                path: '/login',
                element: <Login></Login>
            },
            // {
            //     path: '/register',
            //     element: <Register></Register>
            // },
            
            
          
            
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
           {
            path: 'manageUser',
            element: <ManageUser></ManageUser>
           }
        ]
    }
])

export default router;

