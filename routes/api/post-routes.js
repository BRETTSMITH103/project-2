// / import express router
const router = require('express').Router();
// import models
const { User, Show, } = require('../../models');

// import auth middleware
const checkAuth = require('../../middleware/check-auth');

const inquirer = require('inquirer');
const axios = require('axios');

const promiseHandler = promise => promise.then(res => [null, res]).catch(err => [err, null]);

const init = async () => {
  const responseObj = await inquirer.prompt(questions);

  const [axiosErr, { data:tvmazeData }] = await promiseHandler( axios.get('http://api.tvmaze.com/shows/1${responseObj.watchlist}')
  );
  if (axiosErr) {
    return console.log(axiosErr);
  }
}

// get all Shows with associated users

// https://gist.github.com/zcaceres/83b554ee08726a734088d90d455bc566

router.get('/', checkAuth, (req, res) => {
  User.findAll()
    .then(postdata => res.json(showdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// get shows by id with associated User
router.get('/:query', (req, res) => {
  User.findOne({
    where: {
      $or:[
        {
      id: req.params.query
        },
        {
      email: req.params.query
        }
      ]    
    },
    include: [User]
  })
    .then(showdata => res.json(showdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// create a new show entry

router.post('/', checkAuth, (req, res) => {
  // /* 
  
  // title: "Show Title",
  // toWatch: true,
  // watching: false,
  // completed: false,
  // UserId: 1

//OPTIONAL? Depending on how we wanna do this:
  // TvMazeId: 32
// }

  

  // set UserID
  req.body.UserId = req.id;

  User.create(req.body)
    .then(showdata => res.json(showdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// update shows by id or email
router.put('/:query', (req, res) => {
  User.update(req.body, {
    where: {
      $or: [
        {
          id: req.params.query
        },
        {
          email: req.params.query
        }
      ]
    },
    include: [User]
  })
    .then(showdata => res.json(showdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});
 
// delete show by id, do we want to delete shows?
// router.delete('/:id', (req, res) => {
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
