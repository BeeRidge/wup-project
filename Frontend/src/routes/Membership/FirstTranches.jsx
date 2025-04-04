import { useState, useEffect } from "react";

const FirstTranches = () => {
    const [membershipData, setMembershipData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8081/api/fstranche")
            .then((response) => response.json())
            .then((data) => setMembershipData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Pin No.</th>
                        <th>Health Asssessment No.</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Assessment Date</th>
                        {/* Add other columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {membershipData.length > 0 ? (
                        membershipData.map((member, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td> {/* Sequential numbering */}
                                <td>{member.PinNumber}</td>
                                <td>{member.HSANumber}</td>
                                <td>{member.LastName}</td>
                                <td>{member.FirstName}</td>
                                <td>{member.AssessmentDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No results found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FirstTranches;
