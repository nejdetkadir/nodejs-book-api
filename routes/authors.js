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

/* GET single author and theirs books. */
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

module.exports = router;
