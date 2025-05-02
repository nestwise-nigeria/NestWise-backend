const { Op } = require("sequelize");
const Post = require('../../../models/postModel');
const User = require('../../../models/userModel');
const { error } = require('../../../utils/helpers');

const create = async (data) => {
    try {
        if (!data.title || !data.post || !data.authorId) {
            error(400, 'Title, content, and author ID are required');
        }

        const newPost = await Post.create({
            title: data.title,
            post: data.post,
            authorId: data.authorId
        });

        return newPost;
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const messages = err.errors.map(e => e.message);
            error(400, messages.join(', '));
        }
        error(err.statusCode || 500, err.message || 'Failed to create post');
    }
};

const getAll = async ({ 
    title, 
    post: content, 
    page = 1, 
    perPage = 5 
}) => {
    try {
        const where = {};
        if (title) where.title = { [Op.iLike]: `%${title}%` };
        if (content) where.post = { [Op.iLike]: `%${content}%` };

        const limit = parseInt(perPage, 10);
        const offset = (parseInt(page, 10) - 1) * limit;

        const { count, rows } = await Post.findAndCountAll({
            where,
            include: [{
                model: User,
                as: "author",
                attributes: ["id", "firstname", "lastname", "email", "phone"]
            }],
            order: [['createdAt', 'DESC']],
            limit,
            offset,
        });

        if (!rows.length) {
            error(404, 'No posts found');
        }

        return {
            total: count,
            page: parseInt(page, 10),
            perPage: limit,
            totalPages: Math.ceil(count / limit),
            posts: rows,
        };
    } catch (err) {
        error(err.statusCode || 500, err.message || 'Failed to fetch posts');
    }
};

const getPostsByUser = async (userId) => {
    return await Post.findAll({
        where: { authorId: userId },
        include: [{
            model: User,
            as: "author",
            attributes: ["id", "firstname", "lastname"]
        }],
        order: [['createdAt', 'DESC']]
    });
};

const updateOne = async ({ 
    postId, 
    title, 
    post: content, 
    userId 
}) => {
    try {
        if (!postId || !userId) {
            error(400, 'Post ID and user ID are required');
        }

        const post = await Post.findOne({ where: { id: postId } });
        if (!post) {
            error(404, 'Post not found');
        }

        if (post.authorId !== userId) {
            error(403, 'Unauthorized to update this post');
        }

        const updateData = {};
        if (title) updateData.title = title;
        if (content) updateData.post = content;
        updateData.updatedAt = new Date();

        const [affectedCount] = await Post.update(updateData, {
            where: { id: postId }
        });

        if (affectedCount === 0) {
            error(500, 'Failed to update post');
        }

        return await Post.findByPk(postId, {
            include: [{
                model: User,
                as: "author",
                attributes: ["id", "firstname", "lastname", "email", "phone"]
            }]
        });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const messages = err.errors.map(e => e.message);
            error(400, messages.join(', '));
        }
        error(err.statusCode || 500, err.message || 'Failed to update post');
    }
};

const deleteOne = async (postId, userId) => {
    try {
        if (!postId || !userId) {
            error(400, 'Post ID and user ID are required');
        }

        const post = await Post.findOne({ where: { id: postId } });
        if (!post) {
            error(404, 'Post not found');
        }

        if (post.authorId !== userId) {
            error(403, 'Unauthorized to delete this post');
        }

        const deletedCount = await Post.destroy({ where: { id: postId } });
        if (deletedCount === 0) {
            error(500, 'Failed to delete post');
        }

        return { success: true, message: 'Post deleted successfully' };
    } catch (err) {
        error(err.statusCode || 500, err.message || 'Failed to delete post');
    }
};

module.exports = {
    create,
    getAll,
    getPostsByUser,
    updateOne,
    deleteOne
};