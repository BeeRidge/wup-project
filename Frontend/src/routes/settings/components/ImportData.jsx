import React from "react";
import Swal from "sweetalert2";

const handleImportData = async () => {
    try {
        const { value: file } = await Swal.fire({
            title: "Select XML File",
            input: "file",
            inputAttributes: {
                accept: ".xml",
                "aria-label": "Upload your XML file",
            },
            showCancelButton: true,
        });

        if (!file) {
            Swal.fire("No file selected", "Please select a file to import", "info");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:8081/api/import-xml", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to import data");
        }

        const result = await response.json();
        Swal.fire("Success", result.message, "success");
    } catch (error) {
        console.error("Error importing data:", error);
        Swal.fire("Error", "Failed to import data", "error");
    }
};

export default handleImportData;
