const express = require('express'),
app = express(),
router = express.Router(),
book_controller = require('../controllers/books.controller');

//*************** bestseller_books ***************
router.get("/api/bestseller_books", book_controller.get_books);

router.get("/api/bestseller_books/:id",book_controller.get_books_byId);

router.post("/api/bestseller_books/",book_controller.insertBook);

router.delete("/api/bestseller_books/:id",book_controller.deleteBookbyId);

module.exports = router;
