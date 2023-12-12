const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(400).send("This is an authourized page");
    }
    const key = "JWTSecretKey";
    const decode = jwt.verify(token, key);
    const user = decode.user;
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    let error = err.message ? err.message : "Server Error";
    res.status(500).send(error);
  }
};

module.exports = authenticate;
