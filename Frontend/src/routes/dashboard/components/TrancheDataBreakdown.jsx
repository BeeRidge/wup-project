import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

const TrancheDataBreakdown = () => {
    const COLORS = ["#34D399", "#FBBF24"]; // 1st = Green, 2nd = Yellow

    const [trancheData, setTrancheData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [firstT, secondT] = await Promise.all([
                    axios.get("http://localhost:8081/api/FirstTranche"),
                    axios.get("http://localhost:8081/api/SecondTranche"),
                ]);

                setTrancheData([
                    { name: "1st Tranche", value: firstT.data.FirstTranche || 0 },
                    { name: "2nd Tranche", value: secondT.data.SecondTranche || 0 },
                ]);
            } catch (error) {
                console.error("Error fetching tranche data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Card className="flex-1 dark:bg-gray-800 dark:text-white">
            <CardHeader>
                <CardTitle>Tranche Data Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer
                    width="100%"
                    height={400}
                >
                    <PieChart>
                        <Pie
                            dataKey="value"
                            data={trancheData}
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            label
                        >
                            {trancheData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default TrancheDataBreakdown;
