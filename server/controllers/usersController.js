const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/user');

async function signup(req, res){
    
    try{

      //Get the email and password off req body

      const { email, password } = req.body;

      // Hash password

      const hashPassword = bcrypt.hashSync(password, 8);

      // Create a user with the data

      await User.create({ email, password: hashPassword });

      // Respond

      res.sendStatus(200);

    }catch (err){
      
        console.log(err);
      
        res.sendStatus(400)
    }

};

async function login(req, res) {

    try {
  // Get the email and password off rq body

  const { email, password } = req.body;

  // Find the user with requested email

  const user = await User.findOne({ email });
  if (!user) return res.sendStatus(401);

  //compare sent in password with found user password hash

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) return res.sendStatus(401);

  // Create a jwt token
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // one month 
  const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET); //sub : subject and exp : Expiration Time in jwt 

  // Set the cookie

  res.cookie("Authorization", token, {
    expires: new Date(exp),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  // Send it

  res.sendStatus(200);

}catch(err){

    console.log(err);
    res.sendStatus(400);
}
};

function logout(req, res) {
    res.clearCookie("Authorization");
    res.sendStatus(200)
};

//checking the auth
function checkAuth(req, res){
    try{

        res.sendStatus(200)
    
    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};