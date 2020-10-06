const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

/* GET books list. */
router.get('/', (req, res) => {
  const promise = Book.find({});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

/* GET a single book with by id. */
router.get('/:book_id', (req, res, next) => {
  const promise = Book.findById(req.params.book_id);
  promise.then((book) => {
    if (!book)
      next({
        message: 'The book not found.'
      });
    res.json(book);
  }).catch((err) => {
    res.json(err);
  });
});

/* CREATE a new book. */
router.post('/', (req, res) => {
  /*
  const {name, category, publisher, year, likes} = req.body;
  const book = new Book({
    name: name,
    category: category,
    publisher: publisher,
    year: year,
    likes: likes
  });
  */
  const book = new Book(req.body);
  /*
  book.save((err, data) => {
    if (err)
      res.json(err);
    res.json({
      status: true
    });
  });
   */
  const promise = book.save();
  promise.then((data) => {
    res.json({
      status: true
    });
  }).catch((err) => {
    res.json(err);
  })
});

module.exports = router;
