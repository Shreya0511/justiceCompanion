import { Chat } from "./../models/chatModel.js";
import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import { Lawyer } from "../models/lawyerModel.js";

export const accessChat = asyncHandler(async (lawyerid, userid) => {
  // const { userId } = req.body;

  if (!userid) {
    console.log("userId Param not sent with request!!");
    return res.statusCode(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userid } } },
      { users: { $elemMatch: { $eq: lawyerid } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name image email",
  });

  if (isChat.length > 0) {
    // console.log(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [userid, lawyerid],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");

      // res.status(200).json(FullChat);
    } catch (err) {
      // res.status(400);
      console.log("Error", err);
    }
  }
});

export const fetchChats = asyncHandler(async (req, res) => {
  try {
    let user = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name image email",
        });

        res.status(200).send(results);
      });
  } catch (err) {
    res.status(400);
    console.log("Error", err);
  }
});

export const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the fields." });
  }
  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).send({
      message: "More than two users are required for creating a group!!",
    });
  }
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (err) {
    console.log("Error", err);
    res.send(400);
  }
});

export const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
  } else {
    res.status(200).json(updatedChat);
  }
});

export const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

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
    res.status(200).json(added);
  }
});

export const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-populate")
    .populate("groupAdmin", "-populate");

  if (!removed) {
    res.status(404);
  } else {
    res.status(200).json(removed);
  }
});

export const deleteGroup = asyncHandler(async (req, res) => {
  const chatId = req.params.id;
  if (!chatId) {
    res.send("Please do select the chat to delete!!");
  }

  const chat = await Chat.findByIdAndDelete(chatId);

  if (!chat) {
    res.send("No Chat with this id is found!!");
  }

  res.status(204).json({
    status: "success",
  });
});

export const getChats = async (req, res) => {
  const userId = req.user.id;
  const param = req.query.search;
  var regex = new RegExp(param, "i");
  try {
    var isChat = await Chat.find({
      isGroupChat: true,
      users: { $elemMatch: { $eq: userId } },
      chatName: regex,
    })
      .populate("users", "-password")
      .populate("latestMessage");

    console.log("chat", isChat, " ", req.query.search);

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name image email",
    });

    res.status(200).json(isChat);
  } catch (err) {
    console.log("err", err);
  }
};
