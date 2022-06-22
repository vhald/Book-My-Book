import { Link } from "react-router-dom";

const DashboardNav = () => {
    const active = window.location.pathname; // current URL
    // console.log(active);

    return (
        <ul className="nav nav-tabs">
            {/* lent */}
            <li className="nav-item">
                <Link
                    className={`nav-link ${
                        active === "/dashboard" && "active"
                    }`}
                    to="/dashboard"
                >
                    Your Books
                </Link>
            </li>
            {/* borrow */}
            <li className="nav-item">
                <Link
                    className={`nav-link ${
                        active === "/dashboard/seller" && "active"
                    }`}
                    to="/dashboard/seller"
                >
                    Books Available
                </Link>
            </li>
        </ul>
    );
};

export default DashboardNav;
