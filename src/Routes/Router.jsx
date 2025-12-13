import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../components/Login";
import Register from "../components/Register";
import Scholarships from "../Pages/Scholarships";
import Faq from "../Pages/Faq";
import ScholarshipDetails from "../Pages/ScholarshipDetails";

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

            },
            {
                path: "/scholarships",
                Component: Scholarships,

            },
            {
                path: "/faq",
                Component: Faq,

            },
            {
                path: "/scholarship-details/:id",
                Component: ScholarshipDetails,

            }
        ]
    }
]);
export default router;

//scholarship-details