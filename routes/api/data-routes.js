// import express router
const router = require('express').Router();
//import models
const { Show, User } = require('../../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

// get most popular show
router.get('/popular', (req, res) => {
  // find the show/shows (by title or by tvmaze id) that shows up the most in our database and let the user know

  //this will require some specific querying in Sequelize

  //do we want to do like... top 1 or top 5? or what?

});


module.exports = router;