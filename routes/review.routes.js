const express = require('express')
const router = express.Router()
const Review = require('../models/Review.model');

// find reviews by Id
  
const{title, description, image, date} = req.body;
let review = {
  title: title,
  description: description,
  image: image,
  date: date 
}

  Review.findById(req.params.userId, review)
   .then((review) => {
        res.status(200).json(review)
   })
   .catch((err) => {
        res.status(500).json({
             error: 'Something went wrong',
             message: err
        })
   })
   module.exports = router;