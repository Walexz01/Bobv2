const express = require("express");
const connection = require("../connection/connection");
const { getPagination } = require("../controller/pagination");
const router = express.Router();

router.get("/", async (req, res) => {
  const { search, rank, sort, page, size } = req.query;
  const currentPage = page ? page - 1 : 0;

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

    let countquery = `SELECT 
    count(o.id) AS count,
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
    let countparams = [];

    if (search) {
      countquery += ` WHERE o.id LIKE ? OR c.customer_name LIKE ? OR o.order_date LIKE ? OR o.total_amount LIKE ? OR u.user_name LIKE ? OR s.name LIKE ?`;

      countparams.push(
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
      query += ` WHERE o.id LIKE ? OR c.customer_name LIKE ? OR o.order_date LIKE ? OR o.total_amount LIKE ? OR u.user_name LIKE ? OR s.name LIKE ?`;

      queryParams.push(
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