// import express router
const router = require('express').Router();
//import models
const { Show, User } = require('../../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = require('../../config/connection');

//import node-fetch npm
const fetch = require('node-fetch');

//this is where we will have our routes that both return data on what's in our database as well as interfaces with tvmaze API to return extra data on individual shows.

// get more data for individual show
router.get('/info/:query', (req, res) =>{ 
  /*** 
   !!! USE THIS ENDPOINT: http://api.tvmaze.com/shows/:id !!!
   ***/
  //1. find the tvmaze id for the show we queried
  Show.findOne({
    where: {
      [Op.or]: [
        {
          id: req.params.query
        },
        {
          title: req.params.query
        }
      ]
    }
  })
  .then(showdata => {
      const queryId = `http://api.tvmaze.com/shows/${showdata.tvMazeId}`
  //2. send the tvmaze id to tvmaze api and get back data
  fetch(queryId)
  .then(response => response.json())
  //3. send back data to the user
  .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.json(err);
    })
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  })

});

// get most popular shows
router.get('/popular', (req, res) => {
  // ranks the shows in our database from most to least occurrences
    sequelize.query("SELECT title, count(*) as 'count' FROM Shows GROUP BY title ORDER BY count(*) DESC",{ type: sequelize.QueryTypes.SELECT})
    .then(showdata => res.json(showdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    })
});

// get most popular shows to watch
router.get('/popular/towatch', (req, res) => {
  // ranks the shows where toWatch = true from most to least occurrences
    sequelize.query("SELECT title, count(*) as 'count' FROM Shows WHERE toWatch = true GROUP BY title ORDER BY count(*) DESC",{ type: sequelize.QueryTypes.SELECT})
    .then(showdata => res.json(showdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    })
});

// get most popular shows watching
router.get('/popular/watching', (req, res) => {
  // ranks the shows where toWatch = true from most to least occurrences
    sequelize.query("SELECT title, count(*) as 'count' FROM Shows WHERE watching = true GROUP BY title ORDER BY count(*) DESC",{ type: sequelize.QueryTypes.SELECT})
    .then(showdata => res.json(showdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    })
});

// get most popular shows completed
router.get('/popular/completed', (req, res) => {
  // ranks the shows where toWatch = true from most to least occurrences
    sequelize.query("SELECT title, count(*) as 'count' FROM Shows WHERE completed = true GROUP BY title ORDER BY count(*) DESC",{ type: sequelize.QueryTypes.SELECT})
    .then(showdata => res.json(showdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    })
});



module.exports = router;