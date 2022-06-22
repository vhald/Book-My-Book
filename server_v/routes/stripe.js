const express = require('express');
const router = express.Router();

// middlewares
const { requireSignin } = require('../middlewares');

// controllers
const { createConnectAccount, getAccountStatus, getAccountBalance, payoutSetting, stripeSessionId, stripeSuccess } = require('../controllers/stripe.controller');


router.post("/create-connect-account", requireSignin, createConnectAccount);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.post("/get-account-balance", requireSignin, getAccountBalance);
router.post("/payout-setting", requireSignin, payoutSetting); // only if express Stripe account
router.post("/stripe-session-id", requireSignin, stripeSessionId);

//order handling
router.post("/stripe-success", requireSignin, stripeSuccess);

module.exports = router;