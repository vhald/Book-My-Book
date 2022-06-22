const Book = require("../models/book");
const fs = require("fs");
const Order = require("../models/order");

module.exports.create = async (req, res) => {
    console.log("req.fields", req.fields);
    console.log("req.files", req.files);
    try {
        let fields = req.fields; // form Data
        let files = req.files; // image

        let book = new Book(fields);
        book.postedBy = req.user._id;
        // handle image
        if (files.image) {
            book.image.data = fs.readFileSync(files.image.path); // read file
            book.image.contentType = files.image.type; // get content type
        }

        book.save((err, result) => {
            if (err) {
                console.log("saving book err => ", err);
                res.status(400).send("Error saving");
            }
            res.json(result);
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message,
        });
    }
};

module.exports.books = async (req, res) => {
    // let all = await Book.find({ from: { $gte: new Date() } })
    let all = await Book.find({})
        .limit(25)
        .select("-image.data") // make the data load faster without image, making separated endpoint for image
        .populate("postedBy", "_id name") // avoiding hashpass
        .exec();
    console.log(all);
    res.json(all);
};

module.exports.image = async (req, res) => {
    let book = await Book.findById(req.params.bookId);
    if (book && book.image && book.image.data !== null) {
        res.set("Content-Type", book.image.contentType);
        return res.send(book.image.data);
    }
};

module.exports.sellerBooks = async (req, res) => {
    let all = await Book.find({ postedBy: req.user._id })
        .select("-image.data")
        .populate("postedBy", "_id name")
        .exec();
    console.log(all);
    res.send(all);
};

module.exports.remove = async (req, res) => {
    let removed = await Book.findByIdAndDelete(req.params.bookId)
        .select("-image.data")
        .exec();
    res.json(removed);
};

module.exports.read = async (req, res) => {
    let book = await Book.findById(req.params.bookId)
        .populate("postedBy", "_id name")
        .select("-image.data")
        .exec();
    // console.log("SINGLE BOOK", book);
    res.json(book);
};

module.exports.update = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;

        let data = { ...fields };

        if (files.image) {
            let image = {};
            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type;

            data.image = image;
        }

        let updated = await Book.findByIdAndUpdate(req.params.bookId, data, {
            new: true,
        }).select("-image.data");

        res.json(updated);
    } catch (err) {
        console.log(err);
        res.status(400).send("Book update failed. Try again.");
    }
};

module.exports.userBookBookings = async (req, res) => {
    const all = await Order.find({ orderedBy: req.user._id })
        .select("session")
        .populate("book", "-image.data")
        .populate("orderedBy", "_id name")
        .exec();
    res.json(all);
};

module.exports.isAlreadyBooked = async (req, res) => {
    const { bookId } = req.params;
    // find orders of the currently logged in user
    const userOrders = await Order.find({ orderedBy: req.user._id })
        .select("book")
        .exec();
    // check if book id is found in userOrders array
    let ids = [];
    for (let i = 0; i < userOrders.length; i++) {
        ids.push(userOrders[i].book.toString());
    }
    console.log(ids);
    res.json({
        ok: ids.includes(bookId),
    });
};
