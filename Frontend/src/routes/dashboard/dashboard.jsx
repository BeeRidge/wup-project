import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiChevronDown } from "react-icons/fi";
import StatsCard from "./components/StatsTotal";
import {
    latestMember,
    eKonsultaData,
    diagnosedConditions,
    consultationTrends,
    satisfactionData,
    DashboardDropdown,
} from "../../constants";
import { useState, useEffect, useRef } from "react";
import AuthMessage from "../auth/AuthMessage";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import PatientSatisfaction from "./components/PatientSatisfaction";
import TrancheDataBreakdown from "./components/TrancheDataBreakdown";
import MonthlyConsultations from "./components/MonthlyConsultations";
import TopDiagnosedConditions from "./components/TopDiagnosedConditions";


const DashboardPage = () => {
    const { theme, setheme } = useTheme();
    const location = useLocation();
    const [status, setStatus] = useState(location.state?.status || null);

    const [OpenDropdown, setOpenDropdown] = useState(false);
    const Dropdownref = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (Dropdownref.current && Dropdownref.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.addEventListener("mousedown", handleClickOutside);
        };
    }, [OpenDropdown]);

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


            <div className="flex justify-between text-center w-full gap-5">
                {DashboardDropdown.map((Menu) => (
                    <div key={Menu.id} className="relative" ref={Dropdownref}>
                        {/* Dropdown Button */}
                        <button
                            className=" flex item-center w-80 justify-between size-10  overflow-hidden rounded-lg bg-white p-2 shadow-md"
                            onClick={() =>
                                setOpenDropdown((prev) => (prev === Menu.id ? null : Menu.id))
                            }
                        >
                            {Menu.name}
                            <FiChevronDown className=" flex ml-4 mb-1 text-gray-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {OpenDropdown === Menu.id && (
                            <div className="absolute left-0 mt-2 w-80 bg-white shadow-lg rounded-md py-2 border">
                                {Menu.options.map((option, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        {option}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <StatsCard eKonsultaData={eKonsultaData} />

            <div className="flex w-full gap-6">
                <PatientSatisfaction satisfactionData={satisfactionData} satisfactionPercentage={eKonsultaData.patientSatisfaction} />


                <TrancheDataBreakdown
                    firstTranche={eKonsultaData.firstTranche}
                    secondTranche={eKonsultaData.secondTranche}
                />

            </div>

            <div className="flex w-full gap-6">
                <MonthlyConsultations consultationTrends={consultationTrends} />

                <TopDiagnosedConditions diagnosedConditions={diagnosedConditions} />
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
                                    className="w-full rounded-md border border-green-700 p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        </CardHeader>
                    </div>
                    <CardContent>
                        {selectedMembers.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="text-center">
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
