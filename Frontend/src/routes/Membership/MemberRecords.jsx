import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MemberRecords = () => {
    const { accreNo } = useParams();
    const [memberData, setMemberData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/members/${accreNo}`);
                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();
                setMemberData(data);
            } catch (error) {
                console.error("Error fetching member data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMemberData();
    }, [accreNo]);

    if (loading) return <p>Loading...</p>;
    if (!memberData) return <p>No records found.</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Member Records for ACCRE No: {accreNo}
            </h1>
            <p><strong>Name:</strong> {memberData.PX_FNAME} {memberData.PX_LNAME}</p>
            <p><strong>Disease Type:</strong> {memberData.MDISEASE_DESC}</p>
            <p><strong>Date Added:</strong> {memberData.DATE_ADDED}</p>
            <p><strong>Member Type:</strong> {memberData.PX_TYPE}</p>
            <p><strong>Sex:</strong> {memberData.PX_SEX}</p>
        </div>
    );
};

export default MemberRecords;
