import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiChevronDown } from "react-icons/fi";
import StatsCard from "./components/StatsTotal";
import { latestMember, eKonsultaData, diagnosedConditions, consultationTrends, satisfactionData, DashboardDropdown } from "../../constants";
import { useState, useEffect, useRef } from "react";
import AuthMessage from "../auth/AuthMessage";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import PatientSatisfaction from "./components/PatientSatisfaction";
import TrancheDataBreakdown from "./components/TrancheDataBreakdown";
import MonthlyConsultations from "./components/MonthlyConsultations";
import TopDiagnosedConditions from "./components/TopDiagnosedConditions";
import axios from "axios";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
    const { theme, setTheme } = useTheme();
    const location = useLocation();
    const [status, setStatus] = useState(location.state?.status || null);
    const [OpenDropdown, setOpenDropdown] = useState(false);
    const Dropdownref = useRef();
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const navigate = useNavigate()


    const fetchNewMembers = async () => {
        try {
            const response = await axios.get("http://localhost:8081/api/profile");
            setMembers(response.data);
        } catch (error) {
            setStatus("ERROR");
            console.error("Error fetching members:", error);
        }
    };

    useEffect(() => {
        fetchNewMembers();
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (Dropdownref.current && !Dropdownref.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [OpenDropdown]);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const filteredMembers = members.filter((member) =>
        Object.values(member || {})
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const selectedMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex w-full flex-wrap gap-6">
            <div className="flex-1"> {status && <AuthMessage status={status} />}</div>
            <StatsCard eKonsultaData={eKonsultaData} />
            <div className="flex w-full gap-6">
                <PatientSatisfaction
                    satisfactionData={satisfactionData}
                    satisfactionPercentage={eKonsultaData.patientSatisfaction}
                />
                <TrancheDataBreakdown
                    firstTranche={eKonsultaData.firstTranche}
                    secondTranche={eKonsultaData.secondTranche}
                />
            </div>
            <div className="flex w-full gap-6">
                <MonthlyConsultations consultationTrends={consultationTrends} />
                <TopDiagnosedConditions diagnosedConditions={diagnosedConditions} />
            </div>


            <div className="block w-full p-6">
                <Card className="shadow-xl rounded-2xl border border-gray-300 bg-white">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl font-semibold text-gray-900 justify-start">Latest Members Joined</CardTitle>
                            <div className="flex items-center justify-end mt-2">
                                <input
                                    type="text"
                                    placeholder="Search members..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-lg border border-gray-400 p-2 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">

                            <select
                                value={entriesPerPage}
                                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                                className="w-30 rounded-md border border-gray-400 p-2 text-gray-800 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 block"
                            >
                                <option value={5}>Show 5</option>
                                <option value={10}>Show 10</option>
                                <option value={20}>Show 20</option>
                                <option value={50}>Show 50</option>
                            </select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {selectedMembers.length > 0 ? (
                            <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm items-center">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-green-700 text-white font-medium">
                                            <th className="px-5 py-3">Accreditation No.</th>
                                            <th className="px-5 py-3">Member Type</th>
                                            <th className="px-5 py-3">Last Name</th>
                                            <th className="px-5 py-3">First Name</th>
                                            <th className="px-5 py-3">Middle Name</th>
                                            <th className="px-5 py-3">Ext.</th>
                                            <th className="px-5 py-3">Sex</th>
                                            <th className="px-5 py-3">Enlist Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedMembers.slice(0, entriesPerPage).map((member, index) => (
                                            <tr
                                                key={`${member.ACCRE_NO}-${index}`}
                                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                {/* Clickable Accreditation Number */}
                                                <td
                                                    className=" border border-gray-400 px-4 py-2 text-blue-500 cursor-pointer hover:underline"
                                                    onClick={() => navigate(`/member-records/${member.ACCRE_NO}`)}
                                                >
                                                    {member.ACCRE_NO}
                                                </td>
                                                <td className="px-5 py-3 border border-gray-400 text-gray-900">
                                                    {member.PX_TYPE === "MM" ? "MEMBER" : member.PX_TYPE === "DD" ? "DEPENDENT" : member.PX_TYPE === "NM" ? "NON MEMBER" : member.PX_TYPE}
                                                </td>
                                                <td className="px-5 py-3 border border-gray-400 text-gray-900">{member.PX_LNAME}</td>
                                                <td className="px-5 py-3 border border-gray-400 text-gray-900">{member.PX_FNAME}</td>
                                                <td className="px-5 py-3 border border-gray-400 text-gray-900">{member.PX_MNAME || "-"}</td>
                                                <td className="px-5 py-3 border border-gray-400 text-gray-900">{member.PX_EXTNAME || "-"}</td>
                                                <td className="px-5 py-3 border border-gray-400 text-gray-900">{member.PX_SEX}</td>
                                                <td className="px-5 py-3 border border-gray-400 text-gray-900">{formatDate(member.ENLIST_DATE)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-5">No recent members found.</p>
                        )}

                        <div className="mt-4 flex items-center justify-between ">

                            <p>
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredMembers.length)} of {filteredMembers.length} entries
                            </p>
                            {totalPages > 1 && (
                                <div className="mt-5 flex items-center justify-center gap-4 text-gray-800">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="rounded-lg border bg-green-700 text-white border-gray-400 px-5 py-2 font-medium transition-all hover:bg-gray-300 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-gray-700 text-sm">Page {currentPage} of {totalPages}</span>
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="rounded-lg border bg-green-700 text-white border-gray-400 px-5 py-2 font-medium transition-all hover:bg-gray-300 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>

                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
