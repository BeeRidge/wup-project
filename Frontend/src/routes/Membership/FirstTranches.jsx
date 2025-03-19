import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";

const FirstTranches = () => {
    const { theme } = useTheme();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/profile");
                if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format received");
                }

                setMembers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    if (loading) return <p className="text-center text-lg font-semibold">Loading data...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (members.length === 0) return <p className="text-center text-gray-500">No members found.</p>;

    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse border border-green-700 shadow-lg">
                <thead>
                    <tr className="bg-green-700 text-white">
                        <th className="border border-gray-300 px-4 py-2">Accre No.</th>
                        <th className="border border-gray-300 px-4 py-2">Account Type</th>
                        <th className="border border-gray-300 px-4 py-2">First Name</th>
                        <th className="border border-gray-300 px-4 py-2">Middle Name</th>
                        <th className="border border-gray-300 px-4 py-2">Last Name</th>
                        <th className="border border-gray-300 px-4 py-2">Suffix</th>
                        <th className="border border-gray-300 px-4 py-2">Sex</th>
                        <th className="border border-gray-300 px-4 py-2">Enlistment Date</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr
                            key={index}
                            className="even:bg-gray-50 hover:bg-gray-100"
                        >
                            <td className="border border-gray-300 px-4 py-2">{member.ACCRE_NO || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{member.PX_TYPE || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{member.PX_FNAME || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{member.PX_MNAME || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{member.PX_LNAME || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{member.PX_EXTNAME || "-"}</td>
                            <td className="border border-gray-300 px-4 py-2">{member.PX_SEX || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {member.ENLIST_DATE ? new Date(member.ENLIST_DATE).toLocaleDateString() : "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FirstTranches;
