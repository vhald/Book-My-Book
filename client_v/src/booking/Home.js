import axios from "axios";
import { useState, useEffect } from "react";
import { allBooks } from "../actions/book";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        loadAllbooks();
    }, []);

    const loadAllbooks = async () => {
        let { data } = await axios.get(`${process.env.REACT_APP_API}/books`);
        setBooks(data);
    };


    return (
        <>
            <div className="container-fluid p-5 text-center">
                <h1>Book Your Book</h1>
                <Button type="primary" href='/search' icon={<SearchOutlined />}>
                    Search
                </Button>
            </div>
            <div className="container-fluid">

                {/* <pre>{JSON.stringify(books, null, 4)}</pre> */}
                {books.map((b) => (<SmallCard key={b._id} b={b} />))}

            </div>
        </>
    );
};

export default Home;
