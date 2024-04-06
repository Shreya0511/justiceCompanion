import { User } from "../models/userModel.js";
import { Lawyer } from "../models/lawyerModel.js";
import { Request } from "../models/requestModel.js";
import mongoose from "mongoose";
import { accessChat } from "./chatController.js";
export const createRequest = async (req, res) => {
	const { userId, lawyerId, requestType } = req.body;
	try {
		if (!userId || !lawyerId) {
			return res
				.status(404)
				.json({ message: "Please Enter all the required details!!" });
		}

		const userObject = await User.findById(userId);
		const lawyerObject = await User.findById(lawyerId);
		console.log("User Object:", userObject);
		console.log("Lawyer Object:", lawyerObject);
		if (!lawyerObject) {
			res.status(400).json(
				"The User you want to send request to, no longer exists!!"
			);
		}

		const isRequest = await Request.findOne({
			user_id: userObject._id,
			lawyer_id: lawyerObject._id,
			request_type: requestType,
		});
	console.log(isRequest);


		if (!isRequest) {
			var requestData = {
				user_id: userId,
				lawyer_id: lawyerId,
				request_type: requestType,
			};
	console.log(requestData);



			try {
				const createdRequest = await Request.create(requestData);
	  console.log(createdRequest);


				const FullRequest = await Request.findOne({
					_id: createdRequest._id,
				})
					.populate("user_id", "-password")
					.populate("lawyer_id", "-password");

				res.status(200).json({
					status: "success",
					message: "Request made successfully!!",
					newRequest: {
						FullRequest,
					},
				});
			} catch (err) {
				res.status(400);
				console.log("Error", err);
			}
		} else {
			return res.status(400).json({
				message:
					"You have already made a request to this user....Please wait untill the user approves!!",
			});
		}
	} catch (error) {
		console.error("Error creating request:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const request = await Request.findById(requestId);

		if (!request) {
			return res.status(404).json({ message: "Request not found" });
		}

		await Request.findByIdAndDelete(requestId);
		res.status(200).json({ message: "Request deleted successfully" });
	} catch (error) {
		console.error("Error deleting request:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getUserRequests = async (req, res) => {
	try {
		console.log("Request Params:", req.params);
		const { userId } = req.params;
		const userRequests = await Request.find({ user_id: userId });

		if (!userRequests.length) {
			return res.status(200).json(null);
		}

		res.status(200).json(userRequests);
	} catch (error) {
		console.error("Error fetching user requests:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getLawyerRequests = async (req, res) => {
	try {
		const { lawyerId } = req.params;
		const lawyerRequests = await Request.find({ lawyer_id: lawyerId });

		if (!lawyerRequests.length) {
			return res.status(200).json(null);
		}

		res.status(200).json(lawyerRequests);
	} catch (error) {
		console.error("Error fetching lawyer requests:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const acceptRequest = async (req, res) => {
	// console.log("accp req", req.params);
	// console.log("hellll");
	try {
		// console.log("accp req", req.params);
		const requestId = req.params.requestId;
		const updatedRequest = await Request.findByIdAndUpdate(
			requestId,
			{ accepted: true, rejected: false, pending: false },
			{ new: true }
		);
		console.log(updatedRequest);
		// req.userId = updatedRequest.lawyer_id;
		accessChat(req.user._id, updatedRequest.user_id);
		res.status(200).json(updatedRequest);

	} catch (error) {
		console.error("Error accepting request:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const rejectRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const updatedRequest = await Request.findByIdAndUpdate(
			requestId,
			{ accepted: false, rejected: true, pending: false },
			{ new: true }
		);

		res.status(200).json(updatedRequest);
	} catch (error) {
		console.error("Error rejecting request:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const revokeRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const updatedRequest = await Request.findByIdAndUpdate(
			requestId,
			{ accepted: false, rejected: false, pending: true },
			{ new: true }
		);
		res.status(200).json(updatedRequest);
	} catch (error) {
		console.error("Error revoking request:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// async function clearCollection() {
// 	try {
// 		// Use the deleteMany method to remove all documents from the collection
// 		const result = await Request.deleteMany({});

// 		console.log(
// 			`${result.deletedCount} documents deleted from the collection.`
// 		);
// 	} catch (error) {
// 		console.error("Error clearing collection:", error);
// 	} finally {
// 		// Close the MongoDB connection (optional)
// 		// mongoose.connection.close();
// 	}
// }

// clearCollection();
