import express from "express";
import { protect } from "../controllers/authController.js";
import { sendMessage, allMessages } from "../controllers/messageController.js";

const router = express.Router();

router.route('/').post(protect, sendMessage);
router.route('/:chatId').get(protect, allMessages);

export default router;