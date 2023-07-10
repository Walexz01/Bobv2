const pool = require("../Connection/connection")


async function getUser(username) {
    const query = `SELECT * FROM users WHERE user_name = ? `
    const [result]  = await pool.query(query,[username])
    return result
    
}

async function newUser(user_name,password) {
    const query = `INSERT INTO users(user_name, role, password) VALUES(?,?,?)`
    const role = 'user'
    const [result] = await pool.query(query,[user_name,role,password])
}



module.exports.getUser = getUser
module.exports.newUser = newUser



