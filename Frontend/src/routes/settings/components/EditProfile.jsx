const EditProfile = () => {
    return (
        <div className="flex p-10 gap-6">
            {/* Left side: Picture and label under the box */}
            <div className="w-1/3">
                <div className="h-[250px] bg-white shadow-md rounded-lg p-4">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="picture"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <p className="text-center mt-2 text-sm font-medium text-gray-700">
                    Your Text Here
                </p>
            </div>

            {/* Right side: Edit form title or content */}
            <div className="w-2/3 h-[250px] p-4 flex flex-col gap-4 text-center">
                <h1 className="text-2xl font-bold">Edit Profile</h1>
                {/* Add form fields here later if needed */}
            </div>
        </div>
    );
};

export default EditProfile;
