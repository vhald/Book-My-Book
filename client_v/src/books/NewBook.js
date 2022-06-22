import { useState } from "react";
import { toast } from "react-toastify";
import { Select, DatePicker } from "antd";
import { createBook } from "../actions/book";
import { useSelector } from "react-redux";
import BookCreateForm from "../components/forms/BookCreateForm";

// for antd dropdown
// const { Option } = Select;

const NewBook = () => {
    // redux
    const { auth } = useSelector((state) => ({ ...state }));
    const { token } = auth;

    // state
    const [values, setValues] = useState({
        title: "",
        content: "",
        author: "", // search add
        image: "",
        location: "",
        price: "",
        from: "",
        to: "",
        genre: "", // search debs
    });

    // default image
    const [preview, setPreview] = useState(
        "https://via.placeholder.com/100x100.png?text=PREVIEW"
    );

    // destructuring variables from state
    const { title, content, author, image, price, from, to, genre, location } =
        values;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values);
        // console.log(location);

        // every browser has FormData support
        let bookData = new FormData();
        bookData.append("title", title);
        bookData.append("content", content);
        bookData.append("author", author);
        bookData.append("location", location);
        bookData.append("price", price);
        image && bookData.append("image", image); //img in this state & then append
        bookData.append("from", from);
        bookData.append("to", to);
        bookData.append("genre", genre);

        console.log([...bookData]);

        try {
            let res = await createBook(token, bookData);
            console.log("BOOK CREATE RES", res);
            toast.success("New Book is posted");
            setTimeout(() => {
                window.location.reload(); // to empty the form data
            }, 1000); // 1s timeout for save in server
        } catch (err) {
            console.log(err);
            toast.error(err.response.data);
        }
    };

    // handle single image submit
    const handleImageChange = (e) => {
        // console.log(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0])); // show preview
        setValues({ ...values, image: e.target.files[0] }); // select image
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                Post a new book
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
                        {JSON.stringify(location)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewBook;
