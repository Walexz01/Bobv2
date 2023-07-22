const express = require("express");
const connection = require("../connection/connection");
const router = express.Router();

router.get("^/$|^/:sort$|/:sort/(:rank)?", async (req, res) => {
  const sort = req.params.sort;
  const rank = req.params.rank;
  const search = req.query.search;
  try {
    let query = `SELECT 
    o.id,
    c.customer_name,
    o.total_amount,
    u.user_name AS seller,
    s.name AS status_name,
    DATE_FORMAT( o.order_date, '%r') AS order_time,
    DATE_FORMAT( o.order_date, '%Y-%m-%d') AS order_date
    FROM
    orders o
    JOIN
    customers c ON customer_id = c.id
        JOIN
    status s ON o.status_id = s.id
    JOIN users u
    ON u.id = o.user_id
    `;

    if (search) {
      query += ` WHERE o.id LIKE ${search} OR c.customer_name LIKE ${search} OR o.order_date LIKE ${search} OR o.total_amount LIKE ${search} OR u.user_name LIKE ${search} OR s.name LIKE ${search}`;
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
