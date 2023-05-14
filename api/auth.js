const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/users");

function generateToken(user) {
  // Generate a JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
}

function authenticateToken(req, res, next) {
  // Extract the token from the request header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Add the user to the request object
    req.user = getUserById(userId);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
}

module.exports = { generateToken, authenticateToken };
