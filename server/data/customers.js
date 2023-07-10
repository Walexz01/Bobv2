const pool = require("../Connection/connection");

// get queries on customers table

//  this is the query to select all customers from the database

async function getCustomers() {
  const query = `SELECT * 
                        FROM customers`;
  const [result] = await pool.query(query);
  return result;
}

// this is the quey to select customer by their name in the database

async function getCustomer(customer_name) {
  const query = `SELECT * FROM customers WHERE customer_name = ? `;
  const [result] = await pool.query(query, [customer_name]);
  return result;
}

// post queries on customers table

async function createCustomer(customer_name, address) {
  const query = `INSERT INTO customers(customer_name,address)
                        VALUES(?, ?)`;
  await pool.query(query, [customer_name, address]);
  return getCustomer(customer_name);
}

// qeury for updating the client details

async function updateCustomer(customer_name, address, old_name) {
  const query = `UPDATE customers 
                        SET customer_name = ?,
                         address = ?
                        WHERE  customer_name = ?`;
  const result = await pool.query(query, [customer_name, address, old_name]);
}

// updateCustomer('adebola2','aahabbaaa','adebolaa')

//  query for deleting users from the database

async function deleteCustomer(customer_name) {
  const query = `DELETE FROM customers WHERE customer_name = ?`;
  await pool.query(query, [customer_name]);
}

async function getTopCustomer() {
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
  const [result] = await pool.query(query);
  return result;
}

// exportred the queries function

module.exports.getCustomers = getCustomers;

module.exports.getCustomer = getCustomer;

module.exports.createCustomer = createCustomer;

module.exports.updateCustomer = updateCustomer;

module.exports.deleteCustomer = deleteCustomer;
module.exports.getTopCustomer = getTopCustomer;
