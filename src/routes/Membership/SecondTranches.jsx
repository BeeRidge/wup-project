import { useTheme } from "@/hooks/use-theme";
import { Footer } from "@/layouts/footer";
import { membershipData } from "../../constants";

const SecondTranches = () => {
    const { theme } = useTheme();

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-max border-collapse border border-green-700">
                <thead>
                    <tr className="bg-green-700 text-white">
                        <th className="border border-gray-300 px-4 py-2">No</th>
                        <th className="border border-gray-300 px-4 py-2">PIN</th>
                        <th className="border border-gray-300 px-4 py-2">Last Name</th>
                        <th className="border border-gray-300 px-4 py-2">First Name</th>
                        <th className="border border-gray-300 px-4 py-2">Middle Name</th>
                        <th className="border border-gray-300 px-4 py-2">Suffix</th>
                        <th className="border border-gray-300 px-4 py-2">Sex</th>
                        <th className="border border-gray-300 px-4 py-2">Member Type</th>
                        <th className="border border-gray-300 px-4 py-2">Contact No.</th>
                        <th className="border border-gray-300 px-4 py-2">Registration Date</th>
                        <th className="border border-gray-300 px-4 py-2">Effective Period</th>
                    </tr>
                </thead>
                <tbody>
                    {membershipData.map((Member, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-100"
                        >
                            <td className="border border-gray-300 px-4 py-2">{Member.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{Member.Pin}</td>
                            <td className="border border-gray-300 px-4 py-2">{Member.LastName}</td>
                            <td className="border border-gray-300 px-4 py-2">{Member.FirstName}</td>
                            <td className="border border-gray-300 px-4 py-2">{Member.MiddleName}</td>
                            <td className="border border-gray-300 px-4 py-2">{Member.Suffix}</td>
                            <td className="border border-gray-300 px-4 py-2">{Member.Sex}</td>
                            <td className="border border-gray-300 px-4 py-2">{Member.MemberType}</td>
                            <td className="border border-gray-300 px-4 py-2">{Member.ContactNo}</td>
                            <td className="border border-gray-300 px-4 py-2">{Member.RegistrationDate}</td>
                            <td className="border border-gray-300 px-4 py-2">{Member.EffectivePeriod}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SecondTranches;
