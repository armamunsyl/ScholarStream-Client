import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter ([
    {
        path: "/",
        Component:  Layout,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                index: true,
                Component: Home,
            }
        ]
    }
]);
export default router;