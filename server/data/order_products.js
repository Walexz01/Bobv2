const pool = require('../Connection/connection')

//  to  get the lists of all the products that has been ordered and display it in the sales page
async function allSales() {
    const query = `
                   SELECT 
    op.order_id,
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
    ON o.id = op.order_id
    ORDER BY 
    order_id
    `
    const [result] = await pool.query(query)
    
     return result
}
async function getOrderProductsById(order_id){
    const query = `SELECT 
    order_id,
    product_id,
    quantity,
    op.unit_price,
    (quantity * op.unit_price) AS total_cost,
    customer_id,
    order_date,
    total_amount,
    p.name AS item_name,
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
    WHERE order_id = ?`
    const [result] = await pool.query(query,[order_id]) 
    return result;
}

module.exports.allSales = allSales
module.exports.getOrderProductsById = getOrderProductsById