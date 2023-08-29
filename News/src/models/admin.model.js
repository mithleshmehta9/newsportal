const { query } = require('express');
const dbConn = require('../../config/config');
const Signup = require('./signup.models');

class Admin{
    static async createAdmin(adminData){
        const quey = 'INSERT INTO admin (email, password) VALUES (?, ?)';
        //const {name, password, contact, email, username, address } = user;
        return new Promise((resolve, reject) => {
          dbConn.query(quey, [
            adminData.email, 
            adminData.password
          ], (err, result) => {
            console.log(err, result), 'error';
            if(err)reject(err);
            else resolve(result);
          });
        });
      }

      static async getAdminByEmail(email){
        const query = 'SELECT * FROM admin WHERE email = ?';
        return new Promise ((resolve, reject) => {
          dbConn.query(query,
            [email],
            (err,res) => {
              console.log(err,res,'err,res');
              if(err) reject(err);
              else resolve(res);
          });
        });
      }

      static async updateAdmin(updates) {
        const { name, email, images, id} = updates;
        const query = 'UPDATE admin SET name = ?, email = ?, images = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
          dbConn.query(query, [name, email, images, id], (err, result) => {
            console.log(err, result), 'error';
            if (err) reject(err);
            else resolve(result);
          });
        });
      }
}

module.exports = Admin;