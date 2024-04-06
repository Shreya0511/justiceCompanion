import express from 'express';
import { protect } from '../controllers/authController.js';
import { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup, deleteGroup, getChats } from '../controllers/chatController.js';

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);
router.route("/deleteGroup/:id").delete(protect, deleteGroup);
router.route("/getChats").get(protect, getChats);

export default router;
