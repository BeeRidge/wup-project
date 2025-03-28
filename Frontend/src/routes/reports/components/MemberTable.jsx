import React from "react";

const MemberTable = ({ members }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="py-2 px-4 border">Accreditation No</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Balance</th>
                        <th className="py-2 px-4 border">Year</th>
                        <th className="py-2 px-4 border">Renewal Date</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border">{member.accreNo}</td>
                            <td className="py-2 px-4 border">{member.name}</td>
                            <td className="py-2 px-4 border">₱{member.balance.toFixed(2)}</td>
                            <td className="py-2 px-4 border">{member.year}</td>
                            <td className="py-2 px-4 border">{member.renewalDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemberTable;
