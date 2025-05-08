import { useState, useEffect } from "react";
import axios from "axios";
import { Download, FileText } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Navigate, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import MemberModal from "./components/MemberModal";
import ConsultationNumber from "./components/ConsultationModal";
import HealthAssessmentModal from "./components/HealthAssessmentModal";



const ReportPage = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const checkupOptions = [
        "All",
        "None",
        "Allergy",
        "Asthma",
        "Cancer",
        "Cerebrovascular Disease",
        "Coronary Artery Disease",
        "Diabetes Mellitus",
        "Emphysema",
        "Epilepsy/Seizure Disorder",
        "Hepatitis",
        "Hyperlipidemia",
        "Hypertension",
        "Peptic Ulcer",
        "Pneumonia",
        "Thyroid Disease",
        "Pulmonary Tuberculosis",
        "Extrapulmonary Tuberculosis",
        "Urinary Tract Infection",
        "Mental Illness",
        "Others",
    ];

    const [patientData, setPatientData] = useState([]);
    const [selectedCheckup, setSelectedCheckup] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    /* Pin Number */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPinNumber, setSelectedPinNumber] = useState(null);
    const openModal = (patient) => {
        setSelectedPinNumber(patient);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPinNumber(null);
    };
    /* end */

    /* health */
    const [isModalOpenHealthAssessment, setIsModalOpenHealthAssessment] = useState(false);
    const [selectedHealthAssessment, setSelectedHealthAssessment] = useState(null);

    const openModalHealthAssessment = (patient) => {
        setSelectedHealthAssessment(patient.HSANumber); // Pass only the HSANumber
        setIsModalOpenHealthAssessment(true);
    };

    const closeModalHealthAssessment = () => {
        setIsModalOpenHealthAssessment(false);
        setSelectedHealthAssessment(null);
    };
    /* end */

    /* Consultation Modal */
    const [isModalOpenConsultation, setIsModalOpenConsultation] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState(null);

    const openModalConsultation = (patient) => {
        setSelectedConsultation(patient.HSANumber);
        setIsModalOpenConsultation(true);
    };

    const closeModalConsultation = () => {
        setIsModalOpenConsultation(false);
        setSelectedConsultation(null);
    };
    /* end */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/reports");
                setPatientData(response.data);
            } catch (error) {
                console.error("Error fetching diagnosed conditions:", error);
            }
        };
        fetchData();
    }, []);

    const filteredPatients = patientData.filter((patient) => {
        return (
            (selectedCheckup === "All" || (patient.AssessmentDiagnosis || "").toLowerCase() === selectedCheckup.toLowerCase()) &&
            (patient.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.PinNumber.includes(searchTerm))
        );
    });

    const totalPages = Math.ceil(filteredPatients.length / recordsPerPage);
    const indexOfLastItem = currentPage * recordsPerPage;
    const indexOfFirstItem = indexOfLastItem - recordsPerPage;

    const currentRecords = filteredPatients.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    };

    const exportToPDF = async () => {
        const { value: dateRange } = await Swal.fire({
            title: "Select Date Range",
            html: `
            <label>Start Date:</label>
            <input type="date" id="startDate" class="swal2-input">
            <label>End Date:</label>
            <input type="date" id="endDate" class="swal2-input">
        `,
            showCancelButton: true,
            confirmButtonText: "Export",
            preConfirm: () => {
                return {
                    startDate: document.getElementById("startDate").value,
                    endDate: document.getElementById("endDate").value,
                };
            },
        });

        if (!dateRange || !dateRange.startDate || !dateRange.endDate) return;

        const { startDate, endDate } = dateRange;
        const filteredData = filteredPatients.filter((patient) => {
            const patientDate = new Date(patient.DATE_ADDED);
            return patientDate >= new Date(startDate) && patientDate <= new Date(endDate);
        });

        if (filteredData.length === 0) {
            Swal.fire("No Records", "No data found in the selected date range.", "warning");
            return;
        }

        const doc = new jsPDF();
        doc.text("Patient Report", 14, 10);
        doc.text(`From: ${startDate} To: ${endDate}`, 14, 20);

        // Ensure autoTable is initialized
        if (typeof doc.autoTable !== "function") {
            console.error("autoTable function is not available!");
            return;
        }

        doc.autoTable({
            startY: 30,
            head: [["Pin Number", "Consultaion Number", "Disease Type", "Date", "Member Type", "Full Name"]],
            body: filteredData.map((patient) => [
                patient.PinNumber,
                patient.ConNumber,
                patient.AssessmentDiagnosis,
                patient.MemberType,
                `${patient.FirstName} ${patient.MiddleName ? patient.MiddleName.charAt(0) + "." : ""} ${patient.LastName} ${patient.SuffixName || ""}`.trim(),
                formatDate(patient.ConsultationDate),
            ]),
        });

        doc.save(`patient_report_${startDate}_to_${endDate}.pdf`);
    };
    return (
        <div>
            <div className="w-full space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold dark:text-white">Reports & Analytics</h1>
                    <div className="flex gap-3">
                        <button
                            className="flex items-center gap-2 rounded-lg border bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
                            onClick={exportToPDF}
                        >
                            <FileText size={18} /> Export PDF
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4">
                    <select
                        className="rounded-lg border bg-white px-4 py-2 text-gray-800 dark:bg-gray-800 dark:text-white"
                        value={selectedCheckup}
                        onChange={(e) => setSelectedCheckup(e.target.value)}
                    >
                        {checkupOptions.map((option) => (
                            <option
                                key={option}
                                value={option}
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Search by Name or Accre No."
                        className="w-64 rounded-lg border bg-white px-4 py-2 text-gray-800 dark:bg-gray-800 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-left text-gray-800 dark:border-gray-700 dark:text-white">
                        <thead className="bg-gray-200 dark:bg-gray-700">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Pin No.</th>
                                <th className="border border-gray-300 px-4 py-2">Health Assessment No.</th>
                                <th className="border border-gray-300 px-4 py-2">Consultation No.</th>
                                <th className="border border-gray-300 px-4 py-2">Disease Type</th>
                                <th className="border border-gray-300 px-4 py-2">Member Type</th>
                                <th className="border border-gray-300 px-4 py-2">Full Name</th>
                                <th className="border border-gray-300 px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.length > 0 ? (
                                currentRecords.map((patient, index) => (
                                    <tr
                                        key={`${patient.id}-${index}`}
                                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {/* Clickable Accreditation Number */}
                                        <td
                                            className="cursor-pointer border border-gray-300 px-4 py-2 text-blue-500 hover:underline"
                                            onClick={() => openModal(patient)}
                                        >
                                            {patient.PinNumber}
                                        </td>
                                        <td
                                            className="cursor-pointer border border-gray-300 px-4 py-2 text-blue-500 hover:underline"
                                            onClick={() => openModalHealthAssessment(patient)}
                                        >
                                            {patient.HSANumber}
                                        </td>
                                        <td
                                            className="cursor-pointer border border-gray-300 px-4 py-2 text-blue-500 hover:underline"
                                            onClick={() => openModalConsultation(patient)}
                                        >
                                            {patient.ConNumber}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{patient.AssessmentDiagnosis}</td>
                                        <td className="border border-gray-300 px-4 py-2">{patient.MemberType}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {`${patient.FirstName} ${patient.MiddleName ? patient.MiddleName.charAt(0) + "." : ""} ${patient.LastName} ${patient.SuffixName || ""}`.trim()}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{formatDate(patient.ConsultationDate)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="border border-gray-300 px-4 py-2 text-center text-gray-400"
                                    >
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <MemberModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    pinNumber={selectedPinNumber}
                />
                <HealthAssessmentModal
                    isOpen={isModalOpenHealthAssessment}
                    onClose={closeModalHealthAssessment}
                    HealthAssessmentNumber={selectedHealthAssessment} // Correct prop name
                />

                <ConsultationNumber
                    isOpen={isModalOpenConsultation}
                    onClose={closeModalConsultation}
                    consultationNumber={selectedConsultation}
                />

                {/* Pagination */}

                <div className="flex items-center justify-between pt-4 dark:text-white">
                    <p>
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredPatients.length)} of {filteredPatients.length} entries
                    </p>
                    <div className="flex items-center space-x-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className={`rounded-lg border px-4 py-2 ${
                                currentPage === 1 ? "cursor-not-allowed bg-gray-300 text-gray-600" : "bg-green-800 text-white hover:bg-gray-600"
                            }`}
                        >
                            Previous
                        </button>

                        <span className="text-gray-800 dark:text-white">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className={`rounded-lg border px-4 py-2 ${
                                currentPage === totalPages
                                    ? "cursor-not-allowed bg-gray-300 text-gray-600"
                                    : "bg-gray-700 text-white hover:bg-gray-600"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            {/* 
            <div className="mt-5 w-full rounded-lg bg-white p-6 shadow-lg">
                <h1 className="mb-4 text-start text-2xl font-bold text-gray-900">Member Balance Table</h1>
                <MemberTable members={MemberBalance} />
            </div> */}
        </div>
    );
};

export default ReportPage;
