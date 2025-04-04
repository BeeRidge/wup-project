import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa";

// Your data source

const Membership = ({ membershipData }) => {
    /*  console.log(membershipData)
     if (!membershipData) {
         console.error("membershipData is undefined");
     } */
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Default entries per page
    /*  const [activeTab, setActiveTab] = useState("firstTranche"); // Default tab */
    const [showModal, setShowModal] = useState(false);
    const [selectedTranche, setSelectedTranche] = useState("Latest Member");

    const filteredUsers = (membershipData || []).filter(member => member.batch === selectedTranche);





    const renderBatchTranche = () => {
        switch (selectedTranche) {
            case "1st":
                return <FirstTranches membershipData={filteredUsers} />;
            case "2nd":
                return <SecondTranches membershipData={filteredUsers} />;
            case "3rd":
                return <Batch3 membershipData={filteredUsers} />;
            default:
                return <Tranche1 membershipData={filteredUsers} />

        }
    }


    // Apply search filter
    const searchedData = filteredUsers.filter((member) =>
        Object.values(member).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
    );

    // Export to PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Membership List", 14, 10);
        doc.autoTable({
            head: [
                [
                    "No",
                    "PIN",
                    "Last Name",
                    "First Name",
                    "Middle Name",
                    "Suffix",
                    "Sex",
                    "Member Type",
                    "Contact No.",
                    "Registration Date",
                    "Effective Period",
                ],
            ],
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
                member.EffectivePeriod,
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
    const totalPages = Math.ceil(searchedData.length / itemsPerPage);

    return (
        <div className="mt-2 w-full bg-white p-4">
            {/* Tabs */}
            <div className="mb-4 flex items-center border-b">
                {/* Tabs on the left */}
                <div className="flex space-x-4">
                    <button
                        className={`p-2 px-4 ${selectedTranche === "Latest Member" ? "border-b-2 border-green-700 text-green-700" : ""}`}
                        onClick={() => {
                            setSelectedTranche("Latest Member")
                            setCurrentPage(1);
                        }}
                    >
                        Latest Member
                    </button>
                    <button
                        className={`p-2 px-4 ${selectedTranche === "First Tranche" ? "border-b-2 border-green-700 text-green-700" : ""}`}
                        onClick={() => {
                            setSelectedTranche("First Tranche")
                            setCurrentPage(1);
                        }}
                    >
                        First Tranche
                    </button>
                    <button
                        className={`p-2 px-4 ${selectedTranche === "Second Tranche" ? "border-b-2 border-green-700 text-green-700" : ""}`}
                        onClick={() => {
                            setSelectedTranche("Second Tranche")
                            setCurrentPage(1);
                        }}
                    >
                        Second Tranche
                    </button>
                </div>

                {renderBatchTranche()}

                {/* Export button on the right */}
                <div className="ml-auto">
                    <button
                        onClick={() => setShowModal(true)}
                        className="rounded-full bg-gray-200 p-2 transition hover:bg-gray-300"
                    >
                        <FaDownload className="text-xl text-gray-700" />
                    </button>

                    {/* Export Modal */}
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="w-80 rounded-lg bg-white p-6 shadow-lg">
                                <h2 className="mb-4 text-lg font-semibold">Export Membership List</h2>
                                <div className="flex flex-col space-y-3">
                                    <button
                                        onClick={exportToPDF}
                                        className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                                    >
                                        Export as PDF
                                    </button>
                                    <button
                                        onClick={exportToExcel}
                                        className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                                    >
                                        Export as Excel
                                    </button>
                                    <button
                                        onClick={exportToXML}
                                        className="rounded bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600"
                                    >
                                        Export as XML
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="mt-4 text-sm text-gray-500 transition hover:text-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Search and Entries Dropdown */}
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
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((Member, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-100"
                                >
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
                        className={`rounded-md border p-2 ${currentPage === totalPages ? "cursor-not-allowed bg-gray-300" : "bg-green-700 text-white"
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
