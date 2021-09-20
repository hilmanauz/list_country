const {verify_token} = require('../helpers/jwt');
const {User} = require('../models')
const authenticate = (req, res, next) => {
    try {
      let {id, username} = verify_token(req.headers.access_token);
      User.findOne({where: {id, username}})
      .then(user => {
        req.currentUser = {id: user.id, username: user.username};
        next();
      })
      .catch(err => {
        throw new Error();
      })
    } catch (error){
        next({
            code: 401,
            message: 'Unauthorized'
        });
    }
}

module.exports = authenticate