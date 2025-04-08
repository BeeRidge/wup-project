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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 dark:text-white">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                    X
                </button>

                {/* Modal Header */}
                <div className="mb-6 border-b pb-4 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Member Information</h2>
                </div>

                {/* Basic Information */}
                <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Pin Number:</strong>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">{pinNumber?.PinNumber}</p>

                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Member Type:</strong>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">{pinNumber?.MemberType}</p>

                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Name:</strong>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            {pinNumber?.FirstName} {pinNumber?.MiddleName ? pinNumber?.MiddleName.charAt(0) + "." : ""} {pinNumber?.LastName}{" "}
                            {pinNumber?.SuffixName || ""}
                        </p>

                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Birthdate:</strong>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">{formatDate(pinNumber?.DateofBirth)}</p>

                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Age:</strong>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">{calculateAge(pinNumber?.DateofBirth)}</p>

                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Sex:</strong>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">{pinNumber?.Sex}</p>

                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Registration Date:</strong>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">{formatDate(pinNumber?.RegistrationDate)}</p>
                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Balance:</strong>
                        </p>
                        <p className="text-blue-600 dark:text-blue-400">{pinNumber?.Balance}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberModal;
