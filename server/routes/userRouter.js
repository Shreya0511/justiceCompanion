import express from "express";
import crypto from "crypto";
import { User } from "../models/userModel.js";
import multer from "multer";
// import imagee from './../../client/src/images'

import {
	login,
	signup,
	logout,
	forgotPassword,
	resetPasswordGet,
	updatePassword,
	protect,
	isLoggedIn,
} from "../controllers/authController.js";

import {
	getMe,
	getUser,
	getAllUsers,
	getAllLawyers,
	updateMe,
	updtateProfileImage,
} from "../controllers/userController.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.get("/resetPasswordGet/:token", resetPasswordGet);
router.post("/isLoggedIn", isLoggedIn);
router.get("/searchUsers", getAllUsers);
router.get("/getLawyers", getAllLawyers);
router.get("/getUser/:id", getUser);
router.patch("/updateMe", protect, updateMe);
router.patch("/updatePassword", protect, updatePassword);



const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
	  const uniqueSuffix = Date.now();
	  cb(null, uniqueSuffix + file.originalname);
	}
  })
  
  const upload = multer({ storage: storage })


router.patch("/updateProfileImage", protect, upload.single("image"), async (req, res) => {
	const imagename = req.file.filename;
	req.body.image = imagename;

	const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true,
		runValidators: true,
	  });

	  res.status(200).json({
		status: "success",
		data: {
		  User: updatedUser,
		},
	  });
});



router.post("/resetPasswordGet/:token", async (req, res) => {
	const hashedToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		PasswordResetTokenExpires: { $gt: Date.now() },
	});

	if (!user) {
		res.send("Token is Invalid or has expired.");
	}
	console.log(user);
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	const loginLink = "http://localhost:3000/login";
	res.render("pages/loginRedirection");
});

// router.patch("/updatePassword", protect, updatePassword);
router.get("/me/:id", getMe, getUser);
// router.patch("/updateMe", protect, updateMe);

export default router;
