import { useEffect, useState } from "react";

const LatestMember = () => {
    const [membershipData, setMembershipData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/member");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setMembershipData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>PIN No.</th>
                        <th>Member Type</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Suffix</th>
                        <th>Sex</th>
                        <th>Contact No.</th>
                        <th>Registration Date</th>
                    </tr>
                </thead>
                <tbody>
                    {membershipData.length > 0 ? (
                        membershipData.map((member, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{member.PinNumber}</td>
                                <td>{member.MemberType}</td>
                                <td>{member.FirstName}</td>
                                <td>{member.MiddleName}</td>
                                <td>{member.LastName}</td>
                                <td>{member.SuffixName}</td>
                                <td>{member.Sex}</td>
                                <td>{member.MobileNumber}</td>
                                <td>{member.RegistrationDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No results found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LatestMember;
