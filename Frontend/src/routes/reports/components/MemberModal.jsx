import React from "react";

const MemberModal = ({ isOpen, onClose, pinNumber }) => {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const calculateAge = (birthdate) => {
        if (!birthdate) return "N/A";
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

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
                    <h2 className="text-2xl font-bold text-gray-800">Member Information</h2>
                </div>

                {/* Basic Information */}
                <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <p className="text-gray-600">
                            <strong>Pin Number:</strong>
                        </p>
                        <p className="text-gray-600">{pinNumber?.PinNumber}</p>

                        <p className="text-gray-600">
                            <strong>Member Type:</strong>
                        </p>
                        <p className="text-gray-600">{pinNumber?.MemberType}</p>

                        <p className="text-gray-600">
                            <strong>Name:</strong>
                        </p>
                        <p className="text-gray-600">
                            {pinNumber?.FirstName} {pinNumber?.MiddleName ? pinNumber?.MiddleName.charAt(0) + "." : ""} {pinNumber?.LastName}{" "}
                            {pinNumber?.SuffixName || ""}
                        </p>

                        <p className="text-gray-600">
                            <strong>Birthdate:</strong>
                        </p>
                        <p className="text-gray-600">{formatDate(pinNumber?.DateofBirth)}</p>

                        <p className="text-gray-600">
                            <strong>Age:</strong>
                        </p>
                        <p className="text-gray-600">{calculateAge(pinNumber?.DateofBirth)}</p>

                        <p className="text-gray-600">
                            <strong>Sex:</strong>
                        </p>
                        <p className="text-gray-600">{pinNumber?.Sex}</p>

                        <p className="text-gray-600">
                            <strong>Registration Date:</strong>
                        </p>
                        <p className="text-gray-600">{formatDate(pinNumber?.RegistrationDate)}</p>
                        <p className="text-gray-600">
                            <strong>Balance:</strong>
                        </p>
                        <p className="text-blue-600">{pinNumber?.Balance}</p>
                    </div>
                </div>

                {/* Consultation and Health Assessment Status */}
                {/* <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-700">Status</h3>
                    <p className="text-gray-600">
                        <strong>Consultation:</strong> <span className="text-green-600">{consultationStatus}</span>
                    </p>
                    <p className="text-gray-600">
                        <strong>Health Assessment:</strong> <span className="text-green-600">{healthAssessmentStatus}</span>
                    </p>
                    <p className="text-gray-600">
                        <strong>Laboratory:</strong> <span className="text-yellow-600">{laboratoryStatus}</span>
                    </p>
                </div> */}

                {/* Medicines */}
                {/* <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-700">Medicines</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                        {medicines.map((medicine, index) => (
                            <li key={index}>{medicine}</li>
                        ))}
                    </ul>
                </div> */}

                {/* Balance */}
                {/* <div className="mb-6">
                    <p className="text-gray-600">
                        <strong>Balance:</strong> <span className="text-blue-600">{pinNumber?.Balance}</span>
                    </p>
                </div> */}

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
