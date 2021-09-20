const {User} = require('../models')
const {comparePassword} = require("../helpers/hash-password");
const {access_token} = require("../helpers/jwt");
const {verify_token} = require('../helpers/jwt');
const axios = require('axios');

class Controller {
  static login(req,res,next){
    const username = req.body.username;
    const password = req.body.password;
    User.build({ username, password }).validate()
      .then(() => {
        User.findOne({where: {username: username}})
          .then(user => {
            if(user){
              const isUser = comparePassword(password, user.password);
              if(isUser){
                let token = access_token({id: user.id, username: user.username, role: user.role});
                res.status(200).json({access_token: token, username: user.username, role: user.role})
              } else {
                next({
                  code: 401,
                  message: 'Password is incorrect'
                });
              }
            } else {    
              next({
                  code: 401,
                  message: "Username is not exist"
              });
            }
          })
          .catch(err => {
              next(err);
          })
        })
        .catch(err => {
        next(err);
      })
  }

  static registNewUser (req, res, next) {
    const data = {
      username: req.body.username,
      password: req.body.password,
      role: 'user'
    }
    User.create(data)
      .then(user => {
          res.status(201).json({message: 'Success create user'})
      })
      .catch(err => {
          next(err)
      })
  }

  static viewOnlyCountry (req, res, next) {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(({data}) => {
        res.status(200).json(data);
      })
      .catch(err => {
        next({
          code: 500
        })
      })
  }

  static viewAllCountry (req, res, next) {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(({data})=> {
        let result = {}
        result.resCountries = data
        result.names = []
        result.codes = []
        result.capitalsCity = []
        result.currencies = []
        result.languages = []
        result.callingCodes = []
        data.forEach(el => {
          result.names.push(el.name)
          result.codes.push(el.alpha2Code)
          result.codes.push(el.alpha3Code) 
          result.capitalsCity.push(el.capital)
          el.currencies.forEach(item => {
            result.currencies.push(item.code)
          })
          el.languages.forEach(item => {
            const duplicate = result.languages.find(el => el === item.iso639_1)
            if (!duplicate && item.iso639_1) {
              result.languages.push(item.iso639_1)
            }
          })
          el.callingCodes.forEach(item => {
            if(item.length) {
              result.callingCodes.push(item)
            }
          })
        })
        res.status(200).json(result);
      })
      .catch(err => {
        next({
          code: 500
        })
      })
  }

  static viewCountryDetail (req, res, next) {
    axios.get(`https://restcountries.eu/rest/v2/name/${req.body.name}?fullText=true`)
      .then(({data}) => {
        res.status(200).json(data[0]);
      })
      .catch(err => {
        next({
          code: 500
        })
      })
  }

  static filterCountry (req, res, next) {
    axios.get(`https://restcountries.eu/rest/v2/${req.body.slug}`)
      .then(({data}) => {
        if(!data.length) data = [data]
        res.status(200).json(data);
      })
      .catch(err => {
        next({
          code: 500
        })
      })
  }

}

module.exports = Controller