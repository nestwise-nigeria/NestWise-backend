const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, role: user.role, phone: user.phone }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { generateToken };