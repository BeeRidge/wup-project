import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { useEffect, useState } from "react";
import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/dashboard";
import Membership from "./routes/Membership/Membership";
import Login from "./routes/auth/Login";
import "./index.css";
import ReportPage from "./routes/reports/report-page";
import SettingPage from "./routes/settings/setting-page";
import EditProfile from "./routes/settings/components/EditProfile";
import LogsPage from "./routes/settings/components/LogsPage";
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

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
                    element: isAuthenticated ? <ReportPage /> : <Navigate to="/login" />,
                },
                {
                    path: "Membership",
                    element: isAuthenticated ? <Membership /> : <Navigate to="/login" />,
                },
                /*  {
                     path: "First-Tranches",
                     element: isAuthenticated ? <FirstTranches /> : <Navigate to="/login" />,
                 },
                 {
                     path: "Second-Tranches",
                     element: isAuthenticated ? <SecondTranches /> : <Navigate to="/login" />,
                 }, */
                {
                    path: "settings",
                    element: isAuthenticated ? <SettingPage /> : <Navigate to="/login" />,
                },
                {
                    path: "settings/edit-profile",
                    element: isAuthenticated ? <EditProfile /> : <Navigate to="/login" />
                },

                {
                    path: "logs",
                    element: isAuthenticated ? <LogsPage/> : <Navigate to="/login" />,
                }
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

/* import React, { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/api/users')
            .then(res => res.json())
            .then(data => {
                console.log(data); // Logs fetched data
                setData(data); // Update state with fetched data
            })
            .catch(err => console.log("Error fetching data:", err));
    }, []);

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Accreditation Number</th>
                        <th>Username</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((d, i) => (
                            <tr key={i}>
                                <td>{d.ACCRE_NO}</td>
                                <td>{d.USER_ID}</td>
                                <td>{d.USER_PASSWORD}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default App; */
