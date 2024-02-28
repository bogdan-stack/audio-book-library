const jwt = require('jsonwebtoken');

const generateToken = (userId, userEmail, userName,  userRole, ) => {
  const token = jwt.sign({ userId: userId, userEmail: userEmail, userName: userName,  userRole: userRole }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

module.exports = generateToken;