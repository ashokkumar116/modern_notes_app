const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS || "",
    database:process.env.DB_DATABASE
});

db.getConnection().then((Connection)=>{
     console.log("DB Connected");
     Connection.release();
}).catch((err)=>{
    console.error(err);
})

module.exports = db;