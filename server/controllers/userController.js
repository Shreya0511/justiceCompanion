import { Lawyer } from "../models/lawyerModel.js";
import express from "express";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/userModel.js";
import { connections } from "mongoose";



const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.send(user);
};

//api/v1/users?search=shreya
export const getAllUsers = async (req, res, next) => {
  const param = req.query.search;
  var regex = new RegExp(param, "i");
    var users = await User.find({
      username: regex,
      name : regex,
      email : regex,
    })
  // console.log("query", req.query.search);
  // const keyword = req.query.search
  //   ? {
  //       $or: [
  //         { name: { $regex: /${req.query.search}/, $options: 'i', } },
  //         { email: { $regex: /${req.query.search}/, $options: 'i', } },
  //         {username : { $regex: /${req.query.search}/, $options: 'i', }}
  //       ],
  //     }
  //   : {};

    
    
    
    // const users = await User.find(keyword);
    // console.log("Users", users);
  
  res.send(users);
};

//api/v1/lawyers?search=shreya
export const getAllLawyers = async (req, res, next) => {
  const lawyers = await User.find({role : "lawyer"});
  res.send(lawyers);
};



export const updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    res.send("You are not allowed to change the password without validation!!");
  }

  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
    "username",
    "image"
  );

  //3. Update User document.
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      User: updatedUser,
    },
  });
};

	

export const updtateProfileImage = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const img = url + "/public/" + req.file.filename;

  req.body.image = img;

  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
    "username",
    "image"
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      User: updatedUser,
    },
  });
};
