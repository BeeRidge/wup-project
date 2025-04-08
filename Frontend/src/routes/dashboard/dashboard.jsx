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
    const navigate = useNavigate();

    const fetchNewMembers = async () => {
        try {
            const response = await axios.get("http://localhost:8081/api/member");
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
        <div className="relative flex w-full flex-wrap gap-6">
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
            <div className="flex flex-col lg:flex-row w-full gap-6 justify-start">
                <MonthlyConsultations consultationTrends={consultationTrends} />
                <TopDiagnosedConditions diagnosedConditions={diagnosedConditions} />
            </div>

        </div >
    );
};

export default DashboardPage;
