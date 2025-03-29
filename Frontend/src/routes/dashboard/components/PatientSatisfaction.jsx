import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell } from "recharts";
import { satisfactionData } from "../../../constants";

const PatientSatisfaction = ({ satisfactionData, satisfactionPercentage }) => {
    const COLORS = ["#34D399", "#FBBF24", "#EF4444", "#6366F1"]; // Adjust colors if needed

    return (
        <Card className="flex-1 rounded-2xl bg-gradient-to-br p-4 text-black shadow-md dark:from-gray-800 dark:to-gray-800 dark:text-white">
            <CardHeader>
                <CardTitle className="text-xl font-semibold tracking-wider text-purple-400">Patient Satisfaction</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
                {/* Pie Chart */}
                <PieChart
                    width={180}
                    height={180}
                >
                    <Pie
                        data={satisfactionData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={3}
                        stroke="none"
                    >
                        {satisfactionData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>

                {/* Satisfaction Percentage */}
                <span className="mt-3 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-3xl font-extrabold text-transparent">
                    {satisfactionPercentage}%
                </span>

                {/* Label */}
                <span className="mt-1 text-sm uppercase tracking-wide text-gray-400">Overall Satisfaction Score</span>
            </CardContent>
        </Card>
    );
};

export default PatientSatisfaction;
