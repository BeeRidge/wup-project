import { useEffect, useState } from "react";

const LatestMember = ({ membershipData }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-green-700">
                <thead>
                    <tr className="bg-green-700 text-white">
                        <th className="px-4 py-2">No</th>
                        <th className="px-4 py-2">PIN No.</th>
                        <th className="px-4 py-2">Member Type</th>
                        <th className="px-4 py-2">Last Name</th>
                        <th className="px-4 py-2">First Name</th>
                        <th className="px-4 py-2">Middle Name</th>
                        <th className="px-4 py-2">Suffix</th>
                        <th className="px-4 py-2">Sex</th>
                        <th className="px-4 py-2">Contact No.</th>
                        <th className="px-4 py-2">Registration Date</th>
                    </tr>
                </thead>
                <tbody>
                    {membershipData.length > 0 ? (
                        membershipData.map((member, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{member.PinNumber}</td>
                                <td className="px-4 py-2">{member.MemberType}</td>
                                <td className="px-4 py-2">{member.LastName}</td>
                                <td className="px-4 py-2">{member.FirstName}</td>
                                <td className="px-4 py-2">{member.MiddleName}</td>
                                <td className="px-4 py-2">{member.SuffixName}</td>
                                <td className="px-4 py-2">{member.Sex}</td>
                                <td className="px-4 py-2">{member.ContactNumber}</td>
                                <td className="px-4 py-2">{member.RegistrationDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="py-4 text-center text-gray-500">
                                No results found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LatestMember;
