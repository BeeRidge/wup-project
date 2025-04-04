import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa";

const Membership = () => {
    const [membershipData, setMembershipData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [selectedTranche, setSelectedTranche] = useState("Latest Member");
    const [showModal, setShowModal] = useState(false);

    // Fetch data from the API on component mount
    useEffect(() => {
        fetch("http://localhost:8081/api/member")
            .then((response) => response.json())
            .then((data) => setMembershipData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Filter data based on the selected tranche
    const filteredUsers = membershipData.filter((member) => member.batch === selectedTranche);

    // Search functionality
    const searchedData = filteredUsers.filter((member) =>
        Object.values(member).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
    );

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(searchedData.length / itemsPerPage);
    const currentItems = searchedData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="mt-2 w-full bg-white p-4">
            {/* Tabs */}
            <div className="mb-4 flex items-center border-b">
                <div className="flex space-x-4">
                    {["Latest Member", "First Tranche", "Second Tranche"].map((tranche) => (
                        <button
                            key={tranche}
                            className={`p-2 px-4 ${selectedTranche === tranche ? "border-b-2 border-green-700 text-green-700" : ""}`}
                            onClick={() => {
                                setSelectedTranche(tranche);
                                setCurrentPage(1);
                            }}
                        >
                            {tranche}
                        </button>
                    ))}
                </div>

                {/* Export button */}
                <div className="ml-auto">
                    <button
                        onClick={() => setShowModal(true)}
                        className="rounded-full bg-gray-200 p-2 transition hover:bg-gray-300"
                    >
                        <FaDownload className="text-xl text-gray-700" />
                    </button>
                </div>
            </div>

            {/* Search and Items Per Page Dropdown */}
            <div className="mb-4 flex items-center justify-between">
                <select
                    className="rounded-md border p-2"
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
                    className="w-64 rounded-md border p-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-green-700">
                    <thead>
                        <tr className="bg-green-700 text-white">
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">PIN No.</th>
                            <th className="px-4 py-2">Member Type</th>
                            <th className="px-4 py-2">Last Name</th>
                            <th className="px-4 py-2">First Name</th>
                            <th className="px-4 py-2">Middle Name</th>
                            <th className="px-4 py-2">Suffix</th>
                            <th className="px-4 py-2">Sex</th>
                            <th className="px-4 py-2">Contact No.</th>
                            <th className="px-4 py-2">Registration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((member, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-100"
                                >
                                    <td className="px-4 py-2">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-2">{member.PinNumber}</td>
                                    <td className="px-4 py-2">{member.MemberType}</td>
                                    <td className="px-4 py-2">{member.FirstName}</td>
                                    <td className="px-4 py-2">{member.MiddleName}</td>
                                    <td className="px-4 py-2">{member.LastName}</td>
                                    <td className="px-4 py-2">{member.SuffixName}</td>
                                    <td className="px-4 py-2">{member.Sex}</td>
                                    <td className="px-4 py-2">{member.MobileNumber}</td>
                                    <td className="px-4 py-2">{member.RegistrationDate}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="11"
                                    className="py-4 text-center text-gray-500"
                                >
                                    No results found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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
                        className={`rounded-md border p-2 ${
                            currentPage === totalPages ? "cursor-not-allowed bg-gray-300" : "bg-green-700 text-white"
                        }`}
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
