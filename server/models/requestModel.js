import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User ID is required"],
		},
		lawyer_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Lawyer",
			required: [true, "Lawyer ID is required"],
		},
		request_type: {
			type: String,
			enum: ["Hire", "Chat"],
			required: [true, "Request type is required"],
		},
		accepted: {
			type: Boolean,
			default: false,
		},
		rejected: {
			type: Boolean,
			default: false,
		},
		pending: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);



export const Request = mongoose.model("Request", requestSchema);
