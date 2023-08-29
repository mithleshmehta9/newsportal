const UserPost = require('../models/userpost.models');

async function getTotalPost( req, res ){
    await UserPost.getAllPost().then(result => {
        if(result.length > 0){
            return res.send({result});
        }
    }).catch( e=>{
        return res.status(301).send({error: "Error while fetching data."})
    })
}

async function getpostsDetail(req, res) {
    const user_id = req.query.user_id;
    if (!user_id) return res.status(400).send({ error: "UserID is missing" });
  
    try {
      const result = await UserPost.getPosts(user_id);
      return res.send({ output: result });
    } catch (e) {
      return res.status(400).send({ error: "Error while fetching data." });
    }
  }
  




async function createNewPost(req,res){
    const postData = req.body;
    if(!postData || !postData.user_id || !postData.content  || !postData.files  || !postData.likes  || !postData.comments || !postData.shares || !postData.created_at || !postData.updated_at)
    return res.send(490).send({error: "Fields are missing"});

    await UserPost.createNewsPost(postData).then(() => {
        return res.send({message: "Save Successfull"});
    }).catch(e => {
        return res.status(400).send({error: "Error while saving data."});
    });
}

async function updatePost(req, res){
    const postData = req.body;

    try{
        const result = await UserPost.updatePost(postData);
        if(result.affectedRows == 0){
            return res.status(400).send({ error: 'Error While updating postinfo'});

        }
        return res.send({ message: 'Postinfo updated successfully'});
    }catch (error){
        return res.status(400).send({ error: 'Error while updating postinfo'});
    }
}

async function deletePostInfo(req, res){
    const id = req.query.id;
    try{
      await UserPost.deletePost(id);
      res.send({ message: "Post deleted successfully"});
    }catch (error){
      res.status(400).send({ error: "Error while deleting Post"});
    }
}

module.exports = { getTotalPost, getpostsDetail, createNewPost, updatePost, deletePostInfo};
