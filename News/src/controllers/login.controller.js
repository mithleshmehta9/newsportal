
const signupModel = require('../models/signup.models');

async function loginUser(req,res){
    const userinfoEmail = req.body.email;
  const userinfoPassword = req.body.password;
  try {
    const user = await signupModel.getUserByEmail(userinfoEmail);
    if (!user || user.length == 0) {
      return res.send({ message: 'Invalid email or password' });
    }

    if (userinfoPassword == user[0].password) {
      return res.send({ message: 'Success' });
    } else {
      return res.send({ message: 'Password does not match' });
    }
  } catch (error) {
    return res.status(500).send({ error: 'Error while logging in' });
  }
}

module.exports = {loginUser};