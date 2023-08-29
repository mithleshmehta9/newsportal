const signupModel = require('../models/signup.models');

async function getTotalUser(req,res){
  await signupModel.getAllUser().then(result=>{
    if(result.length > 0){
      return res.send({result});
    }
  }).catch(e=>{
    return res.status(400).send({error: "Error while fetching data."});
  })
}

async function getUserDetail(req,res){
  const id = req.query.id;
  if(!id) return res.status(400).send({error: "ID is missing"});
  await signupModel.getUser(id).then(result=>{
    var output = null;
    if(result.length > 0){
      if(id >  0) output = result[0];
      else output = result;
    }
    return res.send({output})

  }).catch(e=>{
    return res.status(400).send({error: "Error while fetching data."});
  })
}

async function createNewUser(req,res){
  const userData = req.body;
  if(!userData, !userData.password, !userData.userName, !userData.name, !userData.contact, !userData.email) 
  return res.send(400).send({error: "Fields are missing"});

  var emailExists = await signupModel.checkEmail(userData.email);
  if(emailExists === 1) return res.send({message:"Email already exists."});
  
  await signupModel.createUser(userData).then(()=>{
    return res.send({message: "Save Successfull"});
  }).catch(e =>{
    return res.status(400).send({error : "Error while saving data."});
  });
}


async function updateUser(req, res) {
  const userData = req.body;
  try {
    const emailExists = await signupModel.checkEmail(userData.email);
    const isEmail = await signupModel.checkEmailOnUpdate(userData.email, userData.id);
    if (emailExists === 1 && isEmail !== 0) {
      return res.status(400).send({ error: 'Email already exists for another user.' });
    }
    
    const result = await signupModel.updateUser(userData);
    if (result.affectedRows === 0) {
      return res.status(400).send({ error: 'Error while updating user' });
    }
    
    return res.send({ message: 'User updated successfully' });
  } catch (error) {
    return res.status(400).send({ error: 'Error while updating user' });
  }
}



async function deleteUser(req, res){
  const id = req.query.id;
  try{
    await signupModel.deleteUser(id);
    res.send({ message: "User deleted successfully"});
  }catch (error){
    res.status(400).send({ error: "Error while deleting user"});
  }
}

async function getUserbyEmail(req, res){
  const email = req.query.email;
  if(!email) return res.status(400).send({error: "ID is missing"});
  await signupModel.getUserByEmail(email).then(result=>{
    var output = null;
    if(result.length > 0){
      if(email >  0) output = result[0];
      else output = result;
    }
    return res.send({output})

  }).catch(e=>{
    return res.status(400).send({error: "Error while fetching data."});
  })
}

module.exports = {getUserDetail, createNewUser, updateUser, deleteUser, getTotalUser, getUserbyEmail};