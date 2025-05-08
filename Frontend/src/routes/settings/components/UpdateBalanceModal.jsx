import React, { useState } from "react";
import axios from "axios";

const UpdateBalanceModal = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleUpdateBalances = async () => {
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await axios.post("http://localhost:8081/api/update-all-balances");
            setSuccessMessage(response.data.message);
        } catch (error) {
            console.error("Error updating balances:", error);
            setErrorMessage("Failed to update balances. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:text-white">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">Update Member Balances</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                    This will compute and update the balances for all users based on their membership type and activities.
                </p>

                {loading && <p className="mb-4 text-gray-500">Updating balances...</p>}
                {successMessage && <p className="mb-4 text-green-500">{successMessage}</p>}
                {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateBalances}
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        disabled={loading}
                    >
                        Update Balances
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateBalanceModal;