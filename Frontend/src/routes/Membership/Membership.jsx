import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa";
import LatestMember from "./LatestMember";
import FirstTranches from "./FirstTranches";
import SecondTranches from "./SecondTranches";
import AddMemberModal from "./component/AddMemberModal";
import AddHealthAssessmentModal from "./component/AddHealthAssessmentModal";
import axios from "axios";
import { FaUserPlus, FaClipboard, FaStethoscope } from "react-icons/fa";
import AddConsultationModal from "./component/AddConsultationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        Object.values({
            ...member,
            FullName:
                `${member.FirstName} ${member.MiddleName ? member.MiddleName.charAt(0) + "." : ""} ${member.LastName} ${member.SuffixName || ""}`.trim(),
        }).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
    );

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(searchedData.length / itemsPerPage);
    const currentItems = searchedData.slice(indexOfFirstItem, indexOfLastItem);

    // Render the appropriate batch component based on selected tranche
    const renderBatchTranche = () => {
        const updatedItems = currentItems.map((member) => ({
            ...member,
            FullName:
                `${member.FirstName} ${member.MiddleName ? member.MiddleName.charAt(0) + "." : ""} ${member.LastName} ${member.SuffixName || ""}`.trim(),
        }));

        switch (selectedTranche) {
            case "First Tranche":
                return <FirstTranches membershipData={updatedItems} />;
            case "Second Tranche":
                return <SecondTranches membershipData={updatedItems} />;
            case "member":
                return <LatestMember membershipData={updatedItems} />;
            default:
                return <LatestMember membershipData={updatedItems} />;
        }
    };

    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    const handleAddMember = async (memberData) => {
        console.log("Adding member:", memberData); // Debugging
        try {
            const response = await axios.post("http://localhost:8081/api/add-member", memberData);

            if (response.status === 201) {
                alert("Member added successfully!");
                setMembershipData((prev) => [...prev, memberData]); // Update the UI
            } else {
                alert("Failed to add member.");
            }
        } catch (error) {
            console.error("Error adding member:", error);
            alert("An error occurred while adding the member.");
        }
    };

    const [isAddHealthAssessmentModalOpen, setIsAddHealthAssessmentModalOpen] = useState(false);
    const [isAddConsultationModalOpen, setIsAddConsultationModalOpen] = useState(false);

    const handleAddHealthAssessment = async (assessmentData) => {
        try {
            const response = await axios.post("http://localhost:8081/api/add-health-assessment", assessmentData);

            if (response.status === 201) {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                toast.error("Failed to add consultation.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error("Error adding health assessment:", error);
            toast.error("An error occurred while adding the consultation.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
        });
    }
    };

    const handleAddConsultation = async (consultationData) => {
        console.log("Consultation Data Received:", consultationData); // Debugging
        try {
            const response = await axios.post("http://localhost:8081/api/add-consultation", consultationData);
            if (response.status === 201) {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                toast.error("Failed to add consultation.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error("Error adding consultation:", error);
            toast.error("An error occurred while adding the consultation.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className="mt-2 w-full bg-white p-4 dark:bg-gray-800 dark:text-white">

        <ToastContainer />
            {/* Buttons Section */}
            <div className="mb-6 flex space-x-4">
                {/* Add New Member Button */}
                <button
                    onClick={() => setIsAddMemberModalOpen(true)}
                    className="flex items-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-white shadow-md hover:bg-green-700"
                >
                    <FaUserPlus size={18} />
                    <span>Add New Member</span>
                </button>

                {/* Add Health Assessment Button */}
                <button
                    onClick={() => setIsAddHealthAssessmentModalOpen(true)}
                    className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700"
                >
                    <FaClipboard size={18} />
                    <span>Add Health Assessment</span>
                </button>

                {/* Add Consultation Button */}
                <button
                    onClick={() => setIsAddConsultationModalOpen(true)}
                    className="flex items-center space-x-2 rounded-lg bg-purple-600 px-4 py-2 text-white shadow-md hover:bg-purple-700"
                >
                    <FaStethoscope size={18} />
                    <span>Add Consultation</span>
                </button>
            </div>

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
                    className="mt-3 rounded-md border p-2 dark:bg-gray-800 dark:text-white"
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

            {/* Add Member Modal */}
            <AddMemberModal
                isOpen={isAddMemberModalOpen}
                onClose={() => setIsAddMemberModalOpen(false)}
                onSave={handleAddMember} // Pass the correct handler
            />

            <AddHealthAssessmentModal
                isOpen={isAddHealthAssessmentModalOpen}
                onClose={() => setIsAddHealthAssessmentModalOpen(false)}
                onSave={handleAddHealthAssessment}
            />

            <AddConsultationModal
                isOpen={isAddConsultationModalOpen}
                onClose={() => setIsAddConsultationModalOpen(false)}
                onSave={handleAddConsultation}
            />

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
