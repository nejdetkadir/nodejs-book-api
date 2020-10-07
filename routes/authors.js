const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

/* CREATE a new author. */
router.post('/', (req, res) => {
  const author = new Author(req.body);
  const promise = author.save();
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

/* GET authors and theirs books. */
router.get('/', (req, res) => {
  const promise = Author.aggregate([
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'author_id',
        as: 'books'
      }
    },
    {
      $unwind: {
        path: '$books',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        books: {
          $push: '$books'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        books: '$books'
      }
    }
  ]);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

/* GET single author and theirs books by id. */
router.get('/:author_id', (req, res) => {
  const promise = Author.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.author_id)
      }
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'author_id',
        as: 'books'
      }
    },
    {
      $unwind: {
        path: '$books',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        books: {
          $push: '$books'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        books: '$books'
      }
    }
  ]);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

/* UPDATE single author with by id. */
router.put('/:author_id', (req, res, next) => {
  const promise = Author.findByIdAndUpdate(req.params.author_id, req.body, {new: true});
  promise.then((author) => {
    if (!author)
      next({
        message: 'The author not found.'
      });
    res.json({
      status: true
    });
  }).catch((err) => {
    res.json(err);
  });
});

/* REMOVE single author with by id. */
router.delete('/:author_id', (req, res, next) => {
  const promise = Author.findByIdAndRemove(req.params.author_id);
  promise.then((author) => {
    if (!author)
      next({
        message: 'The author not found.'
      });
    res.json({
      status: true
    });
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
