const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

/* GET books list. */
router.get('/', (req, res) => {
  const promise = Book.aggregate([
    {
      $lookup: {
        from: 'authors',
        localField: 'author_id',
        foreignField: '_id',
        as: 'author'
      },
    },
    {
      $unwind: '$author'
    }
  ]);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

/* GET single book with by id. */
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

/* UPDATE single book with by id. */
router.put('/:book_id', (req, res, next) => {
  const promise = Book.findByIdAndUpdate(req.params.book_id, req.body, {new: true});
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

/* REMOVE single book with by id. */
router.delete('/:book_id', (req, res, next) => {
  const promise = Book.findByIdAndRemove(req.params.book_id);
  promise.then((book) => {
    if (!book)
      next({
        message: 'The book not found.'
      });
    res.json({
      status: true
    });
  }).catch((err) => {
    res.json(err);
  });
});

/* GET top X books by likes. */
router.get('/top/:top_num', (req, res) => {
  const top_num = req.params.top_num;
  const promise = Book.find({}).limit(parseInt(top_num)).sort({likes: -1});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

/* GET between two dates books list by year. */
router.get('/year/:start_year/:end_year', (req, res) => {
  const {start_year, end_year} = req.params;
  const promise = Book.find(
      {
        year: {
          "$gte": parseInt(start_year),
          "$lte": parseInt(end_year)
        }
      }
  );
  promise.then((data) => {
    res.json(data);
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
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

module.exports = router;
