let userState;

if (window.localStorage.getItem("auth")) {
    userState = JSON.parse(window.localStorage.getItem("auth"));
} else {
    userState = null; // {}
}

// create user reducer function
// {type: "LOGGED_IN_USER", payload: {user: '', role: 'SELLER or BUYER'}}
export const authReducer = (state = userState, action) => {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return { ...state, ...action.payload };
        case "LOGOUT":
            return action.payload;
        default:
            return state;
    }
};
