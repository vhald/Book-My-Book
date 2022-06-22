import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import { read, updateBook } from "../actions/book";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import BookCreateForm from "../components/forms/BookCreateForm";


const { Option } = Select;

const EditBook = () => {
    const params = useParams();
    // redux
    const { auth } = useSelector((state) => ({ ...state }));
    const { token } = auth;
    // state
    const [values, setValues] = useState([{
        title: "",
        content: "",
        author: "",   // search add
        image: "",
        location: "",
        price: "",
        from: "",
        to: "",
        genre: "",        // search debs
    }]);

    // default image
    const [preview, setPreview] = useState(
        "https://via.placeholder.com/100x100.png?text=PREVIEW"
    );

    // destructuring variables from state
    const { title, content, author, image, price, from, to, genre, location } = values;

    useEffect(() => {
        loadSellerBook();   // disabled because throwing error at backend by line 50

    }, []);


    const loadSellerBook = async (bookId) => {
        let res = await axios.get(`http://localhost:8000/api/book/${bookId}`);
        // console.log(res.data);
        setValues({ ...values, ...res.data });
        setPreview(`${process.env.REACT_APP_API}/book/image/${res.data._id}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let bookData = new FormData();
        bookData.append("title", title);
        bookData.append("content", content);
        bookData.append("author", author);
        bookData.append("location", location);
        bookData.append("price", price);
        image && bookData.append("image", image);  // make sure we have img in the state
        bookData.append("from", from);
        bookData.append("to", to);
        bookData.append("genre", genre);

        try {
            let res = await updateBook(token, bookData, params.bookId);
            console.log("BOOK UPDATE RES", res);
            toast.success(`${res.data.title} is updated`);
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.err);
        }
    };

    const handleImageChange = (e) => {
        // console.log(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
        setValues({ ...values, image: e.target.files[0] });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <>

            <div className="container-fluid bg-secondary p-5 text-center">
                <h2>Edit Book</h2>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <br />
                        <BookCreateForm
                            values={values}
                            setValues={setValues}
                            handleChange={handleChange}
                            handleImageChange={handleImageChange}
                            handleSubmit={handleSubmit}

                        />
                    </div>
                    <div className="col-md-2">
                        <img
                            src={preview}
                            alt="preview_image"
                            className="img img-fluid m-2"
                        />
                        <pre>{JSON.stringify(values, null, 4)}</pre>

                    </div>
                </div>
            </div>

        </>
    );
};

export default EditBook;
