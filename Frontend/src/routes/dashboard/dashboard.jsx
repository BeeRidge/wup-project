import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiChevronDown } from "react-icons/fi";
import StatsCard from "./components/StatsTotal";
import { latestMember, eKonsultaData, diagnosedConditions, consultationTrends, satisfactionData, DashboardDropdown } from "../../constants";
import { useState, useEffect, useRef } from "react";
import AuthMessage from "../auth/AuthMessage";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import PatientSatisfaction from "./components/PatientSatisfaction";
import TrancheDataBreakdown from "./components/TrancheDataBreakdown";
import MonthlyConsultations from "./components/MonthlyConsultations";
import TopDiagnosedConditions from "./components/TopDiagnosedConditions";
import axios from "axios";

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
            <div className="block w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Latest Members Joined</CardTitle>
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-md border border-green-700 p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </CardHeader>
                    <CardContent>
                        {selectedMembers.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="text-center">
                                            <th className="px-4 py-2">Accreditation No.</th>
                                            <th className="px-4 py-2">Member Type</th>
                                            <th className="px-4 py-2">Last Name</th>
                                            <th className="px-4 py-2">First Name</th>
                                            <th className="px-4 py-2">Middle Name</th>
                                            <th className="px-4 py-2">Sex</th>
                                            <th className="px-4 py-2">Phone No.</th>
                                            <th className="px-4 py-2">Enlist Date</th>
                                            <th className="px-4 py-2">Date Added</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedMembers.map((member, index) => (
                                            <tr
                                                key={index}
                                                className="text-center"
                                            >
                                                <td className="px-4 py-2">{member.ACCRE_NO}</td>
                                                <td>
                                                    {member.PX_TYPE === "MM"
                                                        ? "MEMBER"
                                                        : member.PX_TYPE === "DD"
                                                          ? "DEPENDENT"
                                                          : member.PX_TYPE === "NM"
                                                            ? "NON MEMBER"
                                                            : member.PX_TYPE}
                                                </td>
                                                <td className="px-4 py-2">{member.PX_LNAME}</td>
                                                <td className="px-4 py-2">{member.PX_FNAME}</td>
                                                <td className="px-4 py-2">{member.PX_MNAME}</td>
                                                <td className="px-4 py-2">{member.PX_SEX}</td>
                                                <td className="px-4 py-2">{member.PX_MOBILE_NO}</td>
                                                <td className="px-4 py-2">{formatDate(member.ENLIST_DATE)}</td>
                                                <td className="px-4 py-2">{formatDate(member.DATE_ADDED)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500">No recent members found.</p>
                        )}
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
