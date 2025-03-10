import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TopDiagnosedConditions = ({ diagnosedConditions }) => {
    return (
        <div className="flex">
            <Card className="text-gray flex-1 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg dark:text-white">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold tracking-wide text-[#c6ffdd]">
                        Top Diagnosed Conditions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {diagnosedConditions.map((condition, index) => (
                            <li
                                key={index}
                                className="hover:bg-gray/20 flex items-center justify-between rounded-lg border border-white bg-white px-5 py-3 shadow-md transition-all duration-300 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20"
                            >
                                <span className="text-lg font-medium tracking-wide">
                                    {condition.name}
                                </span>
                                <span className="rounded-lg bg-[#ff6b6b]/10 px-3 py-1 text-xl font-bold text-[#ff6b6b] shadow-md">
                                    {condition.count} cases
                                </span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default TopDiagnosedConditions;
