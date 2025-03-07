import { useState } from "react";
import { membershipData } from "../../constants"; 
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa";
// Your data source

const Membership = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Default entries per page
    const [activeTab, setActiveTab] = useState("firstTranche"); // Default tab
    const [showModal, setShowModal] = useState(false);

    // Filter data based on the selected tab
    const filteredData = membershipData.filter((member) => {
        if (activeTab === "firstTranche") return member.batch === "First Tranche";
        if (activeTab === "secondTranche") return member.batch === "Second Tranche";
        if (activeTab === "latestMember") return member.batch === "Latest Member";
        return true;
    });

    // Apply search filter
    const searchedData = filteredData.filter((member) =>
        Object.values(member).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );



     // Export to PDF
     const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Membership List", 14, 10);
        doc.autoTable({
            head: [["No", "PIN", "Last Name", "First Name", "Middle Name", "Suffix", "Sex", "Member Type", "Contact No.", "Registration Date", "Effective Period"]],
            body: searchedData.map((member, index) => [
                index + 1,
                member.Pin,
                member.LastName,
                member.FirstName,
                member.MiddleName,
                member.Suffix,
                member.Sex,
                member.MemberType,
                member.ContactNo,
                member.RegistrationDate,
                member.EffectivePeriod
            ]),
        });
        doc.save("membership_list.pdf");
        setShowModal(false);
    };

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(searchedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Membership List");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        saveAs(data, "membership_list.xlsx");
        setShowModal(false);
    };

    // Export to XML
    const exportToXML = () => {
        let xmlData = `<?xml version="1.0" encoding="UTF-8"?>\n<members>\n`;
        searchedData.forEach((member) => {
            xmlData += `  <member>\n`;
            Object.entries(member).forEach(([key, value]) => {
                xmlData += `    <${key}>${value}</${key}>\n`;
            });
            xmlData += `  </member>\n`;
        });
        xmlData += `</members>`;
        const blob = new Blob([xmlData], { type: "application/xml" });
        saveAs(blob, "membership_list.xml");
        setShowModal(false);
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(searchedData.length / itemsPerPage);

    return (
        <div className="mt-2 w-full bg-white p-4">
            {/* Tabs */}
            <div className="flex items-center border-b mb-4">
    {/* Tabs on the left */}
    <div className="flex space-x-4">
        <button
            className={`p-2 px-4 ${activeTab === "firstTranche" ? "border-b-2 border-green-700 text-green-700" : ""}`}
            onClick={() => { setActiveTab("firstTranche"); setCurrentPage(1); }}
        >
            First Tranche
        </button>
        <button
            className={`p-2 px-4 ${activeTab === "secondTranche" ? "border-b-2 border-green-700 text-green-700" : ""}`}
            onClick={() => { setActiveTab("secondTranche"); setCurrentPage(1); }}
        >
            Second Tranche
        </button>
        <button
            className={`p-2 px-4 ${activeTab === "latestMember" ? "border-b-2 border-green-700 text-green-700" : ""}`}
            onClick={() => { setActiveTab("latestMember"); setCurrentPage(1); }}
        >
            Latest Member
        </button>
    </div>

    {/* Export button on the right */}
    <div className="ml-auto">
        <button 
            onClick={() => setShowModal(true)}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        >
            <FaDownload className="text-gray-700 text-xl" />
        </button>

            {/* Export Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold mb-4">Export Membership List</h2>
                        <div className="flex flex-col space-y-3">
                            <button 
                                onClick={exportToPDF} 
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Export as PDF
                            </button>
                            <button 
                                onClick={exportToExcel} 
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Export as Excel
                            </button>
                            <button 
                                onClick={exportToXML} 
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                            >
                                Export as XML
                            </button>
                        </div>
                        <button 
                            onClick={() => setShowModal(false)} 
                            className="mt-4 text-gray-500 hover:text-gray-700 transition text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            </div>
        </div>
            

            {/* Search and Entries Dropdown */}
            <div className="flex justify-between items-center mb-4">
                     <select
                    className="border p-2 rounded-md"
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
                    className="border p-2 rounded-md w-64"
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
                            <th className="px-4 py-2">PIN</th>
                            <th className="px-4 py-2">Last Name</th>
                            <th className="px-4 py-2">First Name</th>
                            <th className="px-4 py-2">Middle Name</th>
                            <th className="px-4 py-2">Suffix</th>
                            <th className="px-4 py-2">Sex</th>
                            <th className="px-4 py-2">Member Type</th>
                            <th className="px-4 py-2">Contact No.</th>
                            <th className="px-4 py-2">Registration Date</th>
                            <th className="px-4 py-2">Effective Period</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((Member, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-4 py-2">{Member.id}</td>
                                    <td className="px-4 py-2">{Member.Pin}</td>
                                    <td className="px-4 py-2">{Member.LastName}</td>
                                    <td className="px-4 py-2">{Member.FirstName}</td>
                                    <td className="px-4 py-2">{Member.MiddleName}</td>
                                    <td className="px-4 py-2">{Member.Suffix}</td>
                                    <td className="px-4 py-2">{Member.Sex}</td>
                                    <td className="px-4 py-2">{Member.MemberType}</td>
                                    <td className="px-4 py-2">{Member.ContactNo}</td>
                                    <td className="px-4 py-2">{Member.RegistrationDate}</td>
                                    <td className="px-4 py-2">{Member.EffectivePeriod}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="text-center py-4 text-gray-500">
                                    No results found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <p>
                    Showing {indexOfFirstItem + 1} to{" "}
                    {Math.min(indexOfLastItem, searchedData.length)} of{" "}
                    {searchedData.length} entries
                </p>

                <div className="flex space-x-2">
                    <button
                        className={`p-2 border rounded-md ${
                            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-green-700 text-white"
                        }`}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span className="p-2">{currentPage} / {totalPages}</span>
                    <button
                        className={`p-2 border rounded-md ${
                            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-green-700 text-white"
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
