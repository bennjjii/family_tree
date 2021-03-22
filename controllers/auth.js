const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  console.log(req.cookies.refresh_token);
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
    if (err) return res.sendStatus(403);
    req.user = result;
    console.log(result);
    next();
  });
};
