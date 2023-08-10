const jwt = require("jsonwebtoken");

const admin = (req, res, next) => {
  const token = req.cookies.access_token;

  jwt.verify(token, "walexz", (err, decoded) => {
    if (err) {
      return res.status("400").json("Token is no correct");
    } else {
      if (decoded.role !== "admin") {
        return res.status("400").json("Unathorize");
      } else {
        next();
      }
    }
  });
};
module.exports = admin;
