import express from 'express';
import { protect } from '../controllers/authController.js';
import { addToDiscord, hasAccessToDiscord, getMessages, sendMessage, getDiscord} from '../controllers/discordController.js';

const router = express.Router();

router.route("/add/:userId").put(protect, addToDiscord);
router.route("/hasAccess/:userId").get(protect, hasAccessToDiscord);
router.route("/getMessages").get(protect, getMessages);
router.route("/sendMessage").post(protect, sendMessage);
router.route("/").get(protect, getDiscord);

export default router;
