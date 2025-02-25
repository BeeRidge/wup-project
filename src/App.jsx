import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { useEffect, useState } from "react";
import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/dashboard";
import Membership from "./routes/Membership/Membership";
import SecondTranches from "./routes/Membership/SecondTranches";
import FirstTranches from "./routes/Membership/FirstTranches";
import Login from "./routes/auth/Login";
import "./index.css";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is authenticated (stored in localStorage)
        const authStatus = localStorage.getItem("isAuthenticated");
        setIsAuthenticated(authStatus === "true");
    }, []);

    const handleLogout = () => {
        const authStatus = localStorage.removeItem("isAuthenticated");
        Navigate("/");
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: isAuthenticated ? <Layout /> : <Navigate to="/login" />,
            children: [
                {
                    index: true,
                    path: "dashboard",
                    element: isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />,
                },
                {
                    path: "analytics",
                    element: isAuthenticated ? <h1 className="title">Analytics</h1> : <Navigate to="/login" />,
                },
                {
                    path: "reports",
                    element: isAuthenticated ? <h1 className="title">Reports</h1> : <Navigate to="/login" />,
                },
                {
                    path: "Membership",
                    element: isAuthenticated ? <Membership /> : <Navigate to="/login" />,
                },
                {
                    path: "First-Tranches",
                    element: isAuthenticated ? <FirstTranches /> : <Navigate to="/login" />,
                },
                {
                    path: "Second-Tranches",
                    element: isAuthenticated ? <SecondTranches /> : <Navigate to="/login" />,
                },
                {
                    path: "settings",
                    element: isAuthenticated ? <h1 className="title">Settings</h1> : <Navigate to="/login" />,
                },
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
