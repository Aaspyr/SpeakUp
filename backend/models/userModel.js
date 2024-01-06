const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    maxLength: [20, "A user name must have max 20 characters"],
    minLength: [3, "A user name must have min 3 characters"],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "A user must have an email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address",
    },
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "A user must have a password"], //DV
    minLength: [8, "A user password must have at least 8 characters"], //DV
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"], //DV
    validate: {
      //This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
