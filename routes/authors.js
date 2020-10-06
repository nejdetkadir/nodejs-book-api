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

module.exports = router;
