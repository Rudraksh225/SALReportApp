var jwt = require('jsonwebtoken');

const JWT_SECRET = "SALReportApp0359"

const fetchuser = (req, res, next) => {
    
    // Get the user from the jwt token and add id to req object 
    const token = req.header("authtoken")
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;
      next();
    } catch (err) {
      res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser