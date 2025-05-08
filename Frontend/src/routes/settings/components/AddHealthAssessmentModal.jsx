import React, { useState } from "react";

const AddHealthAssessmentModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        PinNumber: "",
        HSANumber: "",
        AssessmentDate: "",
        PastMedicalHistory: "",
        PastSurgery: "",
        FamilyHistory: "",
        PersonalSocialHistory: "",
        Immunizations: "",
        FamilyPlanning: "",
        MenstrualHistory: "",
        PregnancyHistory: "",
        PhysicalExaminationFindings: "",
        PertinentFindings: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Pass the form data to the parent component
        onClose(); // Close the modal after saving
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
                    Add Health Assessment
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {/* Pin Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Pin Number
                            </label>
                            <input
                                type="text"
                                name="PinNumber"
                                value={formData.PinNumber}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                required
                            />
                        </div>

                        {/* HSA Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                HSA Number
                            </label>
                            <input
                                type="text"
                                name="HSANumber"
                                value={formData.HSANumber}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                required
                            />
                        </div>

                        {/* Assessment Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Assessment Date
                            </label>
                            <input
                                type="date"
                                name="AssessmentDate"
                                value={formData.AssessmentDate}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                required
                            />
                        </div>

                        {/* Past Medical History */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Past Medical History
                            </label>
                            <textarea
                                name="PastMedicalHistory"
                                value={formData.PastMedicalHistory}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Past Surgery */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Past Surgery
                            </label>
                            <textarea
                                name="PastSurgery"
                                value={formData.PastSurgery}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        {/* Family History */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Family History
                            </label>
                            <textarea
                                name="FamilyHistory"
                                value={formData.FamilyHistory}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Personal Social History */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Personal Social History
                            </label>
                            <textarea
                                name="PersonalSocialHistory"
                                value={formData.PersonalSocialHistory}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Immunizations */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Immunizations
                            </label>
                            <textarea
                                name="Immunizations"
                                value={formData.Immunizations}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Family Planning */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Family Planning
                            </label>
                            <textarea
                                name="FamilyPlanning"
                                value={formData.FamilyPlanning}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="col-span-2 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHealthAssessmentModal;