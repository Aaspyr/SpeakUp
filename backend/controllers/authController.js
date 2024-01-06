const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

//   createSendToken(newUser, 201, res);
// name: req.body.name,
// email: req.body.email,
// password: req.body.password,
// passwordConfirm: req.body.passwordConfirm,
// passwordChangedAt: req.body.passwordChangedAt,
//});
