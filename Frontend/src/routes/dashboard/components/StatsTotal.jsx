
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, } from "lucide-react";
import { eKonsultaData } from "../../../constants";
const StatsCard = () => {

    return (
        <div className="flex w-full flex-wrap gap-6">
            <Card className="min-w-[280px] flex-1 dark:bg-slate-800 dark:text-white">
                <CardHeader>
                    <CardTitle>Total eKonsulta Members</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <Users
                        size={32}
                        className="text-blue-500"
                    />
                    <span className="text-2xl font-bold">{eKonsultaData.totalMembers}</span>
                </CardContent>
            </Card>

            <Card className="min-w-[280px] flex-1 dark:bg-slate-800 dark:text-white">
                <CardHeader>
                    <CardTitle>1st Tranche Members</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <Activity
                        size={32}
                        className="text-green-500"
                    />
                    <span className="text-2xl font-bold">{eKonsultaData.firstTranche}</span>
                </CardContent>
            </Card>

            <Card className="min-w-[280px] flex-1 dark:bg-slate-800 dark:text-white">
                <CardHeader>
                    <CardTitle>2nd Tranche Members</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <Activity
                        size={32}
                        className="text-yellow-500"
                    />
                    <span className="text-2xl font-bold">{eKonsultaData.secondTranche}</span>
                </CardContent>
            </Card>
        </div>)

}

export default StatsCard;