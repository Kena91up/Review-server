const express = require("express");
const router = express.Router();
const axios = require("axios");
const Review = require('../models/Review.model');

router.get("/businesses", (req, res, next) => {
  
  axios.get('https://api.yelp.com/v3/businesses/search?location=${locationSearched}', {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    },
      params:{
        city: 'London',
        limit: 50,
      }
  })
  .then((response) =>{
    res.status(200).json(response.data)
  })
  .catch((err) =>{
    console.log(err)
  })
});

//route to handle dynamic searches for restaurant details

router.get("/businesses/:restaurantId", (req, res, next) => {
  axios.get(`https://api.yelp.com/v3/businesses/${req.params.restaurantId}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  })
  .then((response) =>{
    res.status(200).json(response.data)
  })
  .catch((err) =>{
    console.log(err)
  })
});

//request to the API to handle saving of restaurant name and city to be displayed on user's profile


module.exports = router;


// https://api.yelp.com/v3/businesses/Vaq49W0ubGjuIc4h5_qQ0w