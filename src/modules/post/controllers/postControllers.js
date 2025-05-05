const { error } = require('../../../validations/postValidation');
const postService = require('../services/postServices')
const addPost = async (req, res) => {
    //accept data from request body
    try{
        const data = req.body
        const authorId = req.user.id
        data.authorId = authorId
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

const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        // Convert ID to integer 
        const numericId = parseInt(id, 10);
       // Validate that ID is a valid number
        if (isNaN(numericId)) {
            return res.status(400).json({
                success: false,
                message: "Post ID must be a valid number",
            });
        }
         // Fetch post using the parsed integer ID
        const post = await postService.getOne(numericId);
        // Handle case where post doesn't exist
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        // Success response
        res.status(200).json({ success: true, message: 'posts fetched successfully', data: post })
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message })
    }
};



const updateSinglePost = async (req, res) => {
    try {
        const updatedPost = await postService.updateOne({
            userId: req.user.id,
            id: req.params.id,
            title: req.body.title,
            body: req.body.body
        });
        res.status(200).json({ success: true, data: updatedPost });
    } catch (err) { res.status(err.statusCode || 500).json({success: false, message: err.message})
    }
};

const deleteSinglePost = async (req, res) => {
    try {
        const result = await postService.deleteOne({
            userId: req.user.id,
            id: req.params.id
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(err.statusCode || 500).json({success: false, message: err.message})
    }
};

module.exports = {
    addPost,
    getAllPost,
    getSinglePost,
    updateSinglePost,
    deleteSinglePost
}