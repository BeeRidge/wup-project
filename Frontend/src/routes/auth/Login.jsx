import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "@/assets/logo/logogg.png";
import AuthMessage from "./AuthMessage";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8081/api/login", {
                username,
                password,
            });
            
            if (response.data.status === "success") {
                localStorage.setItem("isAuthenticated", "true");
                setTimeout(() => {
                    navigate("/dashboard", { state: { status: "success" } });
                }, 1500);
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className="mx-5 flex h-screen items-center justify-center bg-gray-100">
            <div className="w-96 rounded-lg bg-white p-8 shadow-md">

            <div className="mb-4 flex items-center justify-center">
  <h1 className="text-3xl font-bold text-green-700 text-center break-words max-w-full">
    Wesleyan University Philippines Hospital
  </h1>
</div>


                <div className="flex items-center justify-center">
                    
                    <img
                        className="w-30 h-40 rounded object-cover"
                        src={logo}
                        alt="logo"
                    />
                </div>
                {status && <AuthMessage status={status} />}
                <form onSubmit={handleLogin} className="space-y-4">
                    <label htmlFor="username" className="text-md block font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder="Username"
                        className="mt-1 w-full rounded-lg border p-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password" className="text-md block font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-lg border p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full rounded-lg bg-green-500 p-2 text-white">
                        Login
                    </button>
                    
                </form>
            </div>
        </div>
    );
};

export default Login;