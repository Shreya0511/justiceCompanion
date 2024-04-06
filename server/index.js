import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
dotenv.config();

const app = express();
import userRoutes from "./routes/userRouter.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import discordRoutes from "./routes/discordRoutes.js";
import { Chat } from "./models/chatModel.js";

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/public", express.static("public"));
app.options("*", cors());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use("/uploads", express.static("uploads"));
// app.get('/api', function(req, res) {
//     res.render('pages/loginRedirection');
//   });

app.use(
	"/api/v1/users",
	(req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
		);
		next();
	},
	userRoutes
);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/requests", requestRoutes);
app.use("/api/v1/discord", discordRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

const CONNECTION_URL = process.env.DATABASE;
const PORT = process.env.PORT;

mongoose
	.connect(CONNECTION_URL)
	.then(() => console.log("Successfully Connected to Database!!"))
	.catch((error) => {
		console.log(error.message);
	});

const server = app.listen(PORT, () => {
	console.log(`Server is Running on Port : ${PORT}`);
});

const io = new Server(server, {
	pingTimeout: 60000,
	cors: {
		origin: "http://localhost:3000",
	},
});

io.on("connection", (socket) => {
	// console.log("connected to socket.io");

	socket.on("setup", (userData) => {
		socket.join(userData._id);
		socket.emit("connected");
	});

	socket.on("join chat", (room) => {
		socket.join(room);
		console.log("user joined the room", room);
	});
	socket.on("join discord", () => {
		const room = process.env.discordChatId;
		socket.join(room);
		console.log("user joined the room discord", room);
	});
	socket.on("new message", (newMessageReceived) => {
		var chat = newMessageReceived.chat;

		if (!chat.users) return console.log("chat.users not defined!!");

		chat.users.forEach((user) => {
			if (user._id === newMessageReceived.sender._id) return;
			socket.in(user._id).emit("message received", newMessageReceived);
		});
	});

	socket.off("setup", () => {
		console.log("USER DISCONNECTED");
		socket.leave(userData._id);
	  });

	
});
