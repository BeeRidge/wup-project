import { useState, useEffect } from "react";

const SecondTranches = () => {
    const [membershipData, setMembershipData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8081/api/sndTranche")
            .then((response) => response.json())
            .then((data) => setMembershipData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h2>2nd Tranche Members</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>PIN No.</th>
                        <th>Health Assessment No.</th>
                        <th>Consultation No.</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
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
                                <td>{member.ConNumber}</td>
                                <td>{member.FirstName}</td>
                                <td>{member.MiddleName}</td>
                                <td>{member.LastName}</td>
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

export default SecondTranches;
