const express = require("express");
const connection = require("../connection/connection");
const router = express.Router();
const bcrypt = require("bcrypt");
router.get("/all", async (req, res) => {
  try {
    const query = `SELECT id, user_name, role, DATE_FORMAT(registered_date, '%Y-%m-%d') AS date, img FROM users`;
    const [result] = await connection.promise().query(query);
    res.json(result);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

router.post("/", async (req, res) => {
  const { name, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users(user_name, password) VALUES(?,?)`;
    await connection.promise().query(query, [name, hashedPass]);
    res.json("User created successfully ");
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

module.exports = router;
