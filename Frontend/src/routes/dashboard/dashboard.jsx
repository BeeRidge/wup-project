import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, Activity, CheckCircle } from "lucide-react";
import { ResponsiveContainer, Bar, BarChart as ReBarChart, XAxis, YAxis, Tooltip } from "recharts";
import { eKonsultaData } from "../../constants";
import { staticChartData } from "../../constants";
import { latestMember } from "../../constants";
import { useState, useEffect } from "react";
import AuthMessage from "../auth/AuthMessage";
import { useLocation } from "react-router-dom";

const DashboardPage = () => {
    const location = useLocation();
    const [status, setStatus] = useState(location.state?.status || null);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [status]);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredMembers = latestMember.filter((member) =>
        Object.values(member || {})
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
    );

    // Pagination
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex w-full flex-wrap gap-6">
            <div className="flex-1"> {status && <AuthMessage status={status} />}</div>
            {/* Stats Cards */}
            <div className="flex w-full flex-wrap gap-6">
                <Card className="min-w-[280px] flex-1">
                    <CardHeader>
                        <CardTitle>Total eKonsulta Members</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <Users
                            size={32}
                            className="text-blue-500"
                        />
                        <span className="text-2xl font-bold">{eKonsultaData.totalMembers}</span>
                    </CardContent>
                </Card>

                <Card className="min-w-[280px] flex-1">
                    <CardHeader>
                        <CardTitle>1st Tranche Members</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <Activity
                            size={32}
                            className="text-green-500"
                        />
                        <span className="text-2xl font-bold">{eKonsultaData.firstTranche}</span>
                    </CardContent>
                </Card>

                <Card className="min-w-[280px] flex-1">
                    <CardHeader>
                        <CardTitle>2nd Tranche Members</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <Activity
                            size={32}
                            className="text-yellow-500"
                        />
                        <span className="text-2xl font-bold">{eKonsultaData.secondTranche}</span>
                    </CardContent>
                </Card>
            </div>
            {/* Consultation Trends & Patient Satisfaction (2 columns in 1 row) */}
            <div className="flex w-full gap-6">
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Consultation Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer
                            width="100%"
                            height={250}
                        >
                            <ReBarChart data={staticChartData}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#888"
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="consultations"
                                    fill="#379777"
                                    radius={[5, 5, 0, 0]}
                                />
                            </ReBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Patient Satisfaction</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <CheckCircle
                            size={32}
                            className="text-purple-500"
                        />
                        <span className="text-2xl font-bold">{eKonsultaData.patientSatisfaction}%</span>
                    </CardContent>
                </Card>
            </div>

            {/* Table*/}
            <div className="flex w-full gap-4">
                <Card>
                    <CardTitle className="flex">Latest Members Joined</CardTitle>

                    <CardHeader>
                        {/* Search */}

                        <div className="flex justify-end py-2 text-green-700">
                            <input
                                type="text"
                                placeholder="Search members..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-1/3 rounded-md border border-green-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {selectedMembers.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 text-center">
                                            <th className="px-4 py-2">ID</th>
                                            <th className="px-4 py-2">PIN</th>
                                            <th className="px-4 py-2">Name</th>
                                            <th className="px-4 py-2">Sex</th>
                                            <th className="px-4 py-2">Member Type</th>
                                            <th className="px-4 py-2">Contact No.</th>
                                            <th className="px-4 py-2">Registration Date</th>
                                            <th className="px-4 py-2">Effective Period</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedMembers.map((member, index) => (
                                            <tr
                                                key={index}
                                                className="text-center hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-2">{member.id}</td>
                                                <td className="px-4 py-2">{member.Pin}</td>
                                                <td className="px-4 py-2">
                                                    {member.FirstName} {member.MiddleName} {member.LastName} {member.Suffix}
                                                </td>
                                                <td className="px-4 py-2">{member.Sex}</td>
                                                <td className="px-4 py-2">{member.MemberType}</td>
                                                <td className="px-4 py-2">{member.ContactNo}</td>
                                                <td className="px-4 py-2">{member.RegistrationDate}</td>
                                                <td className="px-4 py-2">{member.EffectivePeriod}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500">No recent members found.</p>
                        )}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="mt-4 flex items-center justify-center gap-5 text-green-700">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="rounded-md border bg-green-700 px-4 py-2 text-white hover:bg-gray-300 disabled:opacity-50"
                                >
                                    Previous
                                </button>

                                <span>
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="rounded-md border bg-green-700 px-4 py-2 text-white hover:bg-gray-300 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
