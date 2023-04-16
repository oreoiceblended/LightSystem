const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json()); //req.body

//Route
//create account
app.post("/accounts", async(req, res) => {
    try {
        const {username} = req.body;
        const {password} = req.body;
        const newAccount = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [username, password]
        );
        res.json(newAccount);
    } catch (error) {
        console.error(error.message);
    }
})
//signin
app.post("/signin", async(req, res) => {
    try {
        const {username} = req.body;
        const {password} = req.body;
        const Account = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        if (Account.rowCount == 1) {
            if (Account.rows[0]["password"] == [password]) {
                res.json("Log in Successfully");
            }
            else res.json("Wrong password");
        } else {
            res.json("Username not available");
        }
    } catch (error) {
        console.error(error.message);
    }
})
app.listen(5000, () => {
    console.log("listening on port 5000")
})