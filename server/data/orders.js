const pool = require('../Connection/connection')



//  this is will show  ordersby the customers name 

async function orderByName(customer_name) {
    
    const query = `SELECT 
                    o.id,
                    c.customer_name,
                    o.order_date,
                    o.total_amount,
                    u.user_name,
                    s.name  AS status_name
                    FROM
                    orders o
                    JOIN
                    customers c ON customer_id = c.id
                        JOIN
                    status s ON o.status_id = s.id
                    JOIN users u
                    ON u.id = o.user_id
                    WHERE c.customer_name = ?
                    `
    const [result] = await pool.query(query,[customer_name])
    return result
                                
}

// orderByName('walexz')

//  this is will show  ordersby their order id which the details will be passed as a  search params  to the urll to add order products 
async function orderById(order_id) {
    
    const query = `SELECT 
                    o.id,
                    c.customer_name,
                    o.order_date,
                    o.total_amount,
                    u.user_name,
                    s.name  AS status_name
                    FROM
                    orders o
                    JOIN
                    customers c ON customer_id = c.id
                        JOIN
                    status s ON o.status_id = s.id
                    JOIN users u
                    ON u.id = o.user_id
                    WHERE o.id = ?
                    `
    const [result] = await pool.query(query,[order_id])
    return result
                                
}

// Orders(58)

//  this is will show the orders all the orders both the completed and pending
async function orders() {
    
    const query = `SELECT 
                    o.id,
                    c.customer_name,
                    o.order_date,
                    o.total_amount,
                    u.user_name,
                    s.name AS status_name
                    FROM
                    orders o
                    JOIN
                    customers c ON customer_id = c.id
                        JOIN
                    status s ON o.status_id = s.id
                    JOIN users u
                    ON u.id = o.user_id
                    ORDER BY o.id `
    const [result] = await pool.query(query)
    return result
                                
}


//  this is will show the orders that is in their status pending 
async function pendingOrders() {
    
    const query = `SELECT 
                    o.id,
                    c.customer_name,
                    o.order_date,
                    o.total_amount,
                    u.user_name,
                    s.name AS status_name
                    FROM
                    orders o
                    JOIN
                    customers c ON customer_id = c.id
                        JOIN
                    status s ON o.status_id = s.id
                    JOIN users u
                    ON u.id = o.user_id
                    WHERE s.name = 'pending'
                    ORDER BY o.id `
    const [result] = await pool.query(query)
    return result
                                
}


// this will show the orders that their status is completed

async function completedOrders() {
    
    const query = `SELECT 
                    o.id,
                    c.customer_name,
                    o.order_date,
                    o.total_amount,
                    u.user_name,
                    s.name AS status_name
                    FROM
                    orders o
                    JOIN
                    customers c ON customer_id = c.id
                        JOIN
                    status s ON o.status_id = s.id
                    JOIN users u
                    ON u.id = o.user_id
                    WHERE s.name = 'completed'
                    ORDER BY o.id `
    const [result] = await pool.query(query)
    return result
                                
}


// this is the function to create order (create order and an order item must be insert for the transaction to complete)

async function createOrder(customer_name,staff_name) {
    let [[id]] = await pool.query(`SELECT id 
            FROM customers c 
            WHERE c.customer_name = ?`,[customer_name])
    id = id.id
    // console.log(id)
    const status_name = 'pending';

    let [[status_id]] = await pool.query(`SELECT s.id 
                         FROM status s 
                         WHERE  s.name = ?`,[status_name])
    status_id = status_id.id

    // console.log(status_id) 
    let [[staff_id]] = await pool.query(`SELECT u.id
                     FROM  users u
                     WHERE u.user_name = ?`,[staff_name])
    staff_id = staff_id.id
    // console.log(staff_id)

    //  This iis the query used to enable transaction 

    await pool.query(`START TRANSACTION`)

    const query = `
                INSERT INTO orders(customer_id,status_id,user_id)
                VALUES(?,?,?)`
    const [result]  = await pool.query(query,[id,status_id,staff_id])
    let lastId = (result.insertId)
    const order = await orderById(lastId)
    return (order)

}    

//  createOrder('walexz','completed','walexz')

async function addproducts(order_id,product_name,quantity) {
    let [[product_id]] = await pool.query(`SELECT p.id 
                                            FROM products p 
                                            WHERE p.name = ?`,[product_name])
    product_id = product_id.id

    // console.log(product_id) 

    let [[unit_price]] = await pool.query(`SELECT p.unit_price FROM products p 
                     WHERE p.name = ?`,[product_name])
    unit_price = unit_price.unit_price

    // console.log(unit_price)

    const query = `INSERT INTO order_products(order_id,product_id,quantity,unit_price)
                    VALUES(?,?,?,?)`

    await pool.query(query,[order_id,product_id,quantity,unit_price])
    await pool.query(`COMMIT`)

    
}    


// addproducts(57,'ball',12)



module.exports.orders = orders
module.exports.orderByName = orderByName 
module.exports.orderById = orderById 
module.exports.pendingOrders = pendingOrders
module.exports.completedOrders = completedOrders
module.exports.createOrder = createOrder 
module.exports.addproducts = addproducts