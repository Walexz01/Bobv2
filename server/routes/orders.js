const express = require("express");
const connection = require("../connection/connection");
const { getPagination } = require("../controller/pagination");
const varifyUser = require("../middleware/verify");
const router = express.Router();

router.get("/", varifyUser, async (req, res) => {
  const { search, rank, sort, page, size, name } = req.query;
  const currentPage = page ? page - 1 : 0;

  try {
    let q = `SELECT 
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
    let cq = `SELECT 
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

    let query = q;
    let countquery = cq;
    let countparams = [];
    let length;
    if (name) {
      let [[len]] = await connection
        .promise()
        .query(cq + `where c.customer_name = ?`, [name]);
      length = len.count;
    }

    if (name && search) {
      countquery += ` WHERE c.customer_name = ? AND (o.id LIKE ? OR c.customer_name LIKE ? OR o.order_date LIKE ? OR o.total_amount LIKE ? OR u.user_name LIKE ? OR s.name LIKE ?) `;
      countparams.push(
        `${name}`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    } else if (name) {
      countquery += ` WHERE c.customer_name = ? `;
      countparams.push(`${name}`);
    } else if (search) {
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

    if (name && search) {
      query += ` WHERE c.customer_name = ? AND (o.id LIKE ? OR o.order_date LIKE ? OR o.total_amount LIKE ? OR u.user_name LIKE ? OR s.name LIKE ?)`;
      queryParams.push(
        `${name}`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    } else if (name) {
      query += ` WHERE c.customer_name = ?`;
      queryParams.push(`${name}`);
    } else if (search) {
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
      length: length,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

router.get("/items/:id", varifyUser, async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT 
    order_id,
    product_id,
    p.name AS item_name,
    op.unit_price,
    quantity,
    (quantity * op.unit_price) AS total_cost,
    customer_id,
    DATE_FORMAT( order_date, '%r') AS order_time,
    DATE_FORMAT( order_date, '%Y-%m-%d') AS order_date,
    total_amount,
    c.customer_name,
    s.name AS status_name,
    u.user_name
FROM
    order_products op
        JOIN
    orders o ON order_id = o.id
        JOIN
    products p ON product_id = p.id
        JOIN
    customers c ON c.id = o.customer_id
        JOIN
    status s ON status_id = s.id
        JOIN
    users u ON u.id = user_id
    WHERE order_id = ?`;
    const [result] = await connection.promise().query(query, [id]);
    res.json(result);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

router.put("/reject/:id", varifyUser, async (req, res) => {
  const { id } = req.params;
  const query = `UPDATE orders o SET o.status_id =  ? WHERE o.id = ?`;
  const status_id = 5;
  try {
    await connection.promise().query(query, [status_id, id]);
    res.json("Order canceled");
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while updating data" });
  }
});

router.get("/checkuser", varifyUser, async (req, res) => {
  const { customer_name } = req.query;
  try {
    await connection.promise().beginTransaction();

    const [userRows] = await connection
      .promise()
      .query("SELECT * FROM customers WHERE customer_name = ?", [
        customer_name,
      ]);

    await connection.promise().commit();

    if (userRows.length > 0) {
      return res.status(200).json(userRows);
    } else {
      return res.status(404).json({ message: "Customer not found!" });
    }
  } catch (error) {
    await connection.promise().rollback();
    console.error("Transaction failed:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while checking user existence." });
  }
});

router.post("/createOrder", varifyUser, async (req, res) => {
  const { id, products, staff_name } = req.body;
  const status_name = "pending";

  let [[status_id]] = await connection.promise().query(
    `SELECT s.id 
                         FROM status s 
                         WHERE  s.name = ?`,
    [status_name]
  );
  status_id = status_id.id;

  let [[staff_id]] = await connection.promise().query(
    `SELECT u.id
                     FROM  users u
                     WHERE u.user_name = ?`,
    [staff_name]
  );
  staff_id = staff_id.id;

  try {
    await connection.promise().beginTransaction();

    // query for adding order to the order table
    const isertOrder = `
    INSERT INTO orders(customer_id,status_id,user_id)
    VALUES(?,?,?)`;
    const [result] = await connection
      .promise()
      .query(isertOrder, [id, status_id, staff_id]);
    let orderId = result.insertId;

    // query for adding product to the order
    const insertOrderItemsQuery = `INSERT INTO order_products(order_id,product_id,quantity,unit_price)
    VALUES(?,?,?,?)`;

    for (const product of products) {
      await connection
        .promise()
        .query(insertOrderItemsQuery, [
          orderId,
          product.id,
          product.quantity,
          product.price,
        ]);
    }
    await connection.promise().commit();
    return res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    await connection.promise().rollback();
    console.error("Transaction failed:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the order." });
  }
});

module.exports = router;
