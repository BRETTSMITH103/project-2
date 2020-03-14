// import express router
const router = require('express').Router();
//import models
const { Show, User } = require('../../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//this is where we will have our routes that both return data on what's in our database as well as interfaces with tvmaze API to return extra data on individual shows.

// get more data for individual show
router.get('/info/:query', (req, res) =>{ 
  //1. find the tvmaze id for the show we queried

  //2. send the tvmaze id to tvmaze api and get back data

  //3. send back data to the user

});

// get most popular show
router.get('/popular', (req, res) => {
  // find the show/shows (by title or by tvmaze id) that shows up the most in our database and let the user know

  //this will require some specific querying in Sequelize

  //do we want to do like... top 1 or top 5? or what?

});


module.exports = router;