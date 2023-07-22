const express = require("express");
const connection = require("../connection/connection");
const router = express.Router();

router.get("^/$|^/:sort$|/:sort/(:rank)?", async (req, res) => {
  const sort = req.params.sort;
  const rank = req.params.rank;
  const search = req.query.search;
  try {
    let query = "SELECT * FROM products";

    if (search) {
      query += ` WHERE id LIKE ${search} OR name LIKE ${search} OR quantity_in_stock LIKE ${search} OR description LIKE ${search} OR unit_price LIKE ${search}`;
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
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

module.exports = router;
