const express = require("express");
const connection = require("../connection/connection");
const { getPagination } = require("../controller/pagination");
const router = express.Router();

router.get("/", async (req, res) => {
  const { search, rank, sort, page, size } = req.query;
  const currentPage = page ? page - 1 : 0;

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

    let countquery = `SELECT 
    count(p.id) AS count,
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
    let countparams = [];

    if (search) {
      countquery += ` WHERE p.id LIKE ? OR p.order_id LIKE ? OR c.customer_name LIKE ? OR pm.name LIKE ? OR p.amount LIKE ? OR s.name LIKE ? OR u.user_name LIKE ? OR p.date LIKE ?`;
      countparams.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    } else {
      countquery;
    }

    let [[totalItems]] = await connection
      .promise()
      .query(countquery, countparams);
    let count = totalItems.count;
    const { limit, offset, totalPages } = getPagination(
      currentPage,
      size,
      count
    );

    let queryParams = [];

    if (search) {
      query += ` WHERE p.id LIKE ? OR p.order_id LIKE ? OR c.customer_name LIKE ? OR pm.name LIKE ? OR p.amount LIKE ? OR s.name LIKE ? OR u.user_name LIKE ? OR p.date LIKE ?`;
      queryParams.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    }

    if (sort) {
      query += ` ORDER BY ${sort}`;
    } else {
      query += ` ORDER BY id`;
    }

    if (rank) {
      query += ` ${rank} LIMIT ${limit} OFFSET ${offset}`;
    } else {
      query += ` asc LIMIT ${limit} OFFSET ${offset}`;
    }
    const [result] = await connection.promise().query(query, queryParams);
    res.json({
      totalItems: count,
      totalPages,
      currentPage,
      results: result,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

module.exports = router;
