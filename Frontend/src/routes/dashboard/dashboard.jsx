import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, Activity, CheckCircle } from "lucide-react";
import { ResponsiveContainer, Bar, BarChart as ReBarChart, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import {
    latestMember,
    eKonsultaData,
    staticChartData,
    diagnosedConditions,
    consultationTrends,
    satisfactionData,
    COLORS,
    activeConsultationsData,
} from "../../constants";
import { useState, useEffect } from "react";
import AuthMessage from "../auth/AuthMessage";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";

const DashboardPage = () => {
    const { theme, setheme } = useTheme();
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
                <Card className="min-w-[280px] flex-1 dark:bg-slate-800 dark:text-white">
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

                <Card className="min-w-[280px] flex-1 dark:bg-slate-800 dark:text-white">
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

                <Card className="min-w-[280px] flex-1 dark:bg-slate-800 dark:text-white">
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

            {/* Consultation Trends*/}
            <div className="flex w-full gap-6">
                <Card className="flex-1 rounded-2xl bg-gradient-to-br p-4 text-black shadow-md dark:from-gray-800 dark:to-gray-800 dark:text-white">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold tracking-wider text-purple-400">Patient Satisfaction</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        {/* Pie Chart */}
                        <PieChart
                            width={180}
                            height={180}
                        >
                            <Pie
                                data={satisfactionData}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                startAngle={90}
                                endAngle={-270}
                                paddingAngle={3}
                                stroke="none"
                            >
                                {satisfactionData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>

                        {/* Satisfaction Percentage */}
                        <span className="mt-3 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-3xl font-extrabold text-transparent">
                            {eKonsultaData.patientSatisfaction}%
                        </span>

                        {/* Label */}
                        <span className="mt-1 text-sm uppercase tracking-wide text-gray-400">Overall Satisfaction Score</span>
                    </CardContent>
                </Card>

                <Card className="flex-1 dark:bg-gray-800 dark:text-white">
                    <CardHeader>
                        <CardTitle>Tranche Data Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer
                            width="100%"
                            height={250}
                        >
                            <PieChart>
                                <Pie
                                    dataKey="value"
                                    data={[
                                        { name: "1st Tranche", value: eKonsultaData.firstTranche },
                                        { name: "2nd Tranche", value: eKonsultaData.secondTranche },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    <Cell fill="#34D399" />
                                    <Cell fill="#FBBF24" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="flex w-full gap-6">
                <Card className="flex-1 dark:bg-gray-800 dark:text-white">
                    <CardHeader>
                        <CardTitle>Monthly Consultations Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer
                            width="100%"
                            height={250}
                        >
                            <ReBarChart data={consultationTrends}>
                                <XAxis
                                    dataKey="month"
                                    stroke="#888"
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="count"
                                    fill="#379777"
                                    radius={[5, 5, 0, 0]}
                                />
                            </ReBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <div className="flex">
                    <Card className="text-gray flex-1 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg dark:text-white">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold tracking-wide text-[#c6ffdd]">Top Diagnosed Conditions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {diagnosedConditions.map((condition, index) => (
                                    <li
                                        key={index}
                                        className="d hover:bg-gray/20 flex items-center justify-between rounded-lg border border-white bg-white px-5 py-3 shadow-md transition-all duration-300 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20"
                                    >
                                        <span className="text-lg font-medium tracking-wide">{condition.name}</span>
                                        <span className="rounded-lg bg-[#ff6b6b]/10 px-3 py-1 text-xl font-bold text-[#ff6b6b] shadow-md">
                                            {condition.count} cases
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Table*/}
            <div className="block w-full">
                <Card>
                    <div className="flex items-center justify-between">
                        <CardTitle>Latest Members Joined</CardTitle>
                        <CardHeader>
                            {/* Search */}

                            <div className="py-2 text-green-700">
                                <input
                                    type="text"
                                    placeholder="Search members..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-md border border-green-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        </CardHeader>
                    </div>
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
