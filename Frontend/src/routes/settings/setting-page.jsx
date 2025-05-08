import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import handleExportData from "./components/ExportData";
import handleImportData from "./components/ImportData";
import TranchesModal from "./TranchesModal";
import UpdateBalanceModal from "./components/UpdateBalanceModal";

const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...");
    localStorage.removeItem("isAuthenticated"); // Remove authentication token or data
    window.location.href = "/login"; // Redirect to login page
};

const SettingPage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateBalanceModalOpen, setIsUpdateBalanceModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleViewLogs = () => {
        navigate("/logs"); // Navigate to the logs page
    };

    const handleOpenUpdateBalanceModal = () => {
        setIsUpdateBalanceModalOpen(true);
    };

    const handleCloseUpdateBalanceModal = () => {
        setIsUpdateBalanceModalOpen(false);
    };


    return (
        <div className="flex flex-col items-center space-y-5 p-10 text-black">
            <h1 className="text-4xl font-semibold dark:text-white">Settings</h1>

            {/* Settings Options */}
            <div className="grid w-full max-w-4xl grid-cols-2 gap-6">
            

                {/* Data Management */}
                <div
                    onClick={handleExportData}
                    className="cursor-pointer rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-slate-300"
                >
                    Export Data
                </div>
                <div
                    onClick={handleImportData}
                    className="cursor-pointer rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-slate-300"
                >
                    Import Data
                </div>
                <div
                    onClick={handleOpenModal}
                    className="cursor-pointer rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-slate-300"
                >
                    Change Tranches Value
                </div>

                <div
                    onClick={handleViewLogs}
                    className="cursor-pointer rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-slate-300"
                >
                    Activity Logs
                </div>

                <div
                    onClick={handleOpenUpdateBalanceModal}
                    className="cursor-pointer rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-slate-300"
                >
                    Update Member Balance
                </div>


                {/* Logout */}
                <div
                    onClick={handleLogout}
                    className="rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-red-500 hover:text-white dark:bg-gray-800 dark:text-white dark:hover:bg-red-500 dark:hover:text-white"
                >
                    Log out
                </div>
            </div>

            {/* Tranches Modal */}
            <TranchesModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />

            {/* Update Balance Modal */}
            <UpdateBalanceModal
                isOpen={isUpdateBalanceModalOpen}
                onClose={handleCloseUpdateBalanceModal}
            />
        </div>
    );
};

export default SettingPage;
