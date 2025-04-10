import { useNavigate } from "react-router-dom";
import React from "react";
import handleExportData from "./components/ExportData";
import handleImportData from "./components/ImportData";

const handleLogout = () => {
    // Clear any authentication tokens or user data here if necessary
};

const SettingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center space-y-5 p-10 text-black">
            <h1 className="text-4xl font-semibold dark:text-white">Settings</h1>

            {/* Settings Options */}
            <div className="grid w-full max-w-4xl grid-cols-2 gap-6">
                {/* Account Management */}
                <div className="rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Change Password</a>
                </div>

                <div
                    onClick={handleEditProfile}
                    className="cursor-pointer rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-slate-300"
                >
                    Edit Profile
                </div>

                {/* Hospital Management */}
                <div className="rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Manage Hospitals</a>
                </div>
                <div className="rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Switch Hospital</a>
                </div>

                {/* System Preferences */}
                <div className="rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Notification Settings</a>
                </div>
                <div className="rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Theme & Language</a>
                </div>

                {/* Security */}
                <div className="rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Manage Users</a>
                </div>
                <div className="rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Activity Logs</a>
                </div>

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
                <div className="rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Backup & Restore</a>
                </div>

                {/* Logout */}
                <div className="rounded-lg bg-white p-4 font-semibold text-gray-700 shadow-sm hover:bg-red-500 hover:text-white dark:bg-gray-800 dark:text-white">
                    <a href="">Log Out</a>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
