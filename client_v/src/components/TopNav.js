import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();

    const logout = () => {
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        window.localStorage.removeItem("auth"); // clearing local storage
        navigate("/login");
    };

    return (
        <div className="nav bg-light d-flex justify-content-between">
            <Link className="nav-link" to="/">
                Home
            </Link>

            {auth !== null && (
                <Link className="nav-link" to="/dashboard">
                    Dashboard
                </Link>
            )}

            {auth !== null && (
                <button className="nav-link pointer" onClick={logout}>
                    Logout
                </button>
            )}

            {auth === null && (
                <>
                    {" "}
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                    <Link className="nav-link" to="/register">
                        Register
                    </Link>
                </>
            )}
        </div>
    );
};

export default TopNav;
