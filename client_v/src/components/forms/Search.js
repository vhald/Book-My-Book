import axios from "axios";
import { useState, useEffect } from "react";
import Data from './searchDum.json'


const Search = () => {
    const [query, setQuery] = useState("")
    return (
        <div>
            <input placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)} />
            {
                Data.filter(post => {
                    if (query === '') {
                        return post;
                    } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
                        return post;
                    }
                }).map((post, index) => (
                    <div className="box" key={index}>
                        <p>{post.title}</p>
                        <p>{post.author}</p>
                    </div>
                ))
            }
        </div>
    )
}
export default Search;
