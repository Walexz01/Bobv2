const express = require("express");
const connection = require("../connection/connection");
const router = express.Router();

router.get("^/$|^/:sort$|/:sort/(:rank)?", async (req, res) => {
  const sort = req.params.sort;
  const rank = req.params.rank;
  const search = req.query.search;
  try {
    let query = ` SELECT 
    op.order_id AS id,
    p.id AS product_id,
    p.name AS product_name ,
    op.quantity,
    p.unit_price,
    op.quantity * p.unit_price AS total_price,
    o.order_date
FROM
    order_products op
        JOIN
    products p
    ON p.id = op.product_id
    JOIN 
    orders o 
    ON o.id = op.order_id`;

    if (search) {
      query += ` WHERE op.order_id LIKE ${search} OR p.id LIKE ${search} OR p.name LIKE ${search} OR op.quantity LIKE ${search} OR p.unit_price LIKE ${search} OR total_price LIKE ${search}`;
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
