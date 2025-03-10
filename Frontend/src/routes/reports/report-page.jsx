import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const ReportPage = () => {
    const { theme, setheme } = useTheme();
    // Checkup Filter Options
    const checkupOptions = ["All", "Abdomen", "Heart", "Lungs", "Kidney"];

    const selectedPatient = { pin: "12345", name: "John Doe" }; // Example selected patient

    const tableFilterOptions = ["All", "Senior", "Regular", "Student"];

    const patientData = [
        { id: 1, pin: "P001", name: "John Doe", sex: "Male", type: "Senior", contact: "09123456789", checkup: "Abdomen", regDate: "2024-03-01", period: "1 Year" },
        { id: 2, pin: "P002", name: "Jane Smith", sex: "Female", type: "Regular", contact: "09234567890", checkup: "Heart", regDate: "2024-03-02", period: "1 Year" },
        { id: 3, pin: "P003", name: "Alice Brown", sex: "Female", type: "Student", contact: "09345678901", checkup: "Lungs", regDate: "2024-03-03", period: "6 Months" },
        { id: 4, pin: "P004", name: "Michael Lee", sex: "Male", type: "Senior", contact: "09456789012", checkup: "Abdomen", regDate: "2024-03-04", period: "1 Year" },
        { id: 5, pin: "P005", name: "Sara White", sex: "Female", type: "Regular", contact: "09567890123", checkup: "Kidney", regDate: "2024-03-05", period: "6 Months" },
    ];

    // State for filters
    const [selectedCheckup, setSelectedCheckup] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [tableFilter, setTableFilter] = useState("All");

    // Filtered Patient Data
    const filteredPatients = patientData.filter(patient => {
        const matchesCheckup = selectedCheckup === "All" || patient.checkup === selectedCheckup;
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.pin.includes(searchTerm);
        const matchesType = tableFilter === "All" || patient.type === tableFilter;
        return matchesCheckup && matchesSearch && matchesType;
    });

    return (

        <div className="p-6 space-y-6 bg-white dark:bg-gray-800 w-full shadow-md rounded-lg">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold dark:text-white">Reports & Analytics</h1>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-white bg-gray-700 hover:bg-gray-600">
                        <FileText size={18} /> Print Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-white bg-blue-600 hover:bg-blue-500">
                        <Download size={18} /> Export Data
                    </button>
                </div>
            </div>

            {/* Filters Section */}
            <div className="flex flex-wrap gap-4">
                {/* Main Checkup Dropdown */}
                <select
                    className="px-4 py-2 border rounded-lg text-gray-800  bg-white dark:bg-gray-800 dark:text-white "
                    value={selectedCheckup}
                    onChange={(e) => setSelectedCheckup(e.target.value)}
                >
                    {checkupOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by Name or PIN..."
                    className="px-4 py-2 border rounded-lg text-gray-800  bg-white dark:bg-gray-800 dark:text-white  w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Patient Records Table */}
            <div className="overflow-x-auto">
                <table className="w-full  text-left text-gray-800 dark:text-white">
                    <thead className=" bg-white dark:bg-gray-800">
                        <tr>
                            <th className="px-4 py-2">PIN</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Sex</th>
                            <th className="px-4 py-2">
                                {/* Internal Table Dropdown */}
                                <select
                                    className=" bg-white text-gray-700 border border-gray-800 dark:bg-gray-800 px-2 py-1 rounded dark:text-white"
                                    value={tableFilter}
                                    onChange={(e) => setTableFilter(e.target.value)}
                                >
                                    {tableFilterOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </th>
                            <th className="px-4 py-2">Contact</th>
                            <th className="px-4 py-2">Checkup</th>
                            <th className="px-4 py-2">Registered Date</th>
                            <th className="px-4 py-2">Period</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.length > 0 ? (
                            filteredPatients.map(patient => (
                                <tr key={patient.id} className="  hover:bg-white dark:hover:bg-gray-800">
                                    <td className="px-4 py-2">{patient.pin}</td>
                                    <td className="px-4 py-2">{patient.name}</td>
                                    <td className="px-4 py-2">{patient.sex}</td>
                                    <td className="px-4 py-2">{patient.type}</td>
                                    <td className="px-4 py-2">{patient.contact}</td>
                                    <td className="px-4 py-2">{patient.checkup}</td>
                                    <td className="px-4 py-2">{patient.regDate}</td>
                                    <td className="px-4 py-2">{patient.period}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-4 py-2 text-center text-gray-400">No records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>


    );
};

export default ReportPage;
