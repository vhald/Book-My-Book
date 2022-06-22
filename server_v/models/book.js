const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: "Title is required",
        },
        author: {
            type: String,
            required: "Author is required",
        },
        content: {
            type: String,
            required: "Content is required",
            maxlength: 10000,
        },
        location: {
            type: String,
        },
        price: {
            type: Number,
            required: "Price is required",
            trim: true,
        },
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
        image: {
            // later when deploying change to string value
            data: Buffer,
            contentType: String,
        },
        from: {
            type: Date,
        },
        to: {
            type: Date,
        },
        genre: {
            type: String,
            required: "Genre is required",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
