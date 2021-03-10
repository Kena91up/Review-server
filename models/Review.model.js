const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  image: String,
  description: String,
  rating: String,
  date: Date,
  restaurantId: String,
  restaurantName: String,
  restaurantLocation: String,
});

const Review = model("Review", reviewSchema);

module.exports = Review;
