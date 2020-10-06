const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

/* CREATE a new book. */
router.post('/', (req, res, next) => {
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
    })
  }).catch((err) => {
    res.json(err);
  })
});



module.exports = router;
