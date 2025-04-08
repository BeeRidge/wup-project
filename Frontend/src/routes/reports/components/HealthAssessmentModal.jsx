import React, { useState } from "react";

const HealthAssessmentModal = ({ isOpen, onClose, HealthAssessmentNumber }) => {
    const [currentPage, setCurrentPage] = useState(1); // Track the current page

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    if (!isOpen) return null; // Don't render the modal if it's not open

    // Static data for now (replace with dynamic data later)
    const pastMedicalHistory = ["Hypertension", "Diabetes"];
    const pastSurgery = ["Appendectomy (2015)", "Gallbladder Removal (2018)"];
    const familyHistory = ["Father: Hypertension", "Mother: Diabetes"];
    const personalSocialHistory = ["Non-smoker", "Occasional alcohol consumption"];
    const immunizations = ["COVID-19 Vaccine (2021)", "Tetanus Booster (2020)"];
    const familyPlanning = "Using oral contraceptives"; // Static for now
    const menstrualHistory = "Regular cycles, 28 days"; // Static for now
    const pregnancyHistory = ["1 pregnancy, 1 live birth"]; // Static for now
    const physicalExaminationFindings = [
        "Blood Pressure: 120/80 mmHg",
        "Heart Rate: 72 bpm",
        "Respiratory Rate: 16 breaths/min",
        "No abnormal findings on chest auscultation",
    ];

    const renderPageContent = () => {
        switch (currentPage) {
            case 1:
                return (
                    <>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Basic Information</h3>
                        <p className="text-gray-600 dark:text-white">
                            <strong>Health Assessment Number:</strong> {HealthAssessmentNumber?.HSANumber}
                        </p>
                        <p className="text-gray-600 dark:text-white">
                            <strong>Patient Name:</strong> {HealthAssessmentNumber?.FirstName} {HealthAssessmentNumber?.LastName}
                        </p>
                        <p className="text-gray-600 dark:text-white">
                            <strong>Gender:</strong> {HealthAssessmentNumber?.Gender}
                        </p>
                        <p className="text-gray-600 dark:text-white">
                            <strong>Disease Type:</strong> {HealthAssessmentNumber?.AssessmentDiagnosis}
                        </p>
                        <p className="text-gray-600 dark:text-white">
                            <strong>Assessment Date:</strong> {formatDate(HealthAssessmentNumber?.AssessmentDate)}
                        </p>
                    </>
                );
            case 2:
                return (
                    <>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Past Medical History</h3>
                        <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                            {pastMedicalHistory.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Past Surgery</h3>
                        <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                            {pastSurgery.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </>
                );
            case 3:
                return (
                    <>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Family History</h3>
                        <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                            {familyHistory.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Personal Social History</h3>
                        <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                            {personalSocialHistory.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </>
                );
            case 4:
                return (
                    <>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Immunizations</h3>
                        <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                            {immunizations.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Family Planning</h3>
                        <p className="text-gray-600 dark:text-white">{familyPlanning}</p>
                        {HealthAssessmentNumber?.Gender === "Female" && (
                            <>
                                <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Menstrual History</h3>
                                <p className="text-gray-600">{menstrualHistory}</p>
                                <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Pregnancy History</h3>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                                    {pregnancyHistory.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </>
                );
            case 5:
                return (
                    <>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Pertinent Physical Examination Findings</h3>
                        <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                            {physicalExaminationFindings.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative h-[80vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800 dark:text-white">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                    X
                </button>

                {/* Modal Header */}
                <div className="mb-6 border-b pb-4">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Health Assessment</h2>
                </div>

                {/* Page Content */}
                <div>{renderPageContent()}</div>

                {/* Pagination Controls */}
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 5))}
                        className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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
