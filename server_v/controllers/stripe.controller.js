const User = require("../models/user");
const Stripe = require("stripe");
const queryString = require("query-string");
const Book = require("../models/book");
const Order = require("../models/order");

const stripe = Stripe(process.env.STRIPE_SECRET);

module.exports.createConnectAccount = async (req, res) => {
    // find user from db
    const user = await User.findById(req.user._id).exec();
    console.log("USER ==> ", user);
    // if user don't have stripe_account_id yet, create now
    if (!user.stripe_account_id) {
        const account = await stripe.accounts.create({
            type: "standard",
        });

        console.log("ACCOUNT ===> ", account);
        user.stripe_account_id = account.id;
        user.save();
    }
    // create login link based on account id (for FE to complete the onboarding )
    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,
        type: "account_onboarding",
    });
    // autofill any info such as email
    accountLink = Object.assign(accountLink, {
        "stripe_user[email]": user.email,
    });
    // console.log("ACCOUNT LINK", accountLink);
    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
    // console.log('LOGIN LINK', link);
    res.send(link);
};

// cant manipulate dates in STANDARD stripe
const updateDelayDays = async (accountId) => {
    const account = await stripe.account.update(accountId, {
        settings: {
            payouts: {
                schedule: {
                    delay_days: 7,
                },
            },
        },
    });
    return account;
};

module.exports.getAccountStatus = async (req, res) => {
    // console.log("GET ACCOUNT STATUS");
    const user = await User.findById(req.user._id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    // console.log("USER ACCOUNT RETRIEVE", account);
    // const updatedAccount = await updateDelayDays(account.id);
    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            stripe_seller: account, // update this data
        },
        { new: true } // return updated user immediately
    )
        .select("-password")
        .exec();
    console.log(updatedUser);
    res.json(updatedUser);
};

module.exports.getAccountBalance = async (req, res) => {
    const user = await User.findById(req.user._id).exec();
    try {
        const balance = await stripe.balance.retrieve({
            stripeAccount: user.stripe_account_id,
        });
        // console.log("BALANCE ===>", balance);
        res.json(balance);
    } catch (err) {
        console.log(err);
    }
};

// as this for EXPRESS STRIPE account & standards doesn't provide "edit account details" feature
module.exports.payoutSetting = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).exec();

        const loginLink = await stripe.accounts.createLoginLink(
            user.stripe_account_id,
            {
                redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
            }
        );
        // console.log("LOGIN LINK FOR PAYOUT SETTING", loginLink);
        res.json(loginLink);
    } catch (err) {
        console.log("STRIPE PAYOUT SETTING ERR ", err);
    }
};

module.exports.stripeSessionId = async (req, res) => {
    // console.log("you hit stripe session id", req.body.bookId);
    // 1. get book id from req.body
    const { bookId } = req.body;
    // 2. find the book based on book id from db
    const item = await Book.findById(bookId).populate("postedBy").exec();
    // 3. commission charges
    const fee = (item.price * 20) / 100;
    // create a session
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        // purchasing item details, it will be shown to user on checkout
        line_items: [
            {
                name: item.title,
                amount: item.price * 100, // in paisa
                currency: "inr",
                quantity: 1,
            },
        ],
        // create a payment intent with application fee and destination charges of 80%
        payment_intent_data: {
            application_fee_amount: fee * 100,
            // this seller can see his balance in FE dashboard
            transfer_data: {
                destination: item.postedBy.stripe_account_id,
            },
        },
        success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
        cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    // add this session object to user in DB
    await User.findByIdAndUpdate(req.user._id, {
        stripeSessions: session,
    }).exec();
    // send session Id as response to frontend
    res.send({
        sessionId: session.id,
    });
};

module.exports.stripeSuccess = async (req, res) => {
    try {
        const { bookId } = req.body;
        const user = await User.findById(req.user._id).exec();
        console.log(user);

        // check if user has stripeSession
        // retrieve stripe session, based on session id we previously save in user db
        if (!user.stripeSessions) return;
        const session = await stripe.checkout.sessions.retrieve(
            user.stripeSessions.id
        );
        console.log("SESSION====> ", session);
        // res.json(session);

        // if session payment status is paid, create order
        if (session.payment_status === "paid") {
            // check if order with that session id already exist by querying orders collection
            const orderExist = await Order.findOne({
                "session.id": session.id,
            }).exec();

            if (orderExist) {
                // if order exist, send success true
                res.json({ success: true });
            } else {
                // else create new order and send success true
                let newOrder = await new Order({
                    book: bookId,
                    session,
                    orderedBy: user._id,
                }).save();

                // remove user's stripeSession (don't want to save the previous session data)
                await User.findByIdAndUpdate(user._id, {
                    $set: { stripeSessions: {} },
                });
                res.json({ success: true });
            }
        }
    } catch (err) {
        console.log("STRIPE SUCCESS ERR", err);
    }
};
