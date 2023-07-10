const jwt = require("jsonwebtoken")

const validate = (req,res,next) =>{
    const accessToken = req.cookies.access
    if (!accessToken) return res.status(400).json("pls login");
    
    try {
        const validToken  = jwt.verify(accessToken,process.env.jwtkey)
        if(validToken){
            req.user = validToken
            return next()
        }
    } catch (err) {
        return res.status(400).send({error: err})
    }

}

module.exports = validate


