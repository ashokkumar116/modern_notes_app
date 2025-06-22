const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');


const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname,"uploads")));
app.use("/api/auth",authRoutes);
app.use("/api/notes",noteRoutes)


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running in PORT ${port}`);
});