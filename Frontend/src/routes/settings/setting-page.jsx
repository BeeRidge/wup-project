

const SettingPage = () => {
    return (
        <div className="flex flex-col items-center p-10 text-black space-y-5">
            <h1 className="text-4xl font-semibold dark:text-white">Settings</h1>

            {/* Settings Options */}
            <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">

                {/* Account Management */}
                <div className="bg-white shadow-sm p-4 rounded-lg text-gray-700 font-semibold hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Change Password</a>
                </div>
                <div className="bg-white shadow-sm p-4 rounded-lg text-gray-700 font-semibold hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Edit Profile</a>
                </div>

                {/* Hospital Management */}
                <div className="bg-white shadow-sm p-4 rounded-lg text-gray-700 font-semibold hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Manage Hospitals</a>
                </div>
                <div className="bg-white shadow-sm p-4 rounded-lg text-gray-700 font-semibold hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Switch Hospital</a>
                </div>

                {/* System Preferences */}
                <div className="bg-white shadow-sm p-4 rounded-lg text-gray-700 font-semibold hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Notification Settings</a>
                </div>
                <div className="bg-white shadow-sm p-4 rounded-lg text-gray-700 font-semibold hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Theme & Language</a>
                </div>

                {/* Security */}
                <div className="bg-white shadow-sm p-4 rounded-lg text-gray-700 font-semibold hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Manage Users</a>
                </div>
                <div className="bg-white shadow-sm p-4 rounded-lg text-gray-700 font-semibold hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Activity Logs</a>
                </div>

                {/* Data Management */}
                <div className="bg-white shadow-sm p-4 rounded-lg text-gray-700 font-semibold hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Export Data</a>
                </div>
                <div className="bg-white shadow-sm p-4 rounded-lg text-gray-700 font-semibold hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <a href="">Backup & Restore</a>
                </div>

                {/* Logout */}
                <div className="bg-white shadow-sm p-4 rounded-lg text-gray-700 font-semibold hover:bg-red-500 hover:text-white">
                    <a href="">Log Out</a>
                </div>
            </div>
        </div>
    );
}

export default SettingPage;
