import React, { useState } from "react";

const TranchesModal = ({ isOpen, onClose }) => {
    const [balanceValue, setBalanceValue] = useState("");

    const handleSave = async () => {
        if (!balanceValue || isNaN(balanceValue)) {
            alert("Please enter a valid numeric value for the balance.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8081/api/update-nonmember-balances", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    balanceValue: parseFloat(balanceValue),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
                return;
            }

            const data = await response.json();
            alert(`Non-member balances updated successfully! Rows affected: ${data.affectedRows}`);
            onClose(); // Close the modal after saving
        } catch (error) {
            console.error("Error updating non-member balances:", error);
            alert("An error occurred while updating non-member balances.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-96 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                    Update Non-Member Balances
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-white">
                            Enter New Balance Value
                        </label>
                        <input
                            type="number"
                            value={balanceValue}
                            onChange={(e) => setBalanceValue(e.target.value)}
                            className="w-full rounded-lg border-gray-300 p-2 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter balance value (e.g., 1700)"
                        />
                    </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TranchesModal;