const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  // 1. Get the Authorization header
  const header = req.headers.authorization;

  // 2. No header → reject
  if (!header) {
    return res.status(401).json({ error: "No token provided" });
  }

  // 3. Extract token from "Bearer <token>"
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  // 4. Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach userId to req so routes can use it
    req.userId = decoded.userId;

    // 6. Continue to the route
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = auth;
