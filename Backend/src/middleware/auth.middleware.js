const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      res.status(401).json({ message: "Invalid Token" });
    }
    const decoded_data = jwt.verify(token, "mubarak_key");

    req.user = decoded_data;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Authentication Error" });
  }
};

module.exports = authenticate;
