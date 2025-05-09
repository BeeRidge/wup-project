import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const StatsCard = () => {
    const [memberData, setMemberData] = useState({
        totalMembers: 0,
        firstTranche: 0,
        secondTranche: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [totalRes, firstRes, secondRes] = await Promise.all([
                    axios.get("http://localhost:8081/api/MemberCount"),
                    axios.get("http://localhost:8081/api/FirstTranche"),
                    axios.get("http://localhost:8081/api/SecondTranche"),
                ]);

                setMemberData({
                    totalMembers: totalRes.data.TotalMembers || 0,
                    firstTranche: firstRes.data.FirstTranche || 0,
                    secondTranche: secondRes.data.SecondTranche || 0,
                });
            } catch (error) {
                console.error("Error fetching member data:", error);
            }
        };

        fetchData();
    }, []);

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
                    <span className="text-2xl font-bold">{memberData.totalMembers}</span>
                </CardContent>
            </Card>

            <Card className="min-w-[280px] flex-1 dark:bg-slate-800 dark:text-white">
                <CardHeader>
                    <CardTitle>1st Tranche</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <Activity
                        size={32}
                        className="text-green-500"
                    />
                    <span className="text-2xl font-bold">{memberData.firstTranche}</span>
                </CardContent>
            </Card>

            <Card className="min-w-[280px] flex-1 dark:bg-slate-800 dark:text-white">
                <CardHeader>
                    <CardTitle>2nd Tranche</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <Activity
                        size={32}
                        className="text-yellow-500"
                    />
                    <span className="text-2xl font-bold">{memberData.secondTranche}</span>
                </CardContent>
            </Card>
            
        </div>
    );
};

export default StatsCard;
