// import express router
const router = require('express').Router();
//import models
const { Show, User } = require('../../models');

const Op = Sequelize.Op;

// get all users
router.get('/', (req, res) => {
  User.findAll()
    .then(userdata => res.json(userdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// get a user by id OR email with associated shows --> is this the best way to get the authenticated user? like my/profile or my/watchlist
router.get('/:query', (req, res) => {
  User.findOne({
    where: {
      [Op.or]: [
        {
          id: req.params.query
        },
        {
          email: req.params.query
        }

      ]
    },
    include: [Show]
  })
    .then(userdata => res.json(userdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// create new user
router.post('/', (req, res) => {
  /*
  {
    name: 'Lee'
    email: 'chenallee@rocketmail.com'
    password: 'macaroni'
  }
  */

  User.create(req.body)
  .then(userdata => res.json(userdata))
  .catch(err => {
    console.log(err);
    res.json(err);
  });
});

// do we need an update user method?

// do we need a delete user method?

module.exports = router;