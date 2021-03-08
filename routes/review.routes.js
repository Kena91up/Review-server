const express = require('express')
const router = express.Router()
const Review = require('../models/Review.model');

// find reviews by Id
router.get('/review/:id', (req, res) => {
  /*
const{title, description, image, date} = req.body;
let review = {
  title: title,
  description: description,
  image: image,
  date: date 
*/

  Review.findById(req.params.userId,)
   .then((response) => {
        res.status(200).json(response)
   })
   .catch((err) => {
        res.status(500).json({
             error: 'Something went wrong',
             message: err
        })
   })
  })

  router.get('/reviews', (req, res, next) => {
       
       const restaurantId = req.query.restaurantId;
       
      Review.find({restaurantId: restaurantId})
      .then((reviews) => {
        res.status(200).json(reviews)
      })
      .catch((err) => {
          res.status(500).json({
               error: 'Something went wrong',
               message: err
          })
      })  

  })
   module.exports = router;