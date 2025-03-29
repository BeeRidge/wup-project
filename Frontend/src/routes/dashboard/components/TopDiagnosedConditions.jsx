import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";

const TopDiagnosedConditions = () => {
    const [diagnosedConditions, setDiagnosedConditions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/DiseaseCount");
                setDiagnosedConditions(response.data); // Assuming API returns an array of { name, count }
            } catch (error) {
                console.error("Error fetching diagnosed conditions:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex">
            <Card className="text-gray flex-1 rounded-2xl border border-white/20 bg-white p-6 shadow-sm backdrop-blur-lg dark:bg-gray-800 dark:text-white">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold tracking-wide text-[#c6ffdd]">Diagnosed Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent max-h-[500px] overflow-y-auto">
                        <ul className="space-y-3">
                            {diagnosedConditions.length > 0 ? (
                                diagnosedConditions.map((condition, index) => (
                                    <li
                                        key={index}
                                        className="hover:bg-gray/20 flex items-center justify-between rounded-lg border border-white bg-white px-5 py-3 shadow-md transition-all duration-300 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20"
                                    >
                                        <span className="text-lg font-medium tracking-wide">{condition.AssessmentDiagnosis}</span>
                                        <span className="rounded-lg bg-[#ff6b6b]/10 px-3 py-1 text-xl font-bold text-[#ff6b6b] shadow-md">
                                            {condition.DiagnoseDisease} cases
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <p className="text-center text-lg text-gray-400">No data available</p>
                            )}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TopDiagnosedConditions;
