import React, { useState, useEffect } from "react";

const LogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage] = useState(10);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/logs");
                const data = await response.json();
                setLogs(data);
            } catch (error) {
                console.error("Error fetching logs:", error);
            }
        };

        fetchLogs();
    }, []);

    // Filter logs based on the search term
    const filteredLogs = logs.filter((log) =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col items-center space-y-6 p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                System Activity Logs
            </h1>

            {/* Search Bar */}
            <div className="w-full max-w-5xl flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search logs by action or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-sm rounded-md border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                />
            </div>

            {/* Logs Table */}
            <div className="w-full max-w-5xl overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-white">
                                Action
                            </th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-white">
                                Description
                            </th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-white">
                                Timestamp
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLogs.length > 0 ? (
                            currentLogs.map((log) => (
                                <tr
                                    key={log.id}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <td className="px-6 py-4 text-sm text-gray-800 dark:text-white">
                                        {log.action}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 dark:text-white">
                                        {log.description}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 dark:text-white">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="px-6 py-4 text-center text-sm text-gray-500 dark:text.gray-400"
                                >
                                    No logs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center space-x-2">
                {Array.from(
                    { length: Math.ceil(filteredLogs.length / logsPerPage) },
                    (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                currentPage === index + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                            }`}
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default LogsPage;