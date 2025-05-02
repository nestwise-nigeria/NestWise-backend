const express = require('express')
const validateRequest = require('../../../middlewares/validateRequest')
const postValidator = require('../../../validations/postValidation')
const authMiddleware = require('../../../middlewares/authMiddleware')
const { addPost, 
    getAllPost, 
    getSinglePost, 
    updateSinglePost, 
    deleteSinglePost,
    getUserPosts } = require('../controllers/postControllers');

const router = express.Router();
router.get('/user-post',authMiddleware.authenticate, authMiddleware.authorize, getUserPosts)
router.get('/:id', getSinglePost);
router.get('/', getAllPost);

router.post('/:id/add', validateRequest(postValidator.createPostSchema), authMiddleware.authenticate, authMiddleware.authorize, addPost);
router.put('/:id', validateRequest(postValidator.updatePostSchema), authMiddleware.authenticate, authMiddleware.authorize, updateSinglePost);
router.delete('/:id',authMiddleware.authenticate, authMiddleware.authorize, deleteSinglePost);

module.exports = router