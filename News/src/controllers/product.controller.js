const Product = require('../models/poduct.model')

async function getTotalProductinfo( req, res ){
    await Product.getAllProduct().then(result => {
        if(result.length > 0){
            return res.send({result});
        }
    }).catch( e=>{
        return res.status(301).send({error: "Error while fetching data."})
    })
}

async function createProductinfo(req,res){
    const productData = req.body;
    if(!productData || !productData.productName || !productData.price || !productData.image )
    res.json(productData);

    await Product.createProduct(productData).then(() => {
        return res.send({message: "Save Successfull"});
    }).catch(e => {
        res.status(500).send('Internal Server Error');
    });
}


async function updateProductinfo(req, res){
    const productData = req.body;

    try{
        const result = await Product.updateProduct(productData);
        if(result.affectedRows == 0){
            return res.status(400).send({ error: 'Error While updating product'});

        }
        return res.send({ message: 'product updated successfully'});
    }catch (error){
        return res.status(400).send({ error: 'Error while updating product'});
    }
}

module.exports = {getTotalProductinfo, createProductinfo, updateProductinfo};