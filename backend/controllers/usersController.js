const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(500).json({
    status: "error",
    message: "This rout is not defined yet.",
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This rout is not defined yet.",
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This rout is not defined yet.",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This rout is not defined yet.",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This rout is not defined yet.",
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) ERROR when user POST password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "You cant update your password on this route. Please use route /updatePassword"
      ),
      400
    );
  }
  //2) Filtered the unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  //3)Update user document

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

//Delete the user
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
