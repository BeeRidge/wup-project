import React, { useState, useEffect } from "react";
import axios from "axios";

const ConsultationModal = ({ isOpen, onClose, consultationNumber }) => {
    const [consultationData, setConsultationData] = useState(null); // Store fetched consultation data
    const [loading, setLoading] = useState(false); // Track loading state
    const [error, setError] = useState(null); // Track errors
    const [currentPage, setCurrentPage] = useState(1); // Track the current step/page

    // Fetch consultation data when the modal is opened
    useEffect(() => {
        const fetchConsultationData = async () => {
            if (!isOpen || !consultationNumber) return;

            console.log("Fetching data for ConsultationNumber:", consultationNumber); // Debugging
            try {
                const response = await axios.get(
                    `http://localhost:8081/api/consultation/${encodeURIComponent(consultationNumber)}`
                );
                console.log("Fetched consultation data:", response.data); // Debugging
                setConsultationData(response.data); // Store the fetched data
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error("Consultation not found.");
                    setError("Consultation not found.");
                } else {
                    console.error("Error fetching consultation data:", error);
                    setError("Failed to fetch consultation data.");
                }
            }
        };

        fetchConsultationData();
    }, [isOpen, consultationNumber]);

    // Reset to the first page when the modal is closed
    useEffect(() => {
        if (!isOpen) {
            setCurrentPage(1);
        }
    }, [isOpen]);

    if (!isOpen) return null; // Don't render the modal if it's not open

    const renderPageContent = () => {
        if (loading) {
            return <p className="text-gray-700 dark:text-white">Loading...</p>;
        }

        if (error) {
            return <p className="text-red-500 dark:text-red-400">{error}</p>;
        }

        if (!consultationData) {
            return <p className="text-gray-700 dark:text-white">No data available.</p>;
        }

        switch (currentPage) {
            case 1:
                return (
                    <>
                        <h3 className="mb-4 text-xl font-semibold text-gray-700 dark:text-white">Subjective / History of Illness</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="font-semibold text-gray-700 dark:text-white">PIN Number:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.PinNumber}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Health Assessment Number:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.HSANumber}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Consultation Number:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.ConNumber}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Consultation Date:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.ConsultationDate}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Chief Complaint:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.ChiefComplaint}</p>
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <h3 className="mb-4 text-xl font-semibold text-gray-700 dark:text-white">Objective Physical Examination</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="font-semibold text-gray-700 dark:text-white">Height:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.Height} cm</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Weight:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.Weight} kg</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Blood Pressure:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.BloodPressure} mmHg</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Heart Rate:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.HeartRate} bpm</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Respiratory Rate:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.RespiratoryRate} bpm</p>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <h3 className="mb-4 text-xl font-semibold text-gray-700 dark:text-white">Pertinent Findings</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="font-semibold text-gray-700 dark:text-white">HEENT:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.HEENT}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Chest/Breast/Lungs:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.ChestBreastLungs}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Heart:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.Heart}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Abdomen:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.Abdomen}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Genitourinary:</p>
                            <p className="text-gray-600 dark:text-white">{consultationData.Genitourinary}</p>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, 3)); // Adjust the number of steps as needed
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
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
                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Consultation Details</h2>
                </div>

                <div>{renderPageContent()}</div>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                    {/* Previous Button */}
                    <button
                        onClick={handlePreviousPage}
                        className="w-32 rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {/* Conditionally Render Next or Close Button */}
                    {currentPage < 3 ? ( // Replace 3 with the max number of steps
                        <button
                            onClick={handleNextPage}
                            className="w-32 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="w-32 rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                        >
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConsultationModal;