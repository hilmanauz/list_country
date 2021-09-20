const jwt = require('jsonwebtoken')
const access_token = obj => {
    return jwt.sign(obj, 'list_country');
}
const verify_token = token => {
    return jwt.verify(token, 'list_country');
}

module.exports = {access_token, verify_token};