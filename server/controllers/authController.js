import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
const { sign, decode, verify } = jsonwebtoken;
import { promisify } from "util";
import { User } from "./../models/userModel.js";
import catchAsync from "./../Utils/catchAsync.js";
import AppError from "./../Utils/appError.js";
import { sendEmail } from "./../Utils/email.js";
import dotenv from "dotenv";
import { Lawyer } from "../models/lawyerModel.js";
dotenv.config();
import { Chat } from "../models/chatModel.js";
import { addToGroup } from "./chatController.js";

const signToken = (id) => {
  // console.log(process.env.NODE_ENV);
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + "2d" * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  if (req.body.role === "lawyer") {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      username: req.body.username,
      passwordConfirm: req.body.passwordConfirm,
      extraFields: {
        typeOfLawyer: req.body.typeOfLawyer,
        numberOfCasesFought: req.body.numberOfCasesFought,
        numberOfCasesWon: req.body.numberOfCasesWon,
        experienceInYears: req.body.experienceInYears,
        age: req.body.age,
        about: req.body.about,
        feesCharged: req.body.feesCharged,
      },
    });
  } else {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      username: req.body.username,
      passwordConfirm: req.body.passwordConfirm,
      extraFields: {
        typeOfLawyer: "not a field for user",
        numberOfCasesFought: 0,
        numberOfCasesWon: 0,
        experienceInYears: 0,
        age: 0,
        about: "not a field for user",
        feesCharged: 0,
      },
    });
  }

  res.status(201).json({
    status: "success",
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    user = await User.findOne({ username: email }).select("+password");
  }

  if (!user || user.password != password) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

export const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

export const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.body.jwt) {
    token = req.body.jwt;
  }

  if (!token) {
    // return next(

    //   new AppError('You are not logged in! Please log in to get access.', 401)
    // );
    res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access",
    });
  }

  // 2) Verification token
  const decoded = verify(token, "i-am-shreya");

  // 3) Check if user still exists
  let currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    res.status(401).json({
      status: "fail",
      message: "We are unable to find the user!! Please login again.",
    });
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfterToken(decoded.iat)) {
    res.status(401).json({
      status: "fail",
      message: "User recently changed password! Please login again",
    });
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  // res.status(200).json({
  //   status: 'success',
  // });
  next();
});

// Only for rendered pages, no errors!
export const isLoggedIn = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.body.jwt) {
    token = req.body.jwt;
  }

  if (!token) {
    res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access",
    });
  }

  // 2) Verification token
  const decoded = verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  let currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    res.status(401).json({
      status: "fail",
      message: "We are unable to find the user!! Please login again.",
    });
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfterToken(decoded.iat)) {
    res.status(401).json({
      status: "fail",
      message: "User recently changed password! Please login again",
    });
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  res.status(200).json({
    status: 'success',
    data : currentUser,
  });
  
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    user = await User.findOne({ username: req.body.email });

    if (!user) {
      return next(new AppError("There is no user with email address.", 404));
    }
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPasswordGet/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\n\n\n\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject:
        "Themesis Guardian - Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

export const resetPasswordGet = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  let user = await User.findOne({
    passwordResetToken: hashedToken,
    PasswordResetTokenExpires: { $gt: Date.now() },
  });

  console.log(user);

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    res.send("Not verified");
  }

  res.render("pages/index", { email: verify.email });
});

// export resetPasswordGet = catchAsync(async (req, res, next) => {
//   // 1) Get user based on the token
//   const hashedToken = crypto
//     .createHash('sha256')
//     .update(req.params.token)
//     .digest('hex');

//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     PasswordResetTokenExpires: { $gt: Date.now() }
//   });

//   // 2) If token has not expired, and there is user, set the new password
//   if (!user) {
//     res.send("Token is Invalid or has expired.");
//     // return next(new AppError('Token is invalid or has expired', 400));
//   }
//   // res.render("index", {email : verify.email});
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();

//   // 3) Update changedPasswordAt property for the user
//   // 4) Log the user in, send JWT
//   res.send("Done");
//   // createSendToken(user, 200, res);
// });

export const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  let user = await User.findById(req.user.id).select("+password");
  if (!user) {
    user = await Lawyer.findById(req.user.id).select("+pssword");
  }

  // 2) Check if POSTed current password is correct
  if (req.body.passwordCurrent != user.password) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
