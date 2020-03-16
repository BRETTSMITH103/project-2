// / import express router
const router = require('express').Router();
// import models
const { Show, User } = require('../../models');

// import auth middleware
const checkAuth = require('../../middleware/check-auth');
const jwt = require('jsonwebtoken');

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

// get all Shows - we might not need this for users but we might need it for our queries
// https://gist.github.com/zcaceres/83b554ee08726a734088d90d455bc566

router.get('/all', (req, res) => {
  Show.findAll()
    .then(showdata => res.json(showdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// get all of the shows associated with the authenticated user ('on my watchlist')
// we also want this to be the default
router.get('/me', checkAuth, (req, res) => { //how do we do or? we want this route to be '/' OR '/me'

  const token = (req.headers.authorization)
    .split(' ')
    .pop()
    .trim();
  const payload = jwt.decode(token);

  Show.findAll({
    where: {
      UserId: payload.data.id
    },
  })
    .then(showdata => res.json(showdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});


// get show by id or title associated with authenticated User ('on my watchlist')
router.get('/me/:query', checkAuth, (req, res) => {

  const token = (req.headers.authorization)
    .split(' ')
    .pop()
    .trim();
  const payload = jwt.decode(token);

  Show.findOne({
    where: {
      [Op.and]: [
        {
          UserId: payload.data.id
        },
        {
          [Op.or]: [
            {
              id: req.params.query
            },
            {
              title: req.params.query
            }
          ]
        }
      ]
    },
  })
    .then(showdata => res.json(showdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// create a new show entry

router.post('/me/', checkAuth, (req, res) => {
  // /* 
  //{
  // title: "Show Title",
  // toWatch: true,
  // watching: false,
  // completed: false,
  // UserId: 1

  //OPTIONAL? Depending on how we wanna do this:
  // TvMazeId: 32
  // }  

  const token = (req.headers.authorization)
    .split(' ')
    .pop()
    .trim();
  const payload = jwt.decode(token);

  // set UserID
  req.body.UserId = payload.data.id;

  Show.create(req.body)
    .then(showdata => res.json(showdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// update shows by id or title
router.put('/me/:query', checkAuth, (req, res) => {
  const token = (req.headers.authorization)
    .split(' ')
    .pop()
    .trim();
  const payload = jwt.decode(token);

  // set UserID
  req.body.UserId = payload.data.id;


  Show.update(req.body, {
    where: {
      [Op.and]: [
        {
          UserId: payload.data.id
        },
        {
          [Op.or]: [
            {
              id: req.params.query
            },
            {
              title: req.params.query
            }
          ]
        }
      ]
    },
  })
    .then(showdata => res.json(showdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// delete show by id, do we want to delete shows?
// router.delete('/me/:query', (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.query
//     }
//   })
//     .then(showdata => res.json(showdata))
//     .catch(err => {
//       console.log(err);
//       res.json(err);
//     });
// });

module.exports = router;
