const express = require("express");
const router = express.Router();
const axios = require("axios")

router.get("/businesses", (req, res, next) => {
  //cons {searchTerm} = req.body
  axios.get('https://api.yelp.com/v3/categories/{alias}', {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    },
      params:{
        location: 'Paris'
      }
  })
  .then((response) =>{
    res.status(200).json(response.data)
  })
  .catch((err) =>{
    console.log(err)
  })
});
module.exports = router;