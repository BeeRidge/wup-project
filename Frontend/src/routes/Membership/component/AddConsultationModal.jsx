import React, { useState } from "react";

const AddConsultationModal = ({ isOpen, onClose, onSave }) => {
    const [currentStep, setCurrentStep] = useState(1); // Track the current step
    const [formData, setFormData] = useState({
        PinNumber: "",
        ConsultationNumber: "",
        ConsultationDate: "",
        ChiefComplaint: "",
        physicalExam: {
            BloodPressure: "",
            HeartRate: "",
            RespiratoryRate: "",
            VisualAcuityLeftEye: "",
            VisualAcuityRightEye: "",
            Height: "",
            Weight: "",
            BMI: "",
            Temperature: "",
            HSANumber: "",
        },
        PertinentFindings: {
            HEENT: "",
            ChestBreastLungs: "",
            Heart: "",
            Abdomen: "",
            Genitourinary: "",
            RectalExam: "",
            ExtremitiesSkin: "",
            NeurologicalExam: "",
        },
        AssessmentDiagnosis: "",
        Laboratory: "",
    });

    const handleNext = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const handlePrev = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNestedChange = (section, name, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value,
            },
        }));
    };

    // Function to calculate BMI
    const calculateBMI = () => {
        const heightInMeters = parseFloat(formData.physicalExam.Height) / 100; // Convert height to meters
        const weightInKg = parseFloat(formData.physicalExam.Weight);

        if (!heightInMeters || !weightInKg || heightInMeters <= 0 || weightInKg <= 0) {
            alert("Please enter valid height and weight values.");
            return;
        }

        const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2); // Calculate BMI
        handleNestedChange("physicalExam", "BMI", bmi); // Update BMI field
    };

    const handleSubmit = () => {
        onSave(formData); // Pass the collected data to the parent component
        onClose(); // Close the modal
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:text-white">
                {/* Modal Header */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add Consultation</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                {/* Step 1: Subjective/History of Illness */}
                {currentStep === 1 && (
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Subjective / History of Illness</h3>

                        {/* PIN Number */}
                        <div className="mb-4">
                            <label className="mb-2 block font-medium text-gray-600 dark:text-gray-400">PIN Number</label>
                            <input
                                type="text"
                                name="PinNumber"
                                value={formData.PinNumber}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block font-medium text-gray-600 dark:text-gray-400">Health Assessment Number</label>
                            <input
                                type="text"
                                name="HSANumber"
                                value={formData.HSANumber}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Consultation Number */}
                        <div className="mb-4">
                            <label className="mb-2 block font-medium text-gray-600 dark:text-gray-400">Consultation Number</label>
                            <input
                                type="text"
                                name="ConsultationNumber"
                                value={formData.ConsultationNumber}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Consultation Date */}
                        <div className="mb-4">
                            <label className="mb-2 block font-medium text-gray-600 dark:text-gray-400">Consultation Date</label>
                            <input
                                type="date"
                                name="ConsultationDate"
                                value={formData.ConsultationDate}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Chief Complaint */}
                        <label className="mb-2 block font-medium text-gray-600 dark:text-gray-400">Chief Complaint</label>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Select the patient's primary complaint or symptom.</p>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="ChiefComplaint"
                                    value="Abdominal pain"
                                    checked={formData.ChiefComplaint === "Abdominal pain"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Abdominal pain
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="ChiefComplaint"
                                    value="Anorexia"
                                    checked={formData.ChiefComplaint === "Anorexia"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Anorexia
                            </label>
                            {/* Add more radio options as needed */}
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Objective Physical Examination</h3>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Enter the patient's vital signs and physical measurements.</p>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Height */}
                            <div>
                                <label className="mb-1 block font-medium text-gray-600 dark:text-gray-400">Height (cm)</label>
                                <input
                                    type="text"
                                    name="Height"
                                    value={formData.physicalExam.Height}
                                    onChange={(e) => handleNestedChange("physicalExam", "Height", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            {/* Weight */}
                            <div>
                                <label className="mb-1 block font-medium text-gray-600 dark:text-gray-400">Weight (kg)</label>
                                <input
                                    type="text"
                                    name="Weight"
                                    value={formData.physicalExam.Weight}
                                    onChange={(e) => handleNestedChange("physicalExam", "Weight", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            {/* Blood Pressure */}
                            <div>
                                <label className="mb-1 block font-medium text-gray-600 dark:text-gray-400">Blood Pressure (mmHg)</label>
                                <input
                                    type="text"
                                    name="BloodPressure"
                                    value={formData.physicalExam.BloodPressure}
                                    onChange={(e) => handleNestedChange("physicalExam", "BloodPressure", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            {/* Heart Rate */}
                            <div>
                                <label className="mb-1 block font-medium text-gray-600 dark:text-gray-400">Heart Rate (min)</label>
                                <input
                                    type="text"
                                    name="HeartRate"
                                    value={formData.physicalExam.HeartRate}
                                    onChange={(e) => handleNestedChange("physicalExam", "HeartRate", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            {/* Respiratory Rate */}
                            <div>
                                <label className="mb-1 block font-medium text-gray-600 dark:text-gray-400">Respiratory Rate (min)</label>
                                <input
                                    type="text"
                                    name="RespiratoryRate"
                                    value={formData.physicalExam.RespiratoryRate}
                                    onChange={(e) => handleNestedChange("physicalExam", "RespiratoryRate", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            {/* Temperature */}
                            <div>
                                <label className="mb-1 block font-medium text-gray-600 dark:text-gray-400">Temperature (°C)</label>
                                <input
                                    type="text"
                                    name="Temperature"
                                    value={formData.physicalExam.Temperature}
                                    onChange={(e) => handleNestedChange("physicalExam", "Temperature", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            {/* BMI */}
                            <div>
                                <label className="mb-1 block font-medium text-gray-600 dark:text-gray-400">BMI</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        name="BMI"
                                        readOnly
                                        value={formData.physicalExam.BMI}
                                        className="w-full rounded border border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={calculateBMI}
                                        className="shrink-0 rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
                                    >
                                        Get BMI
                                    </button>
                                </div>
                            </div>

                            {/* Visual Acuity */}
                            <div>
                                <label className="mb-1 block font-medium text-gray-600 dark:text-gray-400">Visual Acuity</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="VisualAcuityLeftEye"
                                        placeholder="Left Eye"
                                        value={formData.physicalExam.VisualAcuityLeftEye}
                                        onChange={(e) => handleNestedChange("physicalExam", "VisualAcuityLeftEye", e.target.value)}
                                        className="w-1/2 rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    <input
                                        type="text"
                                        name="VisualAcuityRightEye"
                                        placeholder="Right Eye"
                                        value={formData.physicalExam.VisualAcuityRightEye}
                                        onChange={(e) => handleNestedChange("physicalExam", "VisualAcuityRightEye", e.target.value)}
                                        className="w-1/2 rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Pertinent Findings */}
                {currentStep === 3 && (
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Pertinent Findings Per System</h3>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Enter findings for each system based on the examination.</p>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* HEENT */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-600 dark:text-gray-400">HEENT</label>
                                <input
                                    type="text"
                                    name="HEENT"
                                    value={formData.PertinentFindings.HEENT}
                                    onChange={(e) => handleNestedChange("PertinentFindings", "HEENT", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Example: Normal, no abnormalities</p>
                            </div>

                            {/* Chest/Breast/Lungs */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-600 dark:text-gray-400">Chest/Breast/Lungs</label>
                                <input
                                    type="text"
                                    name="ChestBreastLungs"
                                    value={formData.PertinentFindings.ChestBreastLungs}
                                    onChange={(e) => handleNestedChange("PertinentFindings", "ChestBreastLungs", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Example: Normal, no abnormalities</p>
                            </div>

                            {/* Heart */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-600 dark:text-gray-400">Heart</label>
                                <input
                                    type="text"
                                    name="Heart"
                                    value={formData.PertinentFindings.Heart}
                                    onChange={(e) => handleNestedChange("PertinentFindings", "Heart", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Example: Normal, no abnormalities</p>
                            </div>

                            {/* Abdomen */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-600 dark:text-gray-400">Abdomen</label>
                                <input
                                    type="text"
                                    name="Abdomen"
                                    value={formData.PertinentFindings.Abdomen}
                                    onChange={(e) => handleNestedChange("PertinentFindings", "Abdomen", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Example: Normal, no abnormalities</p>
                            </div>

                            {/* Genitourinary */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-600 dark:text-gray-400">Genitourinary</label>
                                <input
                                    type="text"
                                    name="Genitourinary"
                                    value={formData.PertinentFindings.Genitourinary}
                                    onChange={(e) => handleNestedChange("PertinentFindings", "Genitourinary", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Example: Normal, no abnormalities</p>
                            </div>

                            {/* Digital Rectal Examination */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-600 dark:text-gray-400">Digital Rectal Examination</label>
                                <input
                                    type="text"
                                    name="RectalExam"
                                    value={formData.PertinentFindings.RectalExam}
                                    onChange={(e) => handleNestedChange("PertinentFindings", "RectalExam", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Example: Normal, no abnormalities</p>
                            </div>

                            {/* Skin Extremities */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-600 dark:text-gray-400">Skin Extremities</label>
                                <input
                                    type="text"
                                    name="ExtremitiesSkin"
                                    value={formData.PertinentFindings.ExtremitiesSkin}
                                    onChange={(e) => handleNestedChange("PertinentFindings", "ExtremitiesSkin", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Example: Normal, no abnormalities</p>
                            </div>

                            {/* Neurological Examination */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-600 dark:text-gray-400">Neurological Examination</label>
                                <input
                                    type="text"
                                    name="NeurologicalExam"
                                    value={formData.PertinentFindings.NeurologicalExam}
                                    onChange={(e) => handleNestedChange("PertinentFindings", "NeurologicalExam", e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Example: Normal, no abnormalities</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Assessment Diagnosis */}
                {currentStep === 4 && (
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Assessment Diagnosis</h3>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Enter the diagnosis based on the patient's condition.</p>
                        <textarea
                            name="AssessmentDiagnosis"
                            value={formData.AssessmentDiagnosis}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            rows="4"
                        ></textarea>
                    </div>
                )}

                {/* Step 5: Laboratory */}
                {currentStep === 5 && (
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Laboratory</h3>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Enter the laboratory tests performed for the patient.</p>
                        <textarea
                            name="Laboratory"
                            value={formData.Laboratory}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            rows="4"
                        ></textarea>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-6 flex justify-between">
                    {currentStep > 1 && (
                        <button
                            onClick={handlePrev}
                            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                        >
                            Prev
                        </button>
                    )}
                    {currentStep < 5 ? (
                        <button
                            onClick={handleNext}
                            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddConsultationModal;
