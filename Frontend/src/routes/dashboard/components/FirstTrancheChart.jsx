import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";

const FirstTrancheChart = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMonthlyFirstTrancheData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/monthly-first-tranche");

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
                response.data.data.forEach(({ year, month, FirstTrancheCount }) => {
                    if (!groupedData[year]) groupedData[year] = {};
                    groupedData[year][month] = FirstTrancheCount;
                });

                // Ensure all months exist for each year
                const filledData = [];
                Object.keys(groupedData).forEach((year) => {
                    months.forEach((month) => {
                        filledData.push({
                            year: parseInt(year),
                            month,
                            label: `${month.toUpperCase()} ${year}`, // Format: "JANUARY 2024"
                            FirstTrancheCount: groupedData[year][month] || 0, // Default to 0 if missing
                        });
                    });
                });

                // Sort by year and month order
                filledData.sort((a, b) => (a.year === b.year ? months.indexOf(a.month) - months.indexOf(b.month) : a.year - b.year));

                setMonthlyData(filledData);
                setError(null);
            } catch (error) {
                console.error("Error fetching monthly first tranche data:", error);
                setError("Failed to fetch monthly first tranche data.");
            } finally {
                setLoading(false);
            }
        };

        fetchMonthlyFirstTrancheData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Extract available years from the data
    const availableYears = [...new Set(monthlyData.map((item) => item.year))].sort((a, b) => b - a);

    // Filter data to show only the selected year
    const filteredData = monthlyData.filter((item) => item.year === selectedYear);

    return (
        <Card className="flex-1 dark:bg-gray-800 dark:text-white">
            <CardHeader className="flex items-center justify-between">
                <CardTitle>Monthly First Tranche</CardTitle>
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
                        <Tooltip formatter={(value) => [`${value} members`, "First Tranche"]} />
                        <Bar
                            dataKey="FirstTrancheCount"
                            fill="#379777"
                            radius={[5, 5, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default FirstTrancheChart;

