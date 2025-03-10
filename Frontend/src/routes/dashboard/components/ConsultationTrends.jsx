import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart as ReBarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";

const ConsultationTrends = ({ consultationTrends, diagnosedConditions }) => {
    return (
        <div className="flex w-full gap-6">
            {/* Monthly Consultations Trend */}
            <Card className="flex-1 dark:bg-gray-800 dark:text-white">
                <CardHeader>
                    <CardTitle>Monthly Consultations Trend</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <ReBarChart data={consultationTrends}>
                            <XAxis dataKey="month" stroke="#888" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#379777" radius={[5, 5, 0, 0]} />
                        </ReBarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Top Diagnosed Conditions */}
            <div className="flex">
                <Card className="text-gray flex-1 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg dark:text-white">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold tracking-wide text-[#c6ffdd]">Top Diagnosed Conditions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {diagnosedConditions.map((condition, index) => (
                                <li
                                    key={index}
                                    className="hover:bg-gray/20 flex items-center justify-between rounded-lg border border-white bg-white px-5 py-3 shadow-md transition-all duration-300 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20"
                                >
                                    <span className="text-lg font-medium tracking-wide">{condition.name}</span>
                                    <span className="rounded-lg bg-[#ff6b6b]/10 px-3 py-1 text-xl font-bold text-[#ff6b6b] shadow-md">
                                        {condition.count} cases
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ConsultationTrends;
