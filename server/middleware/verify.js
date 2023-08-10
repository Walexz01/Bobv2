const jwt = require("jsonwebtoken");

const varifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status("401").json("No cookie Provided");
  } else {
    jwt.verify(token, "walexz", (err, decoded) => {
      if (err) {
        return res.status("400").json("Token is no correct");
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};
module.exports = varifyUser;
