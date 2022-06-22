import moment from "moment";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { diffDays, isAlreadyBooked, read } from "../actions/book";
import { getSessionId } from "../actions/stripe";
import { loadStripe } from "@stripe/stripe-js";

const ViewBook = () => {
    const [book, setBook] = useState({});
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [alreadyBooked, setAlreadyBooked] = useState(false);

    const { auth } = useSelector((state) => ({ ...state }));

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadSellerBook();
        // console.log(params.bookid);
    }, []);

    useEffect(() => {
        if (auth && auth.token) {
            isAlreadyBooked(auth.token, params.bookid).then((res) => {
                // console.log(res);
                if (res.data.ok) setAlreadyBooked(true);
            });
        }
    }, []);

    const loadSellerBook = async () => {
        let res = await read(params.bookid);
        // console.log(res);
        setBook(res.data);
        setImage(`${process.env.REACT_APP_API}/book/image/${res.data._id}`);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (!auth || !auth.token) {
            navigate("/login");
            return;
        }

        setLoading(true);
        if (!auth) navigate("/login");
        // console.log(auth.token, params.bookid);
        let res = await getSessionId(auth.token, params.bookid);
        // console.log("get session id response: " + res.data.sessionId);
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
        stripe
            .redirectToCheckout({
                sessionId: res.data.sessionId,
            })
            .then((result) => console.log(result));
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>{book.title}</h1>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <br />
                        <img
                            src={image}
                            alt={book.title}
                            className="img img-fluid m-2"
                        />
                    </div>
                    <div className="col-md-6">
                        <br />
                        <b>{book.content}</b>
                        <p className="alert alert-info mt-3">₹ {book.price}</p>
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {diffDays(book.from, book.to)}{" "}
                                {diffDays(book.from, book.to) <= 1
                                    ? " day"
                                    : " days"}
                            </span>
                        </p>
                        <p>
                            Available From: <br />{" "}
                            {moment(new Date(book.from)).format(
                                "MMMM Do YYYY, h:mm:ss a"
                            )}
                        </p>
                        <p>
                            Return Till: <br />{" "}
                            {moment(new Date(book.to)).format("MMMM Do YYYY")}
                        </p>
                        <i>
                            <b>Posted by:</b>{" "}
                            {book.postedBy && book.postedBy.name}
                        </i>
                        <br />
                        <button
                            onClick={handleClick}
                            className="btn btn-block btn-lg btn-primary mt-3"
                            disabled={loading || alreadyBooked}
                        >
                            {loading
                                ? "Loading..."
                                : alreadyBooked
                                ? "Already Booked."
                                : auth && auth.token
                                ? "Book Now"
                                : "Login to Book"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewBook;
