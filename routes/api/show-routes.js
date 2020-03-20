// / import express router
const router = require('express').Router();
// import models
const { Show } = require('../../models');

// import auth middleware
const checkAuth = require('../../middleware/check-auth');
const jwt = require('jsonwebtoken');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//import node-fetch npm
const fetch = require('node-fetch');

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

  Show.findAll({
    where: {
      UserId: req.id
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

  Show.findOne({
    where: {
      [Op.and]: [
        {
          UserId: req.id
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

router.post('/me', checkAuth, (req, res) => {
  // /* 
  //{
  // title: "Show Title",
  // toWatch: true,
  // watching: false,
  // completed: false,
  // UserId: 1
  // TvMazeId: 32
  // }

  //

  // set UserID
  req.body.UserId = req.id;

  const queryTitle = `http://api.tvmaze.com/singlesearch/shows?q=${req.body.title}`;

  fetch(queryTitle)
    .then(response => response.json())
    .then(data => {
      // set tvmazeid
      req.body.tvMazeId = data.id;

      Show.create(req.body)
        .then(showdata => res.json(showdata))
        .catch(err => {
          console.log(err);
          res.json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// update shows by id or title
router.put('/me/:query', checkAuth, (req, res) => {

  // set UserID
  req.body.UserId = req.id;

  //the functionality for if a user updates something to true the others are false would make more sense in a index.js in a public folder
  Show.update(req.body, {
    where: {
      [Op.and]: [
        {
          UserId: req.id
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

// delete show by id
router.delete('/me/:id', checkAuth, (req, res) => {
  // set UserID
  req.body.UserId = req.id;

  //the functionality for if a user updates something to true the others are false would make more sense in a index.js in a public folder
  Show.destroy(req.body, {
    where: {
      [Op.and]: [
        {
          UserId: req.id
        },
        {
          id: req.params.query
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


module.exports = router;
