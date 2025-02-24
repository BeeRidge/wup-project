import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import Membership from "./routes/Membership/Membership";
import SecondTranches from "./routes/Membership/SecondTranches";
import FirstTranches from "./routes/Membership/FirstTranches";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "analytics",
                    element: <h1 className="title">Analytics</h1>,
                },
                {
                    path: "reports",
                    element: <h1 className="title">Reports</h1>,
                },
                {
                    path: "Membership",
                    element: <Membership />,
                },
                {
                    path: "First-Tranches",
                    element: <FirstTranches />,
                },
                {
                    path: "Second-Tranches",
                    element: <SecondTranches />,
                },

                {
                    path: "settings",
                    element: <h1 className="title">Settings</h1>,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
