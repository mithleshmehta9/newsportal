const { query } = require('express');
const dbconn = require('../../config/config');

class Newsdata{
    static async getAllNewsInfo(){
        var query = 'SELECT category, content, id, files, newsid, publish_date, source, status, title FROM newsinfo';
        return new Promise(( resolve, reject ) => {
            dbconn.query(query,[],(err,res) =>{
                if(err) reject(err);
                else resolve(res);
            })
        })
    }


    static async createNewsInfo(newsData){
        const query = 'INSERT INTO newsinfo (newsid, title, content, publish_date, source, category, files, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            dbconn.query(query,
                [
                    newsData.newsid,
                    newsData.title,
                    newsData.content, 
                    newsData.publish_date, 
                    newsData.source, 
                    newsData.category, 
                    newsData.files,
                    newsData.status
                ],
                (err,res) => {
                    if (err) {
                        console.error('Error executing SQL query:', err);
                        reject(err);
                    } else {
                        console.log('New news entry created:', res);
                        resolve(res);
                    }
                })
        })
    }

    static async updateNewsInfo(updates) {
        const {title, content, category, files, id} = updates;
        var x = '';
        if(files){
          x = `,files = '${files}'`;
        }
        else x = '';
        const query = `UPDATE newsinfo SET title = ?, content = ?, category = ? ${x} WHERE id = ?`;
        console.log(query,'query')
        return new Promise((resolve, reject) => {
          dbconn.query(query, [title, content, category, id], (err, result) => {
            console.log(err, result), 'error';
            if (err) reject(err);
            else resolve(result);
          });
        });
    }

      static async deleteNews(id) {
        const query = 'DELETE FROM newsinfo WHERE id = ?';
        return new Promise((resolve, reject) => {
          dbconn.query(query, [Number(id)], (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }


}

module.exports = Newsdata;