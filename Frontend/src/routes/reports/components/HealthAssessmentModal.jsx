import React, { useState, useEffect } from "react";

const HealthAssessmentModal = ({ isOpen, onClose, HealthAssessmentNumber }) => {
    const [currentPage, setCurrentPage] = useState(1); // Track the current page

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const getYear = (dateString) => {
        return new Date(dateString).getFullYear(); // Extract only the year
    };

    // Ensure case-insensitive comparison for "Female"
    const isFemale = HealthAssessmentNumber?.Sex?.toLowerCase() === "female";

    // Reset to the first page when the modal is closed
    useEffect(() => {
        if (!isOpen) {
            setCurrentPage(1);
        }
    }, [isOpen]);

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
        "Visual Acuity: 20/20",
        "Blood Type: O+",
        "Height: 170 cm",
        "Weight: 70 kg",
        "BMI: 24.2",
        "Temperature: 36.7°C",
    ];
    const pertinentFindings = [
        "A. HEENT: Essentially Normal",
        "B. Chest/Breast/Lungs: Essentially Normal",
        "C. Heart: Essentially Normal",
        "D. Abdomen: Essentially Normal",
        "E. Genitourinary: Essentially Normal",
        "F. Digital Rectal: Essentially Normal",
        "G. Skin/Extremities: Essentially Normal",
        "H. Neurological: Essentially Normal",
    ];
    const immunizationsList = [
        { group: "For Children", vaccines: ["Measles", "Mumps", "Rubella (MMR)", "Polio Vaccine"] },
        { group: "For Adult", vaccines: ["Influenza Vaccine", "Hepatitis B Vaccine"] },
        { group: "For Pregnant Woman", vaccines: ["Tetanus Toxoid", "Influenza Vaccine"], condition: isFemale },
        { group: "For Elderly and Immunocompromised", vaccines: ["Pneumococcal Vaccine", "Shingles Vaccine"] },
    ];

    const renderPageContent = () => {
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
                            <p className="text-gray-600 dark:text-white">{HealthAssessmentNumber?.HSANumber}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Member Type:</p>
                            <p className="text-gray-600 dark:text-white">{HealthAssessmentNumber?.MemberType}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Patient Name:</p>
                            <p className="text-gray-600 dark:text-white">
                                {HealthAssessmentNumber?.FirstName}{" "}
                                {HealthAssessmentNumber?.MiddleName ? HealthAssessmentNumber?.MiddleName.charAt(0) + "." : ""}{" "}
                                {HealthAssessmentNumber?.LastName} {HealthAssessmentNumber?.SuffixName || ""}
                            </p>
                            <p className="font-semibold text-gray-700 dark:text-white">Sex:</p>
                            <p className="text-gray-600 dark:text-white">{HealthAssessmentNumber?.Sex}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Assessment Date:</p>
                            <p className="text-gray-600 dark:text-white">{formatDate(HealthAssessmentNumber?.AssessmentDate)}</p>
                            <p className="font-semibold text-gray-700 dark:text-white">Effective Year:</p>
                            <p className="text-gray-600 dark:text-white">{getYear(HealthAssessmentNumber?.AssessmentDate)}</p>
                        </div>
                    </>
                );
            case 2:
                return (
                    <div className="grid grid-cols-2 gap-8">
                        {/* Left Column: Past Medical History and Past Surgery */}
                        <div>
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
                        </div>

                        {/* Right Column: Family History and Personal Social History */}
                        <div>
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
                        </div>
                    </div>
                );
            case 3:
                return (
                    <>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Immunizations</h3>
                        <div className="grid grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div>
                                {immunizationsList
                                    .filter((item) => item.group === "For Children" || item.group === "For Adult")
                                    .map((item, index) => (
                                        <div
                                            key={index}
                                            className="mb-4"
                                        >
                                            <p className="font-semibold text-gray-700 dark:text-white">{item.group}:</p>
                                            <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                                                {item.vaccines.map((vaccine, idx) => (
                                                    <li key={idx}>{vaccine}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                            </div>
                            {/* Right Column */}
                            <div>
                                {immunizationsList
                                    .filter((item) => item.group === "For Pregnant Woman" || item.group === "For Elderly and Immunocompromised")
                                    .map((item, index) => (
                                        <div
                                            key={index}
                                            className="mb-4"
                                        >
                                            <p className="font-semibold text-gray-700 dark:text-white">{item.group}:</p>
                                            <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                                                {item.vaccines.map((vaccine, idx) => (
                                                    <li key={idx}>{vaccine}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <>
                            <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Family Planning</h3>
                            <p className="text-gray-600 dark:text-white">{familyPlanning}</p>
                            <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Menstrual History</h3>
                            <p className="text-gray-600">{menstrualHistory}</p>
                            <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Pregnancy History</h3>
                            <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                                {pregnancyHistory.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    </>
                );
            case 5:
                return (
                    <>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Pertinent Physical Examination Findings</h3>
                        <div className="grid grid-cols-2 gap-8">
                            {/* Left Column */}
                            <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                                {physicalExaminationFindings.slice(0, Math.ceil(physicalExaminationFindings.length / 2)).map((item, index) => (
                                    <li key={index}>
                                        <strong>{item.split(":")[0]}:</strong> {item.split(":")[1]}
                                    </li>
                                ))}
                            </ul>
                            {/* Right Column */}
                            <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                                {physicalExaminationFindings.slice(Math.ceil(physicalExaminationFindings.length / 2)).map((item, index) => (
                                    <li key={index}>
                                        <strong>{item.split(":")[0]}:</strong> {item.split(":")[1]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-700 dark:text-white">Pertinent Findings Per System</h3>
                        <div className="grid grid-cols-2 gap-8">
                            {/* Left Column */}
                            <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                                {pertinentFindings.slice(0, Math.ceil(pertinentFindings.length / 2)).map((item, index) => (
                                    <li key={index}>
                                        <strong>{item.split(":")[0]}:</strong> {item.split(":")[1]}
                                    </li>
                                ))}
                            </ul>
                            {/* Right Column */}
                            <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                                {pertinentFindings.slice(Math.ceil(pertinentFindings.length / 2)).map((item, index) => (
                                    <li key={index}>
                                        <strong>{item.split(":")[0]}:</strong> {item.split(":")[1]}
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                    X
                </button>

                {/* Modal Header */}
                <div className="mb-6 border-b pb-4">
                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Health Assessment</h2>
                </div>

                {/* Page Content */}
                <div>{renderPageContent()}</div>

                {/* Pagination Controls */}
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
