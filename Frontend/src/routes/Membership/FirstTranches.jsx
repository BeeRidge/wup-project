import { useState, useEffect } from "react";

const FirstTranches = ({ membershipData }) => {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-left text-gray-800 dark:border-gray-700 dark:text-white">
                <thead className="bg-gray-200 dark:bg-gray-700">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">No</th>
                        <th className="border border-gray-300 px-4 py-2">PIN No.</th>
                        <th className="border border-gray-300 px-4 py-2">Health Assessment No.</th>
                        <th className="border border-gray-300 px-4 py-2">Member Type</th>
                        <th className="border border-gray-300 px-4 py-2">Full Name</th>
                        <th className="border border-gray-300 px-4 py-2">Health Assessment Date</th>
                    </tr>
                </thead>
                <tbody>
                    {membershipData.length > 0 ? (
                        membershipData.map((member, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{member.PinNumber}</td>
                                <td className="border border-gray-300 px-4 py-2">{member.HSANumber}</td>
                                <td className="border border-gray-300 px-4 py-2">{member.MemberType}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {`${member.FirstName} ${member.MiddleName ? member.MiddleName.charAt(0) + "." : ""} ${member.LastName} ${member.SuffixName || ""}`.trim()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{formatDate(member.AssessmentDate)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="6"
                                className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                            >
                                No results found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FirstTranches;
