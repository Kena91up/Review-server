const router = require("express").Router();
const Review = require('../models/Review.model');

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

router.post('/add-review', (req, res, next) => {
  Review.create(req.body)
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(500).json({
      error: 'Something went wrong',
      message: err
 })
  })
})


module.exports = router;
