const { Schema, model } = require("mongoose");

const reviewSchema = new Schema ({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    },
    title: String,
    image: String,
    description: String,
    date:{
       type: Date,
       default: Date.now
    }
})

const Review = model("Review", reviewSchema);

module.exports = Review;