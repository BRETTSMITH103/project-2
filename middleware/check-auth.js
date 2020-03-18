const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  let token =
    req.body.token ||
    req.query.token || 
    req.query.token ||
    req.headers['x-access-token'] ||
    req.headers.authorization;

    // check if token is authorization token
    /*
    headers: {
      Authorization: 'Bearer <token>'    
    } 
    */

    if (req.headers.authorization){
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    console.log(token);

    //check if jw token is valid
    jwt.verify(token, 'R4BLW4TCH', (err, decoded) => { //should the secret key be in the .env file?
      if(err) {
        res.status(400).json({
          success: false,
          message: 'Unauthorized: invalid token'
        });
        return;
      }

      console.log(decoded);
      req.email = decoded.data.email;
      req.id = decoded.data.id;

      //console.log(req);

      next();
    }); 
};

module.exports = checkAuth;