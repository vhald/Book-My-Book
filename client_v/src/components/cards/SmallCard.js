import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/book";
import { useNavigate, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Rate } from 'antd';



const SmallCard = ({ b, handleBookDelete = (f) => f, owner = false, showViewMoreButton = true }) => {
    const navigate = useNavigate();
    const url = "https://wa.me/9460526019"



    return (
        <>
            <div className="card mb-3">
                <div className="row">
                    <div className="col-md-4">
                        {b.image && b.image.contentType ? (
                            <img
                                src={`${process.env.REACT_APP_API}/book/image/${b._id}`}
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
                            <h3 className="card-title">
                                {b.title}{" "}
                                <span className="float-right text-primary">
                                    {currencyFormatter({
                                        amount: b.price * 100,
                                        currency: "inr",
                                    })}
                                </span>{" "}
                            </h3>
                            <p className="alert alert-info">{b.location}</p>
                            <p className="card-text h5"><strong>Author:</strong> <mark>{b.author}</mark></p>
                            <p className="card-text h6"><strong>Genre:</strong> {b.genre}</p>

                            <p className="card-text h6"> <strong>Description:</strong> {`${b.content.substring(0, 200)}...`}</p>

                            <p className="card-text">
                                Available from {new Date(b.from).toLocaleDateString()}
                                <br />
                                <span className="float-right text-primary">
                                    for {diffDays(b.from, b.to)}{" "}
                                    {diffDays(b.from, b.to) <= 1 ? " day" : " days"}
                                </span>
                            </p>

                            <br />
                            <br />
                            <br />
                            <div className="d-flex justify-content-between h2 align-items-center">
                                {showViewMoreButton && (
                                    <>
                                        <button
                                            onClick={() => navigate(`/book/${b._id}`)}
                                            className="btn btn-primary"
                                        >
                                            Show more
                                        </button>
                                        <Rate allowHalf defaultValue={4.5} />
                                        <a href={url}>  <WhatsAppOutlined /></a>
                                    </>
                                )}
                                {owner && (
                                    <>
                                        <Link to={`/book/edit/${b._id}`}>
                                            <EditOutlined className="text-warning" />
                                        </Link>
                                        <DeleteOutlined
                                            onClick={() => handleBookDelete(b._id)}
                                            className="text-danger"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SmallCard;
