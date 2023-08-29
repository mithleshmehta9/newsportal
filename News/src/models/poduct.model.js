const { query } = require('express');
const dbconn = require('../../config/config');

class Product{
    static async getAllProduct(){
        var query = 'SELECT * FROM `product`;';
        return new Promise(( resolve, reject ) => {
            dbconn.query(query,[],(err,res) =>{
                // console.log(err, res, 'err, res');
                if(err) reject(err);
                else resolve(res);
            })
        })
    }


    static async createProduct(productData){
        const query = 'INSERT INTO `product`(`productName`, `price`, `image`) VALUES (?,?,?)';
        return new Promise((resolve, reject) => {
            dbconn.query(query,
                [
                    productData.productName,
                    productData.price,
                    productData.image
                    
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

    static async updateProduct(updates) {
        const {productName, price, image, id} = updates;
        const query = 'UPDATE `product` SET productName = ?, price = ?, image = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
          dbconn.query(query, [productName, price, image, id], (err, result) => {
            console.log(err, result), 'error';
            if (err) reject(err);
            else resolve(result);
          });
        });
    }
}

module.exports = Product;