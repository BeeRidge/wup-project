import React from "react";

const ConsultationModal = ({ isOpen, onClose, consultationNumber }) => {
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-5xl h-[80vh] overflow-y-auto rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800 dark:text-white">
                {/* Modal Header */}
                <div className="mb-6 border-b pb-4">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Health Assesment</h2>
                </div>

                {/* 3-Column Layout */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Column 1 */}
                    <div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Basic Information</h3>
                        <p className="text-gray-600 dark:text-white"><strong>Consultation Number:</strong> {consultationNumber?.ConNumber}</p>
                        <p className="text-gray-600 dark:text-white"><strong>Pin Number:</strong> {consultationNumber?.PinNumber}</p>
                        <p className="text-gray-600 dark:text-white"><strong>Patient Name:</strong> {consultationNumber?.FirstName} {consultationNumber?.LastName}</p>
                        <p className="text-gray-600 dark:text-white"><strong>Gender:</strong> {consultationNumber?.Gender}</p>
                        <p className="text-gray-600 dark:text-white"><strong>Disease Type:</strong> {consultationNumber?.AssessmentDiagnosis}</p>
                        <p className="text-gray-600 dark:text-white"><strong>Consultation Date:</strong> {consultationNumber?.ConsultationDate}</p>

                        <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-700 dark:text-white">Past Medical History</h3>
                        <ul className="list-disc pl-5 text-gray-600  dark:text-white">
                            {pastMedicalHistory.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Past Surgery</h3>
                        <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                            {pastSurgery.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-700 dark:text-white">Family History</h3>
                        <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                            {familyHistory.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-700 dark:text-white">Personal Social History</h3>
                        <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                            {personalSocialHistory.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">Immunizations</h3>
                        <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                            {immunizations.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-700 dark:text-white">Family Planning</h3>
                        <p className="text-gray-600  dark:text-white">{familyPlanning}</p>

                        {/* Conditional Rendering for Female Patients */}
                        {consultationNumber?.Gender === "Female" && (
                            <>
                                <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-700 dark:text-white">Menstrual History</h3>
                                <p className="text-gray-600">{menstrualHistory}</p>

                                <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-700 dark:text-white">Pregnancy History</h3>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-white">
                                    {pregnancyHistory.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </>
                        )}

                        <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-700 dark:text-white">Pertinent Physical Examination Findings</h3>
                        <ul className="list-disc pl-5 text-gray-600  dark:text-white">
                            {physicalExaminationFindings.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="rounded bg-red-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsultationModal;