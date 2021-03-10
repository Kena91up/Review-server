const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");
const axios = require("axios");

// find reviews by Id
router.get("/review/:id", (req, res) => {
  Review.findById(req.params.userId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

  router.get('/reviews', (req, res, next) => {
       
       const restaurantId = req.query.restaurantId;
       
      Review.find({restaurantId: restaurantId}).populate('userId')
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
     router.post("/add-review", (req, res, next) => {
      axios
        .get(`https://api.yelp.com/v3/businesses/${req.body.restaurantId}`, {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        })
        .then((response) => {
          Review.create({
            ...req.body,
            userId: req.session.loggedInUser._id,
            restaurantName: response.data.name,
            restaurantLocation: response.data.location.city,
          })
            .then((data) => {
              res.status(200).json(data);
            })
            .catch((err) => {
              res.status(500).json({
                error: "Something went wrong",
                message: err,
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            error: "Something went wrong",
            message: err,
          });
        });
    });

  
   module.exports = router;
