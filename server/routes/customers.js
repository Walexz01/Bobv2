const express = require("express");
const connection = require("../connection/connection");
const router = express.Router();

router.get("^/$|^/:sort$|/:sort/(:rank)?", async (req, res) => {
  const sort = req.params.sort;
  const rank = req.params.rank;
  const search = req.query.search;
  try {
    let query = "SELECT * FROM customers";

    if (search) {
      query += ` WHERE customer_name LIKE ${search} OR address LIKE ${search} OR id LIKE ${search}`;
    }

    if (sort) {
      query += ` ORDER BY ${sort}`;
    } else {
      query += ` ORDER BY id`;
    }

    if (rank) {
      query += ` ${rank}`;
    } else {
      query += ` asc`;
    }

    const [result] = await connection.promise().query(query);
    res.json(result);
    console.log(query);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

module.exports = router;
