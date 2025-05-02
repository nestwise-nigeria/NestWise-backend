const { error } = require('../../../validations/postValidation');
const postService = require('../services/postServices')
const addPost = async (req, res) => {
    //accept data from request body
    try{
        const data = req.body
        data.authorId = req.user.id
        const postContent = await postService.create(data);
        res.status(201).json({ success: true, data: postContent });
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

const getAllPost = async (req, res) => {
    try{
        const { title, body} = req.query;
        const postContents = await postService.getAll({ title, body});

        res.status(200).json( { success: true, data: postContents });
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

const getSinglePost = async(req, res) => {
    try{
        const id = req.params.id;
        const postContent = await postService.getOne(id);

        res.status(200).json( { success: true, data: postContent });
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

const getUserPosts = async (req, res) => {
    try{
        const userId = req.user.id
        console.log(userId)
        const postContents = await postService.getUserPosts({ userId });

        res.status(200).json({ success: true, message: 'posts fetched successfully', data: postContents })
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message })
    }
}

const updateSinglePost = async (req, res) => {
    try{
        const id = req.params.id;
        const userId = req.user.id
        const { title, body, status} = req.body

         const updatedPost = await postService.updateOne({ userId, id, title, body, status});
        
        res.status(200).json({ success: true, message: 'post updated successfully', data: updatedPost });

    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

const deleteSinglePost = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id
    try{
        const deleted = await postService.deleteOne(id, userId);

        res.status(200).json({ success: true, messsage: 'Item deleted successfully', data: deleted });
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

module.exports = {
    addPost,
    getAllPost,
    getSinglePost,
    getUserPosts,
    updateSinglePost,
    deleteSinglePost
}