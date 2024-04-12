const jwt = require('jsonwebtoken');

function generateToken(id) {
    return jwt.sign({id: id},'my-secret-key',{
        expiresIn:'24h'
    });
}

function verifyToken(token) {
    try {
        return jwt.verify(token,'my-secret-key');
    } catch (error) {
        return false
    }
}

module.exports = { generateToken, verifyToken }