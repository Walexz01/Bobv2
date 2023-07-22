const express = require("express");
const connection = require("../connection/connection");
const { getPagination } = require("../controller/pagination");
const router = express.Router();

router.get("/", async (req, res) => {
  const { search, size, page, sort, rank } = req.query;
  const currentPage = page ? page - 1 : 0;
  try {
    let query = `SELECT 
                  id,
                  customer_name,
                  address,
                  DATE_FORMAT(registration_date, '%r') AS registration_time,
                  DATE_FORMAT(registration_date, '%Y-%m-%d') AS registration_date 
                  FROM customers`;

    let countquery = "SELECT count(id) AS count FROM customers";
    let countparams = [];

    if (search) {
      countquery += ` WHERE customer_name LIKE ? OR address LIKE ? OR id LIKE ?`;
      countparams.push(`%${search}%`, `%${search}%`, `%${search}%`);
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
      query += ` WHERE customer_name LIKE ? OR address LIKE ? OR id LIKE ?`;
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
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

router.get("/top", async (req, res) => {
  try {
    const query = `
                SELECT 
                c.id, customer_name, address, COUNT(o.customer_id) AS total_order
            FROM
                customers c
                    LEFT JOIN
                orders o ON c.id = o.customer_id
            GROUP BY o.customer_id
            HAVING total_order > 0
            ORDER BY total_order
            LIMIT 10
            `;
    const [result] = await connection.promise().query(query);
    res.json(result);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

module.exports = router;
