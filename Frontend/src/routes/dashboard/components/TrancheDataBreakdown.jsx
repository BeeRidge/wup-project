import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const TrancheDataBreakdown = ({ firstTranche, secondTranche }) => {
    const trancheData = [
        { name: "1st Tranche", value: firstTranche },
        { name: "2nd Tranche", value: secondTranche },
    ];

    const COLORS = ["#34D399", "#FBBF24"]; // 1st = Green, 2nd = Yellow

    return (
        <Card className="flex-1 dark:bg-gray-800 dark:text-white">
            <CardHeader>
                <CardTitle>Tranche Data Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            dataKey="value"
                            data={trancheData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {trancheData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
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
