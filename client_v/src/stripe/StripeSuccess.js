import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../actions/stripe";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons'


const StripeSuccess = () => {
    const param = useParams();
    const navigate = useNavigate();
    const { auth } = useSelector((state) => ({ ...state }));
    const { token } = auth;

    useEffect(() => {
        // console.log(
        //     "checking to send this BookId to backend to create order",
        //     param.bookId
        // );
        stripeSuccessRequest(token, param.bookId).then((res) => {
            if (res.data.success) {
                // console.log("stripe success response", res.data);
                navigate("/dashboard");
            } else {
                navigate("/stripe/cancel");
            }
        });
    }, [param.bookId]);

    return (
        <div className="container">
            <div className="d-flex justify-content-center p-5">
                {/* <h2 className="text-center p-5">Payment success. {param.bookId}</h2> */}
                <LoadingOutlined className="display-1 text-danger" />
            </div>
        </div>
    );
};

export default StripeSuccess;
