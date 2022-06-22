const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const orderSchema = new Schema(
    {
        book: {
            type: ObjectId,
            ref: "Book",
        },
        session: {},
        orderedBy: {
            type: ObjectId,
            ref: "User",
        },
    }, { timestamps: true }
);


module.exports = mongoose.model("Order", orderSchema);
