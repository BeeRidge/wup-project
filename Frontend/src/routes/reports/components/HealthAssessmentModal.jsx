import React, { useState, useEffect } from "react";
import axios from "axios";

const HealthAssessmentModal = ({ isOpen, onClose, HealthAssessmentNumber }) => {
    const [data, setData] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(false); // State to track loading
    const [error, setError] = useState(null); // State to track errors
    const [currentPage, setCurrentPage] = useState(1); // Track the current page

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const getYear = (dateString) => {
        return new Date(dateString).getFullYear(); // Extract only the year
    };

    // Fetch data when the modal is opened
    useEffect(() => {
        const fetchData = async () => {
            if (!isOpen || !HealthAssessmentNumber) return;

            console.log("Fetching data for HealthAssessmentNumber:", HealthAssessmentNumber); // Debugging
            try {
                const response = await axios.get(
                    `http://localhost:8081/api/health-assessment/${encodeURIComponent(HealthAssessmentNumber)}`
                );
                console.log("Fetched health assessment data:", response.data); // Debugging
                setData(response.data); // Store the fetched data
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error("Health assessment not found.");
                    setError("Health assessment not found.");
                } else {
                    console.error("Error fetching health assessment data:", error);
                    setError("Failed to fetch health assessment data.");
                }
            }
        };

        fetchData();
    }, [isOpen, HealthAssessmentNumber]);

    // Reset to the first page when the modal is closed
    useEffect(() => {
        if (!isOpen) {
            setCurrentPage(1);
        }
    }, [isOpen]);

    if (!isOpen) return null; // Don't render the modal if it's not open

    const isFemale = data?.Sex?.toLowerCase() === "female"; // Ensure case-insensitive comparison for "Female"

    const renderPageContent = () => {
        if (loading) {
            return <p className="text-gray-700 dark:text-white">Loading...</p>;
        }

        if (error) {
            return <p className="text-red-500 dark:text-red-400">{error}</p>;
        }

        if (!data) {
            return <p className="text-gray-700 dark:text-white">No data available.</p>;
        }

        switch (currentPage) {
            case 1:
                return (
                    <>
                        <h3 className="mb-4 text-xl font-semibold text-gray-700 dark:text-white">Client Profile</h3>
                        <p className="font-semibold text-gray-700 dark:text-white">
                            Walk-in clients without ATC
                            <p className="text-gray-400 dark:text-white">(Authorization Transaction Code)</p>
                        </p>
                        <br />
                        <div className="grid grid-cols-2 gap-4">
                            <p className="font-semibold text-gray-700 dark:text-white">Health Assessment Number:</p>
                            <p className="text-gray-600 dark:text-white">{data?.HSANumber}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Member Type:</p>
                            <p className="text-gray-600 dark:text-white">{data?.MemberType}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Patient Name:</p>
                            <p className="text-gray-600 dark:text-white">
                                {data?.FirstName}{" "}
                                {data?.MiddleName ? data?.MiddleName.charAt(0) + "." : ""}{" "}
                                {data?.LastName} {data?.SuffixName || ""}
                            </p>
                            <p className="font-semibold text-gray-700 dark:text-white">Sex:</p>
                            <p className="text-gray-600 dark:text-white">{data?.Sex}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Assessment Date:</p>
                            <p className="text-gray-600 dark:text-white">{formatDate(data?.AssessmentDate)}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Effective Year:</p>
                            <p className="text-gray-600 dark:text-white">{getYear(data?.AssessmentDate)}</p>
                        </div>
                    </>
                );
            case 2:
                return (
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Past Medical History</h3>
                            <p className="text-gray-600 dark:text-white">{data?.PastMedicalHistory || "No data available"}</p>
                            <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Past Surgery</h3>
                            <p className="text-gray-600 dark:text-white">{data?.PastSurgery || "No data available"}</p>
                        </div>
                        <div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Family History</h3>
                            <p className="text-gray-600 dark:text-white">{data?.FamilyHistory || "No data available"}</p>
                            <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Personal Social History</h3>
                            <p className="text-gray-600 dark:text-white">{data?.PersonalSocialHistory || "No data available"}</p>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Immunizations</h3>
                        <p className="text-gray-600 dark:text-white">{data?.Immunizations || "No data available"}</p>
                    </>
                );
            case 4:
                return (
                    <>
                        <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Family Planning</h3>
                        <p className="text-gray-600 dark:text-white">{data?.FamilyPlanning || "No data available"}</p>
                        <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Menstrual History</h3>
                        <p className="text-gray-600 dark:text-white">{data?.MenstrualHistory || "No data available"}</p>
                        <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Pregnancy History</h3>
                        <p className="text-gray-600 dark:text-white">{data?.PregnancyHistory || "No data available"}</p>
                    </>
                );
            case 5:
                return (
                    <>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Physical Examination Findings</h3>
                        <p className="text-gray-600 dark:text-white">{data?.PhysicalExaminationFindings || "No data available"}</p>
                        <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Pertinent Findings</h3>
                        <p className="text-gray-600 dark:text-white">{data?.PertinentFindings || "No data available"}</p>
                    </>
                );
            default:
                return null;
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => {
            if (prev === 3 && !isFemale) return 5; // Skip case 4 if not female
            return Math.min(prev + 1, 5);
        });
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => {
            if (prev === 5 && !isFemale) return 3; // Skip case 4 if not female
            return Math.max(prev - 1, 1);
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative h-[65vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800 dark:text-white">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                    X
                </button>

                <div className="mb-6 border-b pb-4">
                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Health Assessment</h2>
                </div>

                <div>{renderPageContent()}</div>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                    <button
                        onClick={handlePreviousPage}
                        className="w-32 rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        className="w-32 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        disabled={currentPage === 5}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HealthAssessmentModal;