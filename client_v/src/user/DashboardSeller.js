import { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BookOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/stripe";
import { sellerBooks, deleteBook } from "../actions/book";
import { toast } from "react-toastify";
import SmallCard from "../components/cards/SmallCard";

const DashboardSeller = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSellersBooks();
    }, []);

    const loadSellersBooks = async () => {
        let { data } = await sellerBooks(auth.token);
        setBooks(data);
    };

    const handleClick = async () => {
        setLoading(true); // show loading
        try {
            let res = await createConnectAccount(auth.token);
            console.log(res); // get login link
            window.location.href = res.data;
        } catch (err) {
            console.log(err);
            toast.error("Stripe connect failed, Try again.");
            setLoading(false);
        }
    };

    const handleBookDelete = async (bookId) => {
        if (!window.confirm("Are you sure?")) return;
        deleteBook(auth.token, bookId).then((res) => {
            toast.success("Book Deleted");
            loadSellersBooks();
        });
    };

    const connected = () => (
        <div className="container-fluid">
            <div className="row justify-content-between">
                <div className="col-md-6">
                    <h2>Your Books</h2>
                </div>
                <div className="col-md-2">
                    <Link className="btn btn-primary" to="/books/new">
                        + Add New Books
                    </Link>
                </div>
            </div>
            <div className="row">
                {/* <pre>{JSON.stringify(books, null, 4)}</pre> */}
                <div className="row">
                    {books.map((b) => (
                        <SmallCard
                            key={b._id}
                            b={b}
                            showViewMoreButton={false}
                            owner={true}
                            handleBookDelete={handleBookDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    const notConnected = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <div className="p-5 pointer">
                        <BookOutlined className="h1" />
                        <h4>Setup Payouts to post books</h4>
                        <p className="lead">
                            <mark>BookYourBook</mark> partners with Stripe to
                            transfer earning to your bank account{" "}
                        </p>
                        <button
                            disabled={loading}
                            onClick={handleClick}
                            className="btn btn-primary mb-3"
                        >
                            {loading ? "Processing..." : "Setup Payouts"}
                        </button>
                        <p className="text-muted">
                            <small>
                                You'll be redirected to Stripe Gateway to
                                complete the onboarding process.
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <DashboardNav />
            </div>

            {auth &&
            auth.user &&
            auth.user.stripe_seller &&
            auth.user.stripe_seller.charges_enabled
                ? connected()
                : notConnected()}
            {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
        </>
    );
};

export default DashboardSeller;
