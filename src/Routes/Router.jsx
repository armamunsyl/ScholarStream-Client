import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../components/Login";
import Register from "../components/Register";
import Scholarships from "../Pages/Scholarships";
import Faq from "../Pages/Faq";
import ScholarshipDetails from "../Pages/ScholarshipDetails";
import DashboardOverview from "../Pages/Dashboard/DashboardOverview";
import StudentApplications from "../Pages/Dashboard/StudentApplications";
import StudentReviews from "../Pages/Dashboard/StudentReviews";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import Profile from "../Pages/Dashboard/Profile";
import ModeratorApplications from "../Pages/Dashboard/ModeratorApplications";
import AllApplications from "../Pages/Dashboard/AllApplications";
import ApplicationFeedback from "../Pages/Dashboard/ApplicationFeedback";
import Reports from "../Pages/Dashboard/Reports";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import ManageScholarships from "../Pages/Dashboard/ManageScholarships";
import AddScholarship from "../Pages/Dashboard/AddScholarship";
import PaymentRecords from "../Pages/Dashboard/PaymentRecords";
import Analytics from "../Pages/Dashboard/Analytics";
import MakePayment from "../Pages/Dashboard/MakePayment";

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
    },
    {
        path: "/dashboard",
        Component: DashboardLayout,
        children: [
            {
                index: true,
                Component: DashboardOverview,
            },
            {
                path: "my-applications",
                Component: StudentApplications,
            },
            {
                path: "my-reviews",
                Component: StudentReviews,
            },
            {
                path: "payment-history",
                Component: PaymentHistory,
            },
            {
                path: "make-payment",
                Component: MakePayment,
            },
            {
                path: "my-profile",
                Component: Profile,
            },
            {
                path: "review-applications",
                Component: ModeratorApplications,
            },
            {
                path: "all-applications",
                Component: AllApplications,
            },
            {
                path: "application-feedback",
                Component: ApplicationFeedback,
            },
            {
                path: "reports",
                Component: Reports,
            },
            {
                path: "manage-users",
                Component: ManageUsers,
            },
            {
                path: "manage-scholarships",
                Component: ManageScholarships,
            },
            {
                path: "add-scholarship",
                Component: AddScholarship,
            },
            {
                path: "payment-records",
                Component: PaymentRecords,
            },
            {
                path: "analytics",
                Component: Analytics,
            },
        ],
    },
]);
export default router;

//scholarship-details
