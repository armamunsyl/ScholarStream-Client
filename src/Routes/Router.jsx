import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../components/Login";
import Register from "../components/Register";

const router = createBrowserRouter ([
    {
        path: "/",
        Component:  Layout,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                index: true,
                Component: Home,
            },
            {
                path: "/login",
                Component: Login,

            },
            {
                path: "/register",
                Component: Register,

            }
        ]
    }
]);
export default router;