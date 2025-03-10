import { useEffect, useState } from "react";

const AuthMessage = ({ status }) => {
    const [visible, setVisible] = useState(false);
    const [fading, setFading] = useState(false); // Controls fade-in and fade-out

    useEffect(() => {
        if (status) {
            setVisible(true); // Show message
            setTimeout(() => setFading(true), 50); // Apply fade-in effect after a short delay

            const fadeOutTimer = setTimeout(() => setFading(false), 1500); // Start fade-out after 1.5s
            const hideTimer = setTimeout(() => setVisible(false), 2000); // Remove from DOM after fade-out

            return () => {
                clearTimeout(fadeOutTimer);
                clearTimeout(hideTimer);
            };
        }
    }, [status]);

    if (!visible) return null;

    return (
        <div
            className={`mb-2 mt-2 rounded-lg p-3 text-center  text-sm font-semibold transition-opacity duration-500 ${fading ? "opacity-100" : "opacity-0"
                } ${status === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
        >
            {status === "error" ? "Incorrect password. Please try again." : "Welcome back!"}
        </div>
    );
};

export default AuthMessage;
