const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const nodemailer = require("nodemailer");
require('dotenv').config();

const sendEmail = async (email, subject, text) => {
 try {
 const transporter = nodemailer.createTransport({
 host: process.env.HOST,
 service: process.env.SERVICE,
port: 587,
secure: true,
auth: {
user: process.env.USER,
pass: process.env.PASS,
}, });

await transporter.sendMail({
 from: process.env.USER,
 to: email,
subject: subject,
text: text });

console.log("email sent sucessfully");
} catch (error) {
 console.log(error, "email not sent"); } };

 module.exports = sendEmail;
const register = async (req,res)=>{

    try {
        const {username,password,email,contact} = req.body;
        console.log(username,password,email,contact);
        const profile_image = req.file? `/uploads/${req.file.filename}` :null;
        const sql = "INSERT INTO users (username,password,email,contact,profile_image) VALUES (?,?,?,?,?)";

        const [existing] = await db.query("SELECT * FROM users WHERE email = ? OR username=?",[email,username]);
        console.log(existing);
        if(existing.length>0){
           return res.status(400).json({message:"User Already Exists"});
        }
        const salt =await bcrypt.genSalt(10);
        const hashedPassword  =await bcrypt.hash(password,salt);

        await db.query(sql,[username,hashedPassword,email,contact,profile_image]);

        return res.status(200).json({message:"User Registered Succesfully"});
        
    } catch (error) {
        console.log(error);
       return res.status(500).json({message:"Server Error",error:error.message});
    }
};

const login = async (req,res) =>{

    console.log("Login Body",req.body);
    const sql = "SELECT * FROM users WHERE email = ? OR username = ?";

    try {
        const {username,password} = req.body;

        const [users] = await db.query(sql,[username,username]);
        if(users.length === 0){
            return res.status(400).json({message:"No User Exists"});
        }
        const user = users[0];
        const isPassMatch = await bcrypt.compare(password,user.password);
        if(!isPassMatch){
            return res.status(401).json({message:"Password Wrong"});
        }
        const token =await jwt.sign({id : user.id},process.env.JWT_KEY,{expiresIn:"1d"});

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:24*60*60*1000
        })

        return res.status(200).json({message:"Login Success"});


    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message});
    }
};

const uploadProfile = async (req,res)=>{
    const id = req.user.id;
    const profile_image =`/uploads/${req.file.filename}`;
    const sql = "UPDATE users SET profile_image = ? WHERE id = ?";
    await db.query(sql,[profile_image,id]);
    return res.status(200).json({message:"Profile Picture Uploaded"});
}

const getCurrentUser = async (req,res)=>{
    const id = req.user.id;
    const sql = "SELECT * FROM users WHERE id =?";

    const [result] = await db.query(sql,[id]);
    console.log(result[0]);
    res.json(result[0]);
}

const logout = (req,res)=>{
    res.clearCookie('token');
    res.json({message:"Logout Success"});
}

const editUser = async (req,res) =>{
    const {username,email,contact} = req.body;
    const id = req.user.id;

    const sql = "UPDATE users SET username=?,email=?,contact =? WHERE id = ?";

    try {
        
        await db.query(sql,[username,email,contact,id]);
        return res.status(200).json({message:"User Details Updated Succesfully"});

    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message}); 
    }

}

const sendOtp = async (req,res) =>{

    const {email} = req.body;

    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?",[email]);
        if(users.length === 0){
            return res.status(400).json({message:"No users Found"});
        }

        const user = users[0];
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otp_expire = new Date(Date.now()+5*60*1000);

        await db.query("UPDATE users SET otp = ?,otp_expire =? WHERE email = ?",[otp,otp_expire,email]);

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"ashokkumarpandian7@gmail.com",
                pass:process.env.APP_PASS
            }
        });

        await transporter.sendMail({
            from:"ashokkumarpandian7@gmail.com",
            to:email,
            subject:"OTP To Reset Password",
            html:`<p>Your OTP To Reset Password is <b>${otp}</b>. This OTP will expire in 5 minutes</p>`
        });

        return res.status(200).json({message:"OTP sent Succesfully"});


    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message}); 
    }


}

const verifyOtp = async(req,res) =>{
    const {otp,email} = req.body;
    console.log(otp,email);
    const [users] = await db.query("SELECT * FROM users WHERE email = ? AND otp = ? AND otp_expire > NOW()",[email,otp]);
    console.log(users);
    if(users.length === 0){
        return res.status(400).json({message : "Invalid Or Expired OTP"});
    }

    return res.status(200).json({message:"OTP verified"});

}

const passReset = async (req,res) =>{
    const {email,password} = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        await db.query("UPDATE users SET password = ? , otp = NULL , otp_expire = NULL WHERE email = ? ",[hashedPassword,email]);
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"ashokkumarpandian7@gmail.com",
                pass:process.env.APP_PASS
            }
        })

        await transporter.sendMail({
            from:"ashokkumarpandian7@gmail.com",
            to:email,
            subject:"Password Reset Done Successfully",
            html:"<p>Your password has been Reset Successfully </p> <br/> <p>Thanks and regards</p> <br/> <p>NOTES APP TEAM</p>"
        })
        return res.status(200).json({message:"Password Reset Done"});
    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message}); 
    }

}
 
module.exports = {register , login , uploadProfile , getCurrentUser,logout,editUser,sendOtp ,verifyOtp,passReset};