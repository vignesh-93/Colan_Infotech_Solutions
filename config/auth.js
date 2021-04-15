const jwt = require('jsonwebtoken');

const verifyJWT = (req,res,cb) => {
    var token = req.headers.authorization;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, "toGen" , function(err, decoded) {

     if(err)
     {
        console.log(err)
        res.status(200).send({ auth: false, message: 'Invalid Token' });
     }
     else
     {
        cb();
     }   
     
    });
  };

  module.exports = verifyJWT;