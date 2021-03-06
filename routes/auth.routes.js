const express = require("express");
const router = express.Router();
const uploader = require("../config/cloudinary.config");
const Review = require("../models/Review.model");

//we installed bcrypt.js
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  // -----SERVER SIDE VALIDATION ----------

  if (!username || !email || !password) {
    res.status(500).json({
      errorMessage: "Please enter username, email and password",
    });
    return;
  }
  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).json({
      errorMessage: "Email format not correct",
    });
    return;
  }
  const myPassRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  );
  if (!myPassRegex.test(password)) {
    res.status(500).json({
      errorMessage:
        "Password needs to have 8 characters, a number and an Uppercase alphabet",
    });
    return;
  }

  // NOTE: We have used the Sync methods here.
  // creating a salt
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  User.create({ username, email, passwordHash: hash })
    .then((user) => {
      // ensuring that we don't share the hash as well with the user
      user.passwordHash = "***";
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(500).json({
          errorMessage: "username or email entered already exists!",
          message: err,
        });
      } else {
        res.status(500).json({
          errorMessage: "Something went wrong! Try again!",
          message: err,
        });
      }
    });
});

// will handle all POST requests to http:localhost:5005/api/signin
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  // -----SERVER SIDE VALIDATION ----------

  if (!email || !password) {
    res.status(500).json({
      error: "Please enter email and password",
    });
    return;
  }
  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).json({
      error: "Email format not correct",
    });
    return;
  }

  // Find if the user exists in the database
  User.findOne({ email })
    .then((userData) => {
      //check if passwords match
      bcrypt
        .compare(password, userData.passwordHash)
        .then((doesItMatch) => {
          //if it matches
          if (doesItMatch) {
            // req.session is the special object that is available to you
            userData.passwordHash = "***";
            req.session.loggedInUser = userData;

            res.status(200).json(userData);
          }
          //if passwords do not match
          else {
            res.status(500).json({
              error: "Passwords does not match",
            });
            // return;
          }
        })
        .catch(() => {
          res.status(500).json({
            error: "Email format not correct",
          });
          return;
        });
    })
    //throw an error if the user does not exists
    .catch((err) => {
      res.status(500).json({
        error: "Email does not exist",
        message: err,
      });
      return;
    });
});

// will handle all POST requests to http:localhost:5005/api/logout
router.post("/logout", (req, res) => {
  req.session.destroy();
  // Nothing to send back to the user
  res.status(204).json({});
});

// middleware to check if user is loggedIn
const isLoggedIn = (req, res, next) => {
  if (req.session.loggedInUser) {
    //calls whatever is to be executed after the isLoggedIn function is over
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized user",
      code: 401,
    });
  }
};

// THIS IS A PROTECTED ROUTE
// will handle all get requests to http:localhost:5005/api/user
router.get("/user", isLoggedIn, (req, res, next) => {
  Review.find({ userId: req.session.loggedInUser._id }).then((reviews) => {
    res.status(200).json({ ...req.session.loggedInUser, reviews });
  });
});
// add some extra details in user profile
router.patch("/user", isLoggedIn, (req, res, next) => {
  let id = req.session.loggedInUser._id;
  const { country, favorite, profileimage } = req.body;
  console.log()
  User.findByIdAndUpdate( id, { country, favorite, profileimage }, { new: true })
    .then((response) => {
      req.session.loggedInUser= response
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "Something went wrong edditing profile",
        message: err,
      });
    });
});
//delete for user profile
router.delete("/profile/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
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

module.exports = router;
