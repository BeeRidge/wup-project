import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa";
import LatestMember from "./LatestMember";
import FirstTranches from "./FirstTranches";
import SecondTranches from "./SecondTranches";

const Membership = () => {
    const [membershipData, setMembershipData] = useState([]); // For Latest Member
    const [firstTrancheData, setFirstTrancheData] = useState([]); // For First Tranche
    const [secondTrancheData, setSecondTrancheData] = useState([]); // For Second Tranche
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [selectedTranche, setSelectedTranche] = useState("member");

    // Fetch Latest Member data
    useEffect(() => {
        fetch("http://localhost:8081/api/member")
            .then((response) => response.json())
            .then((data) => setMembershipData(data))
            .catch((error) => console.error("Error fetching Latest Member data:", error));
    }, []);

    // Fetch First Tranche data
    useEffect(() => {
        fetch("http://localhost:8081/api/fstranche")
            .then((response) => response.json())
            .then((data) => setFirstTrancheData(data))
            .catch((error) => console.error("Error fetching First Tranche data:", error));
    }, []);

    // Fetch Second Tranche data
    useEffect(() => {
        fetch("http://localhost:8081/api/sndTranche")
            .then((response) => response.json())
            .then((data) => setSecondTrancheData(data))
            .catch((error) => console.error("Error fetching Second Tranche data:", error));
    }, []);

    // Filter data based on the selected tranche
    const filteredUsers =
        selectedTranche === "First Tranche" ? firstTrancheData : selectedTranche === "Second Tranche" ? secondTrancheData : membershipData;

    // Search functionality
    const searchedData = filteredUsers.filter((member) =>
        Object.values(member).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
    );

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(searchedData.length / itemsPerPage);
    const currentItems = searchedData.slice(indexOfFirstItem, indexOfLastItem);

    // Render the appropriate batch component based on selected tranche
    const renderBatchTranche = () => {
        switch (selectedTranche) {
            case "First Tranche":
                return <FirstTranches membershipData={currentItems} />;
            case "Second Tranche":
                return <SecondTranches membershipData={currentItems} />;
            case "member":
                return <LatestMember membershipData={currentItems} />;
            default:
                return <LatestMember membershipData={currentItems} />;
        }
    };

    return (
        <div className="mt-2 w-full bg-white p-4 dark:bg-gray-800 dark:text-white">
            {/* Tranche selection buttons */}
            <div className="flex space-x-4">
                <button
                    className={`p-2 px-4 ${selectedTranche === "member" ? "border-b-2 border-green-700 text-green-700" : ""}`}
                    onClick={() => {
                        setSelectedTranche("member");
                        setCurrentPage(1); // Reset page to 1
                    }}
                >
                    Latest Member
                </button>
                <button
                    className={`p-2 px-4 ${selectedTranche === "First Tranche" ? "border-b-2 border-green-700 text-green-700" : ""}`}
                    onClick={() => {
                        setSelectedTranche("First Tranche");
                        setCurrentPage(1); // Reset page to 1
                    }}
                >
                    First Tranche
                </button>
                <button
                    className={`p-2 px-4 ${selectedTranche === "Second Tranche" ? "border-b-2 border-green-700 text-green-700" : ""}`}
                    onClick={() => {
                        setSelectedTranche("Second Tranche");
                        setCurrentPage(1); // Reset page to 1
                    }}
                >
                    Second Tranche
                </button>
            </div>

            {/* Search and Items Per Page Dropdown */}
            <div className="mb-4 flex items-center justify-between">
                <select
                    className="rounded-md border p-2 mt-3 dark:bg-gray-800 dark:text-white"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                >
                    <option value="5">Show 5</option>
                    <option value="10">Show 10</option>
                    <option value="15">Show 15</option>
                    <option value="20">Show 20</option>
                </select>

                <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 rounded-md border p-2 dark:bg-gray-800 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Render the appropriate batch component */}
            {renderBatchTranche()}

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
                <p>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, searchedData.length)} of {searchedData.length} entries
                </p>
                <div className="flex space-x-2">
                    <button
                        className={`rounded-md border p-2 ${currentPage === 1 ? "cursor-not-allowed bg-gray-300" : "bg-green-700 text-white"}`}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span className="p-2">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        className={`rounded-md border p-2 ${currentPage === totalPages ? "cursor-not-allowed bg-gray-300" : "bg-green-700 text-white"}`}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Membership;
