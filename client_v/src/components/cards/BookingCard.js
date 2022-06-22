import { useState } from "react";
import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/book";
import { useNavigate, Link } from "react-router-dom";
import { WhatsAppOutlined } from "@ant-design/icons";
import OrderModal from "../modals/OrderModal";
import { Rate } from "antd";

const BookingCard = ({ book, session, orderedBy }) => {
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const url = "https://wa.me/9826541798";

    return (
        <>
            <div className="card mb-3">
                <div className="row">
                    <div className="col-md-4">
                        {book.image && book.image.contentType ? (
                            <img
                                src={`${process.env.REACT_APP_API}/book/image/${book._id}`}
                                alt="default book image"
                                className="card-image img img-fluid"
                            />
                        ) : (
                            <img
                                src="https://via.placeholder.com/280x360.png?text=Books"
                                alt="default book image"
                                className="card-image img img-fluid"
                            />
                        )}
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title">{book.title} </h3>
                            {/* <p className="alert alert-info">{book.location}</p> */}
                            <p className="card-text h5">
                                <strong>Author:</strong>{" "}
                                <mark>{book.author}</mark>
                            </p>
                            <p className="card-text h6">
                                <strong>Genre:</strong> {book.genre}
                            </p>

                            <p className="card-text h6">
                                {" "}
                                <strong>Description:</strong>{" "}
                                {`${book.content.substring(0, 200)}...`}
                            </p>

                            <p className="card-text">
                                Available from{" "}
                                {new Date(book.from).toLocaleDateString()}
                                <br />
                                <span className="float-right text-primary">
                                    for {diffDays(book.from, book.to)}{" "}
                                    {diffDays(book.from, book.to) <= 1
                                        ? " day"
                                        : " days"}
                                </span>
                            </p>

                            {showModal && (
                                <OrderModal
                                    session={session}
                                    orderedBy={orderedBy}
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                />
                            )}
                            <br />
                            <br />
                            <br />
                            <br />
                            <div className="d-flex justify-content-between h4">
                                <button
                                    onClick={() => setShowModal(!showModal)}
                                    className="btn btn-primary"
                                >
                                    Show Transaction Info
                                </button>
                                <div>
                                    <span>Feedback: </span>{" "}
                                    <Rate allowHalf defaultValue={5} />
                                </div>
                                <a href={url}>
                                    {" "}
                                    <WhatsAppOutlined />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingCard;
