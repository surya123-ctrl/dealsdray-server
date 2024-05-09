const jwt = require('jsonwebtoken');
const generateToken = (userData) => {
    console.log(userData);
    const token = jwt.sign(userData, process.env.JWT_SECRET_KEY)
    return token;
}
module.exports = generateToken;