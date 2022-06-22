const express = require('express');
const formidable = require('express-formidable');
const router = express.Router();


// middlewares
const { requireSignin, bookOwner } = require('../middlewares');

const { create, books, image, sellerBooks, remove, read, update, userBookBookings, isAlreadyBooked } = require('../controllers/book.controller');



router.post('/create-book', requireSignin, formidable(), create);
router.get("/books", books);
router.get("/book/image/:bookId", image);
router.get('/seller-books', requireSignin, sellerBooks);
router.delete('/delete-book/:bookId', requireSignin, bookOwner, remove);
router.get("/book/:bookId", read);
router.put('/update-book/:bookId', requireSignin, bookOwner, formidable(), update);

// orders
router.get("/user-book-bookings", requireSignin, userBookBookings);
router.get("/is-already-booked/:bookId", requireSignin, isAlreadyBooked);

// search

module.exports = router;
