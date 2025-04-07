import React from "react";

const MemberModal = ({ isOpen, onClose, pinNumber }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open

    // Static data for consultation, health assessment, laboratory, and medicines
    const consultationStatus = "Done"; // Static for now
    const healthAssessmentStatus = "Done"; // Static for now
    const laboratoryStatus = "Pending"; // Static for now
    const medicines = ["Paracetamol", "Ibuprofen", "Amoxicillin"]; // Static for now
    const balance = "₱1,500.00"; // Static for now

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                {/* Modal Header */}
                <div className="mb-6 border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Member Details</h2>
                </div>

                {/* Basic Information */}
                <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-700">Basic Information</h3>
                    <p className="text-gray-600"><strong>Pin Number:</strong> {pinNumber?.PinNumber}</p>
                    <p className="text-gray-600"><strong>Name:</strong> {pinNumber?.FirstName} {pinNumber?.LastName}</p>
                    <p className="text-gray-600"><strong>Member Type:</strong> {pinNumber?.MemberType}</p>
                </div>

                {/* Consultation and Health Assessment Status */}
                <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-700">Status</h3>
                    <p className="text-gray-600"><strong>Consultation:</strong> <span className="text-green-600">{consultationStatus}</span></p>
                    <p className="text-gray-600"><strong>Health Assessment:</strong> <span className="text-green-600">{healthAssessmentStatus}</span></p>
                    <p className="text-gray-600"><strong>Laboratory:</strong> <span className="text-yellow-600">{laboratoryStatus}</span></p>
                </div>

                {/* Medicines */}
                <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-700">Medicines</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                        {medicines.map((medicine, index) => (
                            <li key={index}>{medicine}</li>
                        ))}
                    </ul>
                </div>

                {/* Balance */}
                <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-700">Balance</h3>
                    <p className="text-gray-600"><strong>Balance:</strong> <span className="text-blue-600">{balance}</span></p>
                </div>

                {/* Close Button */}
                <div className="flex justify-end">
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

export default MemberModal;