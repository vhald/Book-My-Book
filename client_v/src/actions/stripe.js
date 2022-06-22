import axios from "axios";

export const createConnectAccount = async (token) =>
    await axios.post(
        `${process.env.REACT_APP_API}/create-connect-account`,
        {}, // empty body
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

export const getAccountStatus = async (token) =>
    axios.post(
        `${process.env.REACT_APP_API}/get-account-status`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

export const getAccountBalance = async (token) =>
    axios.post(
        `${process.env.REACT_APP_API}/get-account-balance`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

export const currencyFormatter = (data) => {
    return (data.amount / 100).toLocaleString(data.currency, {
        style: "currency",
        currency: data.currency,
    });
};

export const payoutSetting = async (token) =>
    await axios.post(
        `${process.env.REACT_APP_API}/payout-setting`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

export const getSessionId = async (token, bookId) =>
    await axios.post(
        `${process.env.REACT_APP_API}/stripe-session-id`,
        {
            bookId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

export const stripeSuccessRequest = async (token, bookId) =>
    await axios.post(
        `${process.env.REACT_APP_API}/stripe-success`,
        { bookId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
