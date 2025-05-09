import React, { useState, useEffect } from "react";
import axios from "axios";

const TrancheValues = () => {
    const [trancheData, setTrancheData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrancheValues = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/tranche-values");
                setTrancheData(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching tranche values:", err);
                setError("Failed to fetch tranche values.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrancheValues();
    }, []);

    if (loading) {
        return <p className="text-gray-500">Loading tranche values...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* First Tranche */}
            <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">First Tranche</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Members: {trancheData.firstTranche.count}
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ₱{trancheData.firstTranche.value.toLocaleString()}
                </p>
            </div>

            {/* Second Tranche */}
            <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Second Tranche</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Members: {trancheData.secondTranche.count}
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ₱{trancheData.secondTranche.value.toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default TrancheValues;