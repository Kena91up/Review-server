const router = require("express").Router();
const Review = require("../models/Review.model");
const axios = require("axios");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

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
