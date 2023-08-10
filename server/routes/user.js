const express = require("express");
const connection = require("../connection/connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const varifyUser = require("../middleware/verify");
const admin = require("../middleware/authorize");
router.get("/all", admin, async (req, res) => {
  try {
    const query = `SELECT id, user_name, role, DATE_FORMAT(registered_date, '%Y-%m-%d') AS date, img FROM users`;
    const [result] = await connection.promise().query(query);
    res.json(result);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

router.post("/", admin, async (req, res) => {
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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [[user]] = await connection
      .promise()
      .query(`SELECT * FROM users WHERE user_name = ?`, [username]);

    if (user) {
      const hashedPassword = user.password;
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);

      if (isPasswordValid) {
        const payload = {
          id: user.id,
          username: user.user_name,
          role: user.role,
          img: user.img,
        };

        const jwtSecret = process.env.JWT_SECRET || "walexz";
        const jwttoken = jwt.sign(payload, jwtSecret, { expiresIn: "1d" });

        res
          .cookie("access_token", jwttoken, {
            httpOnly: true,
            secure: true,
          })
          .json(payload);
      } else {
        res.status(401).json({ error: "Incorrect password or username" });
      }
    } else {
      res.status(401).json({ error: "No user with the given name" });
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});
router.get("/verify", varifyUser, (req, res) => {
  return res.json(req.user);
});
router.get("/logout", (req, res) => {
  res.clearCookie("access_token");
  return res.json("logout successfull");
});

module.exports = router;
