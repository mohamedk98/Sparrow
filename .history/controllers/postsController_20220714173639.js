const postsApi = require("../datasources/postsApi")
const crypto = require("crypto")


const createPost = async (req,res)=>{
const content = req.body.content
const images = req.files[0].
const userId = req.userId

const postId = crypto.randomBytes(32).toString("hex")
const createdAt = new Date().toISOString()
const media = [...images.]
}


module.exports={createPost}