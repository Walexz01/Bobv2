const express = require("express");
const connection = require("../connection/connection");
const router = express.Router();

router.get("^/$|^/:sort$|/:sort/(:rank)?", async (req, res) => {
  const sort = req.params.sort;
  const rank = req.params.rank;
  const search = req.query.search;
  try {
    let query = `SELECT 
    p.id AS id,
    p.order_id,
    c.customer_name,
    pm.name AS payment_method,
    p.amount AS amount_paid,
    s.name AS status_name,
    u.user_name AS seller_name,
    DATE_FORMAT(p.date, '%r') AS payment_time,
    DATE_FORMAT(p.date, '%Y-%m-%d') AS payment_date
    FROM
    payments p
        JOIN
    orders o ON p.order_id = o.id
        JOIN
    customers c ON o.customer_id = c.id
    JOIN payment_methods pm
    ON p.method_id = pm.id
    JOIN users u
    ON u.id = o.user_id
    JOIN status s
    ON o.status_id = s.id`;

    if (search) {
      query += ` WHERE p.id LIKE ${search} OR p.order_id LIKE ${search} OR c.customer_name LIKE ${search} OR pm.name LIKE ${search} OR p.amount LIKE ${search} OR s.name LIKE ${search} OR u.user_name LIKE ${search} OR p.date LIKE ${search}`;
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
