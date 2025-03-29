import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";

const MonthlyConsultations = () => {
    const [consultationTrends, setConsultationTrends] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/MonthlyConsultation");

                // Define months in correct order
                const months = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ];

                // Group data by year
                const groupedData = {};
                response.data.forEach(({ year, month, TotalRecords }) => {
                    if (!groupedData[year]) groupedData[year] = {};
                    groupedData[year][month] = TotalRecords;
                });

                // Ensure all months exist for each year
                const filledData = [];
                Object.keys(groupedData).forEach((year) => {
                    months.forEach((month) => {
                        filledData.push({
                            year: parseInt(year),
                            month,
                            label: `${month.toUpperCase()} ${year}`, // Format: "JANUARY 2024"
                            TotalRecords: groupedData[year][month] || 0, // Default to 0 if missing
                        });
                    });
                });

                // Sort by year and month order
                filledData.sort((a, b) => (a.year === b.year ? months.indexOf(a.month) - months.indexOf(b.month) : a.year - b.year));

                setConsultationTrends(filledData);
            } catch (error) {
                console.error("Error fetching consultation trends:", error);
            }
        };

        fetchData();
    }, []);

    // Extract available years from the data
    const availableYears = [...new Set(consultationTrends.map((item) => item.year))].sort((a, b) => b - a);

    // Filter data to show only the selected year
    const filteredData = consultationTrends.filter((item) => item.year === selectedYear);

    return (
        <Card className="flex-1 dark:bg-gray-800 dark:text-white">
            <CardHeader className="flex items-center justify-between">
                <CardTitle>Total Monthly Consultations</CardTitle>
                <select
                    className="rounded-md bg-gray-700 p-2 text-white"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                    {availableYears.map((year) => (
                        <option
                            key={year}
                            value={year}
                        >
                            {year}
                        </option>
                    ))}
                </select>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer
                    width="100%"
                    height={400}
                >
                    <BarChart
                        data={filteredData}
                        margin={{ bottom: 50 }}
                    >
                        <XAxis
                            dataKey="label"
                            stroke="#888"
                            interval={0}
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                        />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} consultations`, "Total"]} />
                        <Bar
                            dataKey="TotalRecords"
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
