import { Select, DatePicker } from 'antd';
// import AlgoliaPlaces from 'algolia-places-react';
import moment from "moment";

// for antd dropdown
// const { Option } = Select;

// const config = {
//     appId: process.env.REACT_APP_ALGOLIA_APP_ID,
//     apiKey: process.env.REACT_APP_ALGOLIA_APP_KEY,
//     language: "en",
//     countries: ["in"],

// }

const BookCreateForm = ({ values,
    setValues,
    handleChange,
    handleImageChange,
    handleSubmit
}) => {
    const { title, content, price, author, genre, location } = values;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-secondary btn-block m-2 text-left">
                    Image
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        hidden
                    />
                </label>

                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Title"
                    className="form-control m-2"
                    value={title}
                />
                <input
                    type="text"
                    name="author"
                    onChange={handleChange}
                    placeholder="Author Name"
                    className="form-control m-2"
                    value={author}
                />

                <input
                    type="text"
                    name="location"
                    onChange={handleChange}
                    placeholder="Your Location"
                    className="form-control m-2"
                    value={location}
                />

                {/* <AlgoliaPlaces
                    className="form-control m-2"
                    placeholder="Location"
                    defaultValue={location}
                    options={config}
                    onChange={({ suggestion }) =>
                        setLocation(suggestion.value)}
                /> */}

                <textarea
                    name="content"
                    onChange={handleChange}
                    placeholder="Content"
                    className="form-control m-2"
                    value={content}
                />

                <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    placeholder="Price"
                    className="form-control m-2"
                    value={price}
                />

                <input
                    type="text"
                    name="genre"
                    onChange={handleChange}
                    placeholder="Select a Genre"
                    className="form-control m-2"
                    value={genre}
                />

                {/* <Select defaultValue="Select a Genre" style={{ width: 220 }} onChange={handleChange} className="form-control m-2">
                    <Option name="selfHelp" value="selfHelp">Self-Help</Option>
                    <Option value="thriller">Thriller</Option>
                    <Option value="fiction" >
                        Fiction
                    </Option>
                    <Option value="horror" disabled>
                        Horror
                    </Option>
                    <Option value="realLife">Real-life</Option>
                </Select> */}

                <DatePicker
                    placeholder="From date"
                    className="form-control m-2"
                    onChange={(date, dateString) =>
                        setValues({ ...values, from: dateString })
                    }
                    disabledDate={(current) =>
                        current && current.valueOf() < moment().subtract(1, "days")
                    }
                />

                <DatePicker
                    placeholder="To date"
                    className="form-control m-2"
                    onChange={(date, dateString) =>
                        setValues({ ...values, to: dateString })
                    }
                    disabledDate={(current) =>
                        current && current.valueOf() < moment().subtract(1, "days")
                    }
                />


            </div>

            <button className="btn btn-outline-primary m-2">Save</button>
        </form>

    );
};

export default BookCreateForm;