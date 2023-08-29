const Newsdata = require("../models/news.models");


async function getTotalNewsInfo( req, res ){
    await Newsdata.getAllNewsInfo().then(result => {
        if(result.length > 0){
            return res.send({result});
        }
    }).catch( e=>{
        return res.status(301).send({error: "Error while fetching data."})
    })
}

async function createNewNewsInfo(req,res){
    const newsData = req.body;
    if(!newsData || !newsData.newsid || !newsData.title || !newsData.content || !newsData.publish_date || !newsData.source || !newsData.category || !newsData.files || !newsData.status)
    return res.send(400).send({error: "Fields are missing"});

    await Newsdata.createNewsInfo(newsData).then(() => {
        return res.send({message: "Save Successfull"});
    }).catch(e => {
        return res.status(400).send({error: "Error while saving data."});
    });
}


async function updateNews(req, res){
    const newsData = req.body;

    try{
        const result = await Newsdata.updateNewsInfo(newsData);
        if(result.affectedRows == 0){
            return res.status(400).send({ error: 'Error While updating newsinfo'});

        }
        return res.send({ message: 'Newsinfo updated successfully'});
    }catch (error){
        return res.status(400).send({ error: 'Error while updating Newsinfo'});
    }
}

async function deleteNewsInfo(req, res){
    const id = req.query.id;
    try{
      await Newsdata.deleteNews(id);
      res.send({ message: "News deleted successfully"});
    }catch (error){
      res.status(400).send({ error: "Error while deleting News"});
    }
}


module.exports = {getTotalNewsInfo, createNewNewsInfo, updateNews, deleteNewsInfo};