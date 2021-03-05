const express = require("express");
const router = express.Router();
const axios = require("axios")

router.get("/businesses", (req, res, next) => {
  //cons {searchTerm} = req.body
  axios.get('https://api.yelp.com/v3/businesses/search', {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    },
      params:{
        location: `London`
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


// https://api.yelp.com/v3/businesses/Vaq49W0ubGjuIc4h5_qQ0w