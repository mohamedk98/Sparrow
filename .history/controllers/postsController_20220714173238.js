const postsApi = require("../datasources/postsApi")

const createPost = async (req,res)=>{
const content = req.body.content
const images = req.files
const userId = req.userId

}


module.exports={createPost}