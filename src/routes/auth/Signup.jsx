const Signup = () => {
    return (
        <div>
            <h1>Signup Page</h1>
            <form>
                <input
                    type="text"
                    placeholder="Username"
                />
                <input
                    type="email"
                    placeholder="Email"
                />
                <input
                    type="password"
                    placeholder="Password"
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
