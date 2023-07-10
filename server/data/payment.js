const pool = require('../Connection/connection')




async function rejectOrder(order_id){
    const query = `UPDATE orders o SET o.status_id =  ? WHERE o.id = ?`
    const status_id = 5
    const result = await pool.query(query,[status_id,order_id])
    return result
}

// async function approveOrder(order_id){
//     const status_id = 4
//     const query = `UPDATE orders o SET o.status_id =  ? WHERE o.id = ?`
//     const result = await pool.query(query,[status_id,order_id])
//     return result
// }
async function makePayment(order_id,method_name,amount) {
    let [[method_id]] = await pool.query(`SELECT id FROM payment_methods WHERE name = ?`,[method_name])
    method_id = method_id.id
    const query= `INSERT INTO payments(order_id, method_id, amount) VALUES(?, ?, ?)`;
    const result = await pool.query(query,[order_id, method_id, amount])

    return(result)
    
}
// makePayment(81,'cash',224)


async function payments() {
    const query= `SELECT 
                        p.id AS id,
                        p.order_id,
                        c.customer_name,
                        pm.name AS payment_method,
                        p.amount AS amount_paid,
                        s.name AS status_name,
                        u.user_name AS seller_name,
                        p.date AS payment_date
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
    const [result] = await pool.query(query)
    return(result)
    
}

// payments()



module.exports.makePayment = makePayment
// module.exports.approveOrder = approveOrder
module.exports.rejectOrder = rejectOrder
module.exports.Payments = payments 