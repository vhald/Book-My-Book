import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getAccountStatus } from "../actions/stripe";
import { updateUserInLocalStorage } from "../actions/auth";

const StripeCallback = () => {
    const { auth } = useSelector((state) => ({ ...state })); // get the auth from state
    const dispatch = useDispatch(); // update redux state with user status

    // if auth state changes or any component mounts
    useEffect(() => {
        if (auth && auth.token) {
            accountStatus();
        }
    });

    const accountStatus = async () => {
        try {
            const res = await getAccountStatus(auth.token);
            // console.log("USER ACCOUNT STATUS ON STRIPE CALLBACK", res);
            //update user in localStorage
            updateUserInLocalStorage(res.data, () => {
                // update user in redux
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: res.data,
                });
                //redirect user to dashboard
                window.location.href = "/dashboard/seller";
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex justify-content-center p-5">
            <LoadingOutlined className="display-1 p-5 text-danger" />
        </div>
    );
};

export default StripeCallback;
