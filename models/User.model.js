const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: String, 
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  profileimage: {
    type: String,
    default:'https://res.cloudinary.com/havya16/image/upload/v1614781683/Reviewproject/user_sxem4m.png'
  },
  country: String,
  favorite: String
})

const User = model("User", userSchema);

module.exports = User;
