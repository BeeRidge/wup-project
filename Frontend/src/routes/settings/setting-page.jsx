

const SettingPage = () => {

    return (
        <div className="Flex w-full justify-center items-center pt-10 text-black space-y-5 flex-wrap">

            <div className="flex justify-start font-semibold text-4xl">
                <h1>Settings</h1>
            </div>

            <div className="space-x-10 justify-between flex w-full text-center">
                <div className=" w-full bg-white shadow-sm p-4 rounded-lg text-gray-700 font-semibold hover:bg-gray-200">
                    <a href="">Change Password</a>
                </div>

                <div className="w-full bg-white p-4 rounded-lg shadow-sm  text-gray-700 font-semibold hover:bg-gray-200">
                    <a href="">Account</a>
                </div>


                <div className="w-full bg-white shadow-sm p-4 rounded-lg  text-gray-700 font-semibold hover:bg-red-500 hover:text-white">
                    <a href="">Log out</a>
                </div>
            </div>
        </div>
    );

}



export default SettingPage;