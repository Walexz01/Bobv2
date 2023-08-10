const express = require("express");
const connection = require("../connection/connection");
const { getPagination } = require("../controller/pagination");
const varifyUser = require("../middleware/verify");
const router = express.Router();

router.get("/", varifyUser, async (req, res) => {
  const { search, rank, sort, page, size } = req.query;
  const currentPage = page ? page - 1 : 0;

  try {
    let query = `SELECT 
    op.order_id AS id,
    p.id AS product_id,
    p.name AS product_name ,
    op.quantity,
    p.unit_price,
    op.quantity * p.unit_price AS total_price,
    DATE_FORMAT(o.order_date, '%r') AS sale_time,
    DATE_FORMAT(o.order_date, '%Y-%m-%d') AS sale_date
FROM
    order_products op
        JOIN
    products p
    ON p.id = op.product_id
    JOIN 
    orders o 
    ON o.id = op.order_id`;

    let countquery = `SELECT 
    count(op.order_id) AS count,
    p.id AS product_id,
    p.name AS product_name ,
    op.quantity,
    p.unit_price,
    op.quantity * p.unit_price AS total_price,
    DATE_FORMAT(o.order_date, '%r') AS sale_time,
    DATE_FORMAT(o.order_date, '%Y-%m-%d') AS sale_date
FROM
    order_products op
        JOIN
    products p
    ON p.id = op.product_id
    JOIN 
    orders o 
    ON o.id = op.order_id`;
    let countparams = [];

    if (search) {
      countquery += ` WHERE op.order_id LIKE ? OR p.id LIKE ? OR p.name LIKE ? OR op.quantity LIKE ? OR p.unit_price LIKE ? OR op.quantity * p.unit_price LIKE ?`;

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
      query += ` WHERE op.order_id LIKE ? OR p.id LIKE ? OR p.name LIKE ? OR op.quantity LIKE ? OR p.unit_price LIKE ? OR op.quantity * p.unit_price LIKE ?`;
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
