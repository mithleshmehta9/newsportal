const { query } = require('express');
const dbconn = require('../../config/config');

class UserPost{
    static async createNewsPost(postData){
        const query = 'INSERT INTO posts (user_id, content, files, likes, comments, shares, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            dbconn.query(query,
                [
                    postData.user_id, 
                    postData.content, 
                    postData.files, 
                    postData.likes, 
                    postData.comments, 
                    postData.shares, 
                    postData.created_at, 
                    postData.updated_at
                ],
                (err,res) => {
                    if (err) {
                       console.error('Error executing SQL query:', err);
                        reject(err);
                    } else {
                        console.log('User post entry created:', res);
                        resolve(res);
                    }
                })
        })
    }

    static async getPosts(user_id){
        var query = 'select * from posts where user_id = ?';
        return new Promise((resolve, reject) => {
          dbconn.query(query,
            [
              Number(user_id)
            ],
            (err,res)=>{
            console.log(err,res,'err,res');
            if(err) reject(err);
            else resolve(res);
          })
        })
      }
    

    static async getAllPost(){
        var query = 'SELECT * FROM posts;';
        return new Promise(( resolve, reject ) => {
            dbconn.query(query,[],(err,res) =>{
                // console.log(err, res, 'err, res');
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static async updatePost(update) {
        const {content, files, id} = update;
        const query = 'UPDATE posts SET content = ?, files = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
          dbconn.query(query, [content, files, id], (err, result) => {
            console.log(err, result), 'error';
            if (err) reject(err);
            else resolve(result);
          });
        });
    }

    static async deletePost(id) {
        const query = 'DELETE FROM posts WHERE id = ?';
        return new Promise((resolve, reject) => {
          dbconn.query(query, [Number(id)], (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }
}

module.exports = UserPost;