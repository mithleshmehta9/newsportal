const AdminModel = require('../models/admin.model');

async function adminUser(req,res){
    const admininfoEmail = req.body.email;
  const admininfoPassword = req.body.password;
  try {
    const admin = await AdminModel.getAdminByEmail(admininfoEmail);
    if (!admin || admin.length == 0) {
      return res.send({ message: 'Invalid email or password' });
    }

    if (admininfoPassword == admin[0].password) {
      return res.send({ message: 'Success' });
    } else {
      return res.send({ message: 'Password does not match' });
    }
  } catch (error) {
    return res.status(500).send({ error: 'Error while logging in' });
  }
}

async function getAdminEmail(req, res){
    const email = req.query.email;
    if(!email) return res.status(400).send({error: "ID is missing"});
    await AdminModel.getAdminByEmail(email).then(result=>{
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

  async function updateAdmin(req, res) {
    const adminData = req.body;
    try {
      const emailExists = await AdminModel.updateAdmin(adminData.email);
      const isEmail = await AdminModel.updateAdmin(adminData.email, adminData.id);
      if (emailExists === 1 && isEmail !== 0) {
        return res.status(400).send({ error: 'Email already exists for another user.' });
      }
      
      const result = await AdminModel.updateAdmin(adminData);
      if (result.affectedRows === 0) {
        return res.status(400).send({ error: 'Error while updating admin' });
      }
      
      return res.send({ message: 'admin updated successfully' });
    } catch (error) {
      return res.status(400).send({ error: 'Error while updating admin' });
    }
  }

module.exports = {adminUser, getAdminEmail, updateAdmin};