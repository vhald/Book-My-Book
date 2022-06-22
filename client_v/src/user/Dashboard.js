import { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { userBookBookings } from "../actions/book";
import { useSelector } from "react-redux";
import BookingCard from "../components/cards/BookingCard";

const Dashboard = () => {
    const {
        auth: { token },
    } = useSelector((state) => ({ ...state }));

    const [booking, setBooking] = useState([]);

    useEffect(() => {
        loadUserBookings();
    }, []);

    const loadUserBookings = async () => {
        const res = await userBookBookings(token);
        console.log(res);
        setBooking(res.data);
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <DashboardNav />
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Books</h2>
                    </div>
                    <div className="col-md-2">
                        <Link className="btn btn-primary" to="/">
                            Browse Books
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                {/* <pre>{JSON.stringify(booking, null, 4)}</pre> */}
                {booking.map((b) => (
                    <BookingCard
                        key={b._id}
                        book={b.book}
                        session={b.session}
                        orderedBy={b.orderedBy}
                    />
                ))}
            </div>
        </>
    );
};

export default Dashboard;
