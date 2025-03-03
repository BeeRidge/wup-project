import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo/logogg.png";
import AuthMessage from "./AuthMessage";
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    /* message  */
    const [status, setstatus] = useState(null);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulating authentication (Replace with actual authentication logic)
        if (email === "ivan@gmail.com" && password === "1234") {
            localStorage.setItem("isAuthenticated", "true"); // Store auth status
            setTimeout(() => {
                navigate("/dashboard", { state: { status: "success" } });
            }, 1500);
        } else {
            setstatus("error");
        }
    };

    return (
        <div className="mx-5 flex h-screen items-center justify-center bg-gray-100">
            <div className="w-96 rounded-lg bg-white p-8 shadow-md">
                <div className="flex items-center justify-center">
                    <img
                        className="w-30 h-40 rounded object-cover"
                        src={logo}
                        alt="logo"
                    />
                </div>
                {status && <AuthMessage status={status} />}
                <form
                    onSubmit={handleLogin}
                    className="space-y-4"
                >
                    <label
                        htmlFor="email"
                        className="text-md block font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="mt-1 w-full rounded-lg border p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label
                        htmlFor="password"
                        className="text-md block font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-lg border p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-500 p-2 text-white"
                    >
                        Login
                    </button>
                    <p className="text-center">
                        Create an Account?{" "}
                        <a
                            class="text-blue-800"
                            href=""
                        >
                            Click here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
