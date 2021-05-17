const jwt = require("jsonwebtoken");

//all api requests must come as JSON, and must contain field
// requesting_UUID_USER which can be checked here against the JWT contents

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  //console.log("Header: " + authHeader);
  const token = authHeader;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = result;

    next();
  });
};

module.exports = authenticateToken;
