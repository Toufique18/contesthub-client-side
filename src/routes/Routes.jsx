import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
//import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        //errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path:'/',
                element: <Home></Home>,

            },
            // {
            //     path: '/login',
            //     element: <Login></Login>
            // },
            // {
            //     path: '/register',
            //     element: <Register></Register>
            // },
            
            
          
            
        ]
    }
])

export default router;

