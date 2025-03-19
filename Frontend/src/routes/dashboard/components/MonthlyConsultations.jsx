import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";

const MonthlyConsultations = () => {
    const [consultationTrends, setConsultationTrends] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/monthlyCheck");

                // Ensure data is properly sorted by year and month for correct display
                const sortedData = response.data.sort((a, b) => {
                    if (a.year === b.year) {
                        return new Date(`1 ${a.month} ${a.year}`) - new Date(`1 ${b.month} ${b.year}`);
                    }
                    return a.year - b.year;
                });

                // Format month in uppercase for display
                const formattedData = sortedData.map((item) => ({
                    ...item,
                    label: `${item.month.toUpperCase()} ${item.year}`, // Example: "AUGUST 2024"
                }));

                setConsultationTrends(formattedData);
            } catch (error) {
                console.error("Error fetching consultation trends:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Card className="flex-1 dark:bg-gray-800 dark:text-white">
            <CardHeader>
                <CardTitle>Total Monthly Consultations</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer
                    width="100%"
                    height={400}
                >
                    <BarChart
                        data={consultationTrends}
                        margin={{ bottom: 50 }} // Extra space for rotated labels
                    >
                        <XAxis
                            dataKey="label"
                            stroke="#888"
                            interval={0} // Show all labels
                            tick={{ fontSize: 12 }} // Reduce font size if necessary
                            angle={-45} // Rotate labels to prevent overlap
                            textAnchor="end" // Align text correctly
                        />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} consultations`, "Total"]} />
                        <Bar
                            dataKey="total_records"
                            fill="#379777"
                            radius={[5, 5, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default MonthlyConsultations;
