import React, { useState } from "react";


const CheckupHistory = ({ selectedPatient, checkupHistoryData }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");


    if (!selectedPatient) return null; // If no patient is selected, don't render

    const filteredHistory = checkupHistoryData[selectedPatient.pin]?.filter((history) =>
        history.findings.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter ? history.status === statusFilter : true)
    ) || [];

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold text-white mb-3">
                Checkup History for {selectedPatient.name}
            </h2>

            {/* Search & Filter */}
            <div className="flex gap-4 mb-3">
                <input
                    type="text"
                    placeholder="Search findings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-md w-full text-black"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border rounded-md text-black"
                >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-gray-800 text-white">
                    <thead>
                        <tr className="text-center bg-gray-700">
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Findings</th>
                            <th className="px-4 py-2">Doctor</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistory.length > 0 ? (
                            filteredHistory.map((history, index) => (
                                <tr key={index} className="text-center hover:bg-gray-600">
                                    <td className="px-4 py-2">{history.date}</td>
                                    <td className="px-4 py-2">{history.findings}</td>
                                    <td className="px-4 py-2">{history.doctor}</td>
                                    <td className="px-4 py-2">{history.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 text-gray-400">
                                    No checkup history found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CheckupHistory;
