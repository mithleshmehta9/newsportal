const { query } = require('express');
const dbconn = require('../../config/config');

class Edudata{
    static async getAllEdunews(){
        var query = 'SELECT * FROM `edunews`;';
        return new Promise(( resolve, reject ) => {
            dbconn.query(query,[],(err,res) =>{
                // console.log(err, res, 'err, res');
                if(err) reject(err);
                else resolve(res);
            })
        })
    }


    static async createEduNews(edunewsData){
        const query = 'INSERT INTO `edunews`(`eduid`, `title`, `content`, `publish_date`, `source`, `category`, `files`) VALUES (?,?,?,?,?,?,?)';
        return new Promise((resolve, reject) => {
            dbconn.query(query,
                [
                    edunewsData.eduid,
                    edunewsData.title,
                    edunewsData.content,
                    edunewsData.publish_date, 
                    edunewsData.source, 
                    edunewsData.category,
                    edunewsData.files
                ],
                (err,res) => {
                    if (err) {
                        console.error('Error executing SQL query:', err);
                        reject(err);
                    } else {
                        console.log('New Edunews entry created:', res);
                        resolve(res);
                    }
                })
        })
    }

    static async updateEdunews(updates) {
        const {eduid, title, content, files, id} = updates;
        const query = 'UPDATE `edunews` SET eduid = ?, title = ?, content = ?, files = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
          dbconn.query(query, [eduid, title, content, files, id], (err, result) => {
            console.log(err, result), 'error';
            if (err) reject(err);
            else resolve(result);
          });
        });
    }

      static async deleteEduNews(id) {
        const query = 'DELETE FROM edunews WHERE id = ?';
        return new Promise((resolve, reject) => {
          dbconn.query(query, [Number(id)], (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }
}

module.exports = Edudata;