// LatestMember.js
const LatestMember = ({ membershipData }) => {
    return (
        <div>
            <h2>Latest Members</h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>PIN</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        {/* Add other columns */}
                    </tr>
                </thead>
                <tbody>
                    {membershipData.length > 0 ? (
                        membershipData.map((Member, index) => (
                            <tr key={index}>
                                <td>{Member.id}</td>
                                <td>{Member.Pin}</td>
                                <td>{Member.LastName}</td>
                                <td>{Member.FirstName}</td>
                                {/* Add other columns */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11">No results found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LatestMember;
