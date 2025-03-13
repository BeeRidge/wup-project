import { useTheme } from "@/hooks/use-theme";
import { Bell, ChevronsLeft, Moon, Search, Sun, LogOut, Settings, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import profileImg from "@/assets/no-profile.jpg";
import PropTypes from "prop-types";

export const Header = ({ collapsed, setCollapsed }) => {
    const { theme, setTheme } = useTheme();

    // States for dropdowns
    const [openProfile, setOpenProfile] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);

    // Refs for detecting outside clicks
    const profileRef = useRef(null);
    const notifRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setOpenProfile(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setOpenNotifications(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            {/* Left Section */}
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed && "rotate-180"} />
                </button>
                {/*  <div className="input">
                    <Search
                        size={20}
                        className="text-slate-300"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                </div> */}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-x-3">
                {/* Theme Toggle Button */}
                <button
                    className="btn-ghost size-10"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Sun
                        size={20}
                        className="dark:hidden"
                    />
                    <Moon
                        size={20}
                        className="hidden dark:block"
                    />
                </button>

                {/* Notification Dropdown */}
                <div
                    className="relative"
                    ref={notifRef}
                >
                    <button
                        className="btn-ghost relative size-10"
                        onClick={() => setOpenNotifications(!openNotifications)}
                    >
                        <Bell size={20} />
                        {/* Notification Badge */}
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            3
                        </span>
                    </button>

                    {/* Dropdown Menu */}
                    {openNotifications && (
                        <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg dark:bg-slate-800">
                            <ul className="py-2 text-gray-700 dark:text-gray-300">
                                <li className="border-b px-4 py-2 dark:border-gray-600">New message from John</li>
                                <li className="border-b px-4 py-2 dark:border-gray-600">System update available</li>
                                <li className="border-b px-4 py-2 dark:border-gray-600">Reminder: Meeting at 3 PM</li>
                                <li
                                    className="cursor-pointer px-4 py-2 text-center text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => console.log("View all notifications")}
                                >
                                    View All
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div
                    className="relative"
                    ref={profileRef}
                >
                    <button
                        className="size-10 overflow-hidden rounded-full"
                        onClick={() => setOpenProfile(!openProfile)}
                    >
                        <img
                            src={profileImg}
                            alt="profile image"
                            className="size-full object-cover"
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {openProfile && (
                        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:bg-slate-800">
                            <ul className="py-2 text-gray-700 dark:text-gray-300">
                                {/* Profile */}
                                <li
                                    className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => console.log("Go to Profile")}
                                >
                                    <User
                                        size={18}
                                        className="mr-2"
                                    />{" "}
                                    Profile
                                </li>

                                {/* Settings */}
                                <li
                                    className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => console.log("Go to Settings")}
                                >
                                    <Settings
                                        size={18}
                                        className="mr-2"
                                    />{" "}
                                    Settings
                                </li>

                                {/* Logout */}
                                <li
                                    className="flex cursor-pointer items-center px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => console.log("Logging out...")}
                                >
                                    <LogOut
                                        size={18}
                                        className="mr-2"
                                    />{" "}
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};
