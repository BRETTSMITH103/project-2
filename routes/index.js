const router = require('express').Router();

//collect all api endpoints
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// if we want to add html routes do so here

module.exports = router;