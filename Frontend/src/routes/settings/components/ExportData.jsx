import React from "react";

const handleExportData = async () => {
    try {
        const response = await fetch("http://localhost:8081/api/export-xml", {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to export data");
        }

        // Convert the response to a Blob
        const blob = await response.blob();

        // Create a URL for the Blob and trigger a download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "members.xml"; // Set the file name
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Clean up the URL
    } catch (error) {
        console.error("Error exporting data:", error);
    }
};

export default handleExportData;
