const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("x-token");
    const key = "JWTSecretKey";
    const decode = jwt.verify(token, key);
    const user = decode.user;
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = authenticate;
