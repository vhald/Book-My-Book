import axios from "axios";

export const register = async (user) =>
    await axios.post(`${process.env.REACT_APP_API}/register`, user);

export const login = async (user) =>
    await axios.post(`${process.env.REACT_APP_API}/login`, user);

// update the user to local storage
export const updateUserInLocalStorage = async (user, next) => {
    if (window.localStorage.getItem("auth")) {
        let auth = JSON.parse(localStorage.getItem("auth")); // auth with updated infos
        auth.user = user;
        localStorage.setItem("auth", JSON.stringify(auth)); // update local storage
        next(); // later redirect user user to other page
    }
};

//
