const express = require('express');
const { register ,login, uploadProfile, getCurrentUser,logout,editUser ,sendOtp ,verifyOtp,passReset} = require('../controllers/authController');
const router = express.Router();
const upload = require("../middlewares/profile_upload.js");
const auth = require('../middlewares/auth')
router.post('/register',upload.single("profile_image"),register);
router.post('/login',login);
router.post('/logout',logout);
router.put('/profile_upload',auth,upload.single("profile_image"),uploadProfile);
router.get('/me',auth,getCurrentUser);
router.put('/editprofile',auth,editUser);
router.post('/sendotp',sendOtp);
router.post('/verifyotp',verifyOtp);
router.put('/passreset',passReset);

module.exports = router;