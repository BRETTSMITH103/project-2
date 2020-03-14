// / import express router
const router = require('express').Router();
// import models
const { User, Show, } = require('../../models');

// import auth middleware
const checkAuth = require('../../middleware/check-auth');

// get all Posts with associated users

// https://gist.github.com/zcaceres/83b554ee08726a734088d90d455bc566

router.get('/', checkAuth, (req, res) => {
  User.findAll()
    .then(postdata => res.json(postdata))
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
    .then(postdata => res.json(postdata))
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
    .then(postdata => res.json(postdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// update shows by id
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
    .then(postdata => res.json(postdata))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});
 
// delete post by id, do we want to delete posts?
// router.delete('/:id', (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.query
//     }
//   })
//     .then(postdata => res.json(postdata))
//     .catch(err => {
//       console.log(err);
//       res.json(err);
//     });
// });

module.exports = router;