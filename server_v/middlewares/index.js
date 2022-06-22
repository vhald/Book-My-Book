var jwt = require("express-jwt");
const Book = require("../models/book");

// req.user
module.exports.requireSignin = jwt({
    // check for secrets and expiration of the token
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});


module.exports.bookOwner = async (req, res, next) => {
    let book = await Book.findById(req.params.bookId).exec();

    let owner = book.postedBy._id.toString() === req.user._id.toString();
    if (!owner) {
        return res.status(403).send("Unauthorized");
    }
    next();
}
