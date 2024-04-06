import asyncHandler from 'express-async-handler';
import { Message } from '../models/messageModel.js';
import { User } from '../models/userModel.js';
import { Chat } from '../models/chatModel.js';

export const sendMessage = asyncHandler(async (req, res) => {
    const {content, chatId} = req.body;

    if(!content || !chatId){
        console.log("Invalid Data passed into the request!!");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender : req.user._id,
        content : content,
        chat : chatId,
    };

    try{
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name image");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path : "chat.users",
            select : "name image email"
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage : message,
        });

        res.json(message);
    }
    catch(err){
          res.status(400);
    }
});

export const allMessages = asyncHandler(async (req, res) => {
    try{
        console.log("hii");
       const message = await Message.find({chat: req.params.chatId})
       .populate("sender", "name image email")
       .populate("chat");
        // console.log(message);
       res.send(message);
    }
    catch(err){
        res.status(400);
    }
})

// Shreya Singh is currently  pursuing Bachelor of Technology from Indian Institute of Information Technology, Jabalpur in Computer Science and Engineering Discipline. She is currently in her sixth semester. She is originally from Bihar and has completed her schooling from there only. She has started her programming journey in her first year with C language, later on she switched to C++ and started practicing competitive programming on platforms like Codechef and Codeforces. This shows her problem solving skills and critical thinking. She has solved more than 600 questions on platforms like Leetcode and Geeks for geeks, which shows her efficiency in Data Structures and Algorithms. During her second year she parallelly started exploring web development. She has learnt various web development technologies. She is proficient in JavaScript in MERN Stack. she has worked in HTML, CSS, Javascript, React, Express and MongoDb, Bootstrap, tailwind etc. She is also familiar with sequel databases like SQL and PHP and languages like Python and Java. She has participated in many hackathons and made some good projects which showcase her good knowledge in development. She is one of the core member of the programming club of her Institute. She has organized many sessions and hands on workshops along with other members of the club. She was also selected as programming mentor to help students starting off their programming journey. She was among the top 20 girl students in around 16,000 participants who were offered SDE Intern role at Flipkart through Flipkart Runway program 2023.  Throughout her summer break, that is May-July 2023, she had been working in Flipkart as an Intern and was part of the Search Services team. She has immense ability to adapt which she has shown by her work experience. She is really very optimistic, hard working, coordinating and has good leadership and communication skills as well. I really believe she would be a great fit for Intuit.