const Edudata = require("../models/edunotice.models");

async function getTotalEduNews( req, res ){
    await Edudata.getAllEdunews().then(result => {
        if(result.length > 0){
            return res.send({result});
        }
    }).catch( e=>{
        return res.status(301).send({error: "Error while fetching data."})
    })
}

async function createEduNewsinfo(req,res){
    const newsData = req.body;
    if(!newsData || !newsData.eduid || !newsData.title || !newsData.content || !newsData.publish_date || !newsData.source || !newsData.category || !newsData.files)
    return res.send(400).send({error: "Fields are missing"});

    await Edudata.createEduNews(newsData).then(() => {
        return res.send({message: "Save Successfull"});
    }).catch(e => {
        return res.status(400).send({error: "Error while saving data."});
    });
}


async function updateEduNewsinfo(req, res){
    const newsData = req.body;

    try{
        const result = await Edudata.updateEdunews(newsData);
        if(result.affectedRows == 0){
            return res.status(400).send({ error: 'Error While updating edunewsinfo'});

        }
        return res.send({ message: 'EduNewsinfo updated successfully'});
    }catch (error){
        return res.status(400).send({ error: 'Error while updating EduNewsinfo'});
    }
}

async function deleteEduNewsInfo(req, res){
    const id = req.query.id;
    try{
      await Edudata.deleteEduNews(id);
      res.send({ message: "EduNews deleted successfully"});
    }catch (error){
      res.status(400).send({ error: "Error while deleting News"});
    }
}

module.exports = {getTotalEduNews, createEduNewsinfo, updateEduNewsinfo, deleteEduNewsInfo};