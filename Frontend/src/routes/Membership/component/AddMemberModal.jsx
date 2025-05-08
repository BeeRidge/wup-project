import React, { useState } from "react";

const AddMemberModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        PinNumber: "",
        MemberType: "",
        LastName: "",
        FirstName: "",
        MiddleName: "",
        SuffixName: "",
        DateofBirth: "",
        Sex: "",
        MobileNumber: "",
        RegistrationDate: "",
        Balance: "",
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
            <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
                    Add New Member
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
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

                    {/* Member Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Member Type
                        </label>
                        <select
                            name="MemberType"
                            value={formData.MemberType}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        >
                            <option value="">Select Member Type</option>
                            <option value="Member">Member</option>
                            <option value="NonMember">Non-Member</option>
                        </select>
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="LastName"
                            value={formData.LastName}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="FirstName"
                            value={formData.FirstName}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    {/* Middle Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Middle Name
                        </label>
                        <input
                            type="text"
                            name="MiddleName"
                            value={formData.MiddleName}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Suffix Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Suffix Name
                        </label>
                        <input
                            type="text"
                            name="SuffixName"
                            value={formData.SuffixName}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="DateofBirth"
                            value={formData.DateofBirth}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    {/* Sex */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Sex
                        </label>
                        <select
                            name="Sex"
                            value={formData.Sex}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        >
                            <option value="">Select Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            name="MobileNumber"
                            value={formData.MobileNumber}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    {/* Registration Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Registration Date
                        </label>
                        <input
                            type="date"
                            name="RegistrationDate"
                            value={formData.RegistrationDate}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    {/* Balance */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Balance
                        </label>
                        <input
                            type="number"
                            name="Balance"
                            value={formData.Balance}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
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

export default AddMemberModal;