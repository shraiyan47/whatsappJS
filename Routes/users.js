const express = require('express');
const User = require('../Models/User');
const sendEmail = require('../utils.js');
const router = express.Router();
const nodemailer = require('nodemailer');
const whatsappMsg = require('../whatsapputils.js');

// Create a new user
async function createUser(userData) {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    throw err;
  }
}

router.post('/', async (req, res) => {
  try {
    const savedUser = await createUser(req.body);
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users or filtered by email/phone
router.get('/', async (req, res) => {
  const { email, phone } = req.query;
  try {
    let filter = {};
    if (email) filter.email = email;
    if (phone) filter.phone = phone;

    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//// Communicate

router.post('/email/', async (req, res) => {
  try {
    const userName = req.body.name;
    const recipientEmail = req.body.email;
    const senderEmail = process.env.GOOGLE_EMAIL;
    const subject = req.body.subject;
    const content = req.body.mailbody;
    const mobile = req.body.mobile;
    const lol = [senderEmail, recipientEmail, subject, content]
    console.log("ALL DATA ", lol)

    // Set CORS headers manually
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers

    let response;

    if (!!recipientEmail || recipientEmail !== null || recipientEmail !== "") {
      response = await sendEmail(senderEmail, recipientEmail, subject, content);
    } else {
      response = "NO RECIPIENT EMAIL";
    }
    let whatsappMsgs;
    if (!!mobile && !!userName) {
      whatsappMsgs = await whatsappMsg(mobile, userName);
    } else {
      whatsappMsgs = "ERROR DATA INPUT";
      console.log(whatsappMsgs);
    }
    res.json({ "msg": `${recipientEmail} got the mail!`, "response": response, "whatsapp": whatsappMsgs });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
