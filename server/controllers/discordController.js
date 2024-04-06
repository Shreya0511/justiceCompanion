import { Chat } from "./../models/chatModel.js";
import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import { Message } from "../models/messageModel.js";

export const addToDiscord = asyncHandler(async (req, res) => {
	const { userId } = req.params;
	const chatId = process.env.discordChatId;
	console.log("userId", userId);
	const added = await Chat.findByIdAndUpdate(
		chatId,
		{
			$push: { users: userId },
		},
		{
			new: true,
		}
	)
		.populate("users", "-populate")
		.populate("groupAdmin", "-populate");
	
	if (!added) {
		res.status(404);
	} else {
		console.log("added", added);
		res.status(200).json(added);
	}
});

export const hasAccessToDiscord = asyncHandler(async (req, res) => {
	try {
		console.log("hasAccessToDiscord");
		// console.log("req.params", req.params);
		const { userId } = req.params;
		console.log("userId", userId);
		const chatId = process.env.discordChatId;
		const chat = await Chat.findById(chatId);
		if (!chat) {
			res.status(404).json({ error: "Chat not found" });
		} else {
			const user = await User.findById(userId);
			if (!user) {
				res.status(404).json({ error: "User not found" });
			} else {
				if (chat.users.includes(userId)) {
					res.status(200).json({ hasAccess: true });
				} else {
					res.status(200).json({ hasAccess: false });
				}
			}
		}
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
export const getMessages = asyncHandler(async (req, res) => {
	const chatId = process.env.discordChatId;
	try {
		// console.log("fetching messages");
		const message = await Message.find({ chat: chatId })
			.populate("sender", "name image email")
			.populate("chat");
		// console.log(message);
		res.send(message);
	} catch (err) {
		res.status(400);
	}
});

export const sendMessage = asyncHandler(async (req, res) => {
    const { message, userId } = req.body;
    const chatId = process.env.discordChatId;
    const newMessage = new Message({
        sender: userId,
        content: message,
        chat: chatId,
    });
    const savedMessage = await newMessage.save();
    if (!savedMessage) {
        res.status(400).json({ error: "Message not saved" });
    } else {
        console.log("savedMessage", savedMessage);
        res.status(200).json(savedMessage);
    }
});


export const getDiscord = async (req, res) => {
	try{
		console.log("getDiscord");
		const chatId = process.env.discordChatId;
		const chat = await Chat.findById(chatId)
			.populate("users", "-populate")
			.populate("groupAdmin", "-populate");
		if (!chat) {
			res.status(404).json({ error: "Chat not found" });
		} else {
			res.status(200).json(chat);
		}
	}
	catch(err){
		res.status(404).json({ error: err.message });
	}
}