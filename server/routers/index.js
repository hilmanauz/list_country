const router = require('express').Router();
const Controller = require("../controllers");
const authenticate = require('../middlewares/authenticate');
const authorizeAdmin = require('../middlewares/authorize-admin');

router.post('/login', Controller.login);
router.use(authenticate)
router.post('/country/detail', Controller.viewCountryDetail);
router.get('/country', Controller.viewOnlyCountry);
router.post('/register/user', authorizeAdmin, Controller.registNewUser);
router.get('/country/all', Controller.viewAllCountry);
router.post('/country/filter', Controller.filterCountry);

module.exports = router