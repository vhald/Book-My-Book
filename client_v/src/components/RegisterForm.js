const RegisterForm = ({
    handleSubmit,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
}) => (
    <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group mb-3">
            <label className="form-label">Your Name</label>
            <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="form-group mb-3">
            <label className="form-label">Email Address</label>
            <input
                type="email"
                className="form-control"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="form-group mb-3">
            <label className="form-label">Password</label>
            <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        {/* disabled on missing feild */}
        <button
            disabled={!email || !password || !name}
            className="btn btn-primary"
        >
            Submit
        </button>
    </form>
);

export default RegisterForm;
