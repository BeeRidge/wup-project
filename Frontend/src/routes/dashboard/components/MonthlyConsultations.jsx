import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";

const MonthlyConsultations = ({ consultationTrends }) => {
    return (
        <Card className="flex-1 dark:bg-gray-800 dark:text-white">
            <CardHeader>
                <CardTitle>Monthly Consultations Trend</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={consultationTrends}>
                        <XAxis dataKey="month" stroke="#888" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#379777" radius={[5, 5, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default MonthlyConsultations;
