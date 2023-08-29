const { query } = require('express');
const dbConn = require('../../config/config');

class Signup {
    static async getAllUser(){
      var query = 'select * from users;';
      return new Promise((resolve, reject) => {
        dbConn.query(query,[],
          (err,res)=>{
          console.log(err,res,'err,res');
          if(err) reject(err);
          else resolve(res);
        })
      })
    }

    
    static async getUser(id){
      var query = 'select * from users where id = ?';
      return new Promise((resolve, reject) => {
        dbConn.query(query,
          [
            Number(id)
          ],
          (err,res)=>{
          console.log(err,res,'err,res');
          if(err) reject(err);
          else resolve(res);
        })
      })
    }

    static async createUser(userData){
      const quey = 'INSERT INTO users (name, password, contact, email, username, address) VALUES (?, ?, ?, ?, ?, ?)';
      //const {name, password, contact, email, username, address } = user;
      return new Promise((resolve, reject) => {
        dbConn.query(quey, [
          userData.name, 
          userData.password, 
          userData.contact, 
          userData.email, 
          userData.username, 
          userData.address
        ], (err, result) => {
          console.log(err, result), 'error';
          if(err)reject(err);
          else resolve(result);
        });
      });
    }

    static async updateUser(updates) {
      const { name, contact, email, address, id} = updates;
      const query = 'UPDATE users SET name = ?, contact = ?, email = ?, address = ? WHERE id = ?';
      return new Promise((resolve, reject) => {
        dbConn.query(query, [name, contact, email, address, id], (err, result) => {
          console.log(err, result), 'error';
          if (err) reject(err);
          else resolve(result);
        });
      });
    }
  
    static async deleteUser(id) {
      const query = 'DELETE FROM users WHERE id = ?';
      return new Promise((resolve, reject) => {
        dbConn.query(query, [Number(id)], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    }

    static async checkEmail(email){
      const query = `select count(id) AS isAvailable from users where email = ?`;
      return new Promise((resolve, reject) => {
        dbConn.query(query,
          [email],
          (err,result)=>{
            if (err) reject(err);
            else {
              // const count = result[0].count;
              // const emailExists = count > 0;
              resolve(result[0]["isAvailable"]);
            }
        })
      })
    }

    static async checkEmailOnUpdate(email, id) {
      const query = 'SELECT COUNT(id) AS isAvailable FROM users WHERE email = ? AND id <> ?';
      return new Promise((resolve, reject) => {
        dbConn.query(query, 
          [
          email, id
          ], 
          (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]['isAvailable']);
          }
        });
      });
    }

    static async getUserByEmail(email){
      const query = 'SELECT * FROM users WHERE email = ?';
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





}

module.exports = Signup;