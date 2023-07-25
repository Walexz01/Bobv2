const express = require("express");
const connection = require("../connection/connection");
const { getPagination } = require("../controller/pagination");
const router = express.Router();

router.get("/", async (req, res) => {
  const { search, rank, sort, page, size } = req.query;
  const currentPage = page ? page - 1 : 0;

  try {
    let query = "SELECT * FROM products";

    let countquery = "SELECT count(id) AS count FROM products";
    let countparams = [];

    if (search) {
      countquery += ` WHERE id LIKE ? OR name LIKE ? OR quantity_in_stock LIKE ? OR description LIKE ? OR unit_price LIKE ?`;
      countparams.push(
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
      query += ` WHERE id LIKE ? OR name LIKE ? OR quantity_in_stock LIKE ? OR description LIKE ? OR unit_price LIKE ?`;
      queryParams.push(
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

router.get("/top", async (req, res) => {
  try {
    const query = `SELECT 
    p.id,
    p.name,
    SUM(op.quantity) AS total_quantity_purchased,
    COUNT(op.product_id) AS number_of_times_purchased,
    op.unit_price AS unit_price
  FROM
    products p
        JOIN
        order_products op 
            ON op.product_id = p.id
  GROUP BY op.product_id
  HAVING total_quantity_purchased
    AND number_of_times_purchased > 0
  ORDER BY total_quantity_purchased
  LIMIT 10`;
    const [result] = await connection.promise().query(query);
    res.json(result);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

router.post("/", async (req, res) => {
  const { name, price, quantity, description } = req.body;
  const query = `INSERT INTO products(name,quantity_in_stock,description,unit_price) VALUES(?,?,?,?)`;
  try {
    await connection
      .promise()
      .query(query, [name, quantity, description, price]);
    res.status(201).json("Product added");
  } catch (err) {
    console.log("Error adding data:", err);
    res.status(500).json({ error: "An error occurred while adding data" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT name,id,description,quantity_in_stock AS quantity,unit_price AS price FROM products WHERE id = ?";
  try {
    const [[result]] = await connection.promise().query(query, [id]);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error adding data:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { price, description, quantity } = req.body;
  const query = `UPDATE  products SET description = ?,quantity_in_stock = ?,unit_price = ? WHERE id = ?`;
  try {
    await connection.promise().query(query, [description, quantity, price, id]);
    res.json("update successfully");
  } catch (err) {
    console.log("Error adding data:", err);
    res.status(500).json({ error: "An error occurred while updating data" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM products WHERE id = ?`;
  try {
    await connection.promise().query(query, [id]);
    res.json("deleted");
  } catch (err) {
    console.log("Error adding data:", err);
    res.status(500).json({ error: "An error occurred while deleting data" });
  }
});

module.exports = router;
