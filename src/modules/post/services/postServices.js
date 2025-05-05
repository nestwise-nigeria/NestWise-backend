const { Op } = require("sequelize");
const Post = require('../../../models/postModel');
const User = require('../../../models/userModel');
const { error } = require('../../../utils/helpers');

const create = async (data) => {
    try {
        if (!data.title || !data.body) {
            error(400, 'title, post, and author ID are required');
        }
        const newPost = await Post.create({
            title: data.title,
            body: data.body,
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
        if (content) where.body = { [Op.iLike]: `%${content}%` };

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

const getOne = async (id) => {
    return await Post.findByPk(id); // Sequelize query
};

const updateOne = async ({ userId, id, title, body }) => {
    try {
        //Input Validation
        if (!id || !userId) {
            throw new Error("ID and user ID are required");
        }
        //Prepare Update Query
        const updateFields = {
            updatedAt: new Date()
        };
        if (title) updateFields.title = title;
        if (body) updateFields.body = body;

        //Find Post and Validate Ownership
        const post = await Post.findByPk(id);
        if (!post) {
            throw { statusCode: 404, message: "Post not found" };
        }
        if (post.authorId !== userId) {
            throw { statusCode: 403, message: "Unauthorized access to this resource" };
        }

        //Execute Update (PostgreSQL optimized)
        const [affectedCount, updatedPosts] = await Post.update(updateFields, {
            where: { id },
            returning: true, // Returns the updated record (PostgreSQL)
        });

        // Verify Update Success
        if (affectedCount === 0 || !updatedPosts || updatedPosts.length === 0) {
            throw { statusCode: 500, message: "Failed to update post" };
        }

        return updatedPosts[0]; // Return the first updated post

    } catch (err) {
        // Error Handling
        console.error("[Update Post Error]:", err);
        throw { statusCode: err.statusCode || 500, message: err.message || "Internal server error"};
    }
};

const deleteOne = async ({ userId, id }) => {
    try {
        //Input Validation
        if (!id || !userId) {
            throw { statusCode: 400, message: "ID and user ID are required" };
        }

        // Find Post and Validate Ownership
        const post = await Post.findByPk(id);
        if (!post) {
            throw { statusCode: 404, message: "Post not found" };
        }
        if (post.authorId !== userId) {
            throw { statusCode: 403, message: "Unauthorized access to this resource" };
        }

        // Execute Deletion
        const deletedCount = await Post.destroy({ 
            where: { id } 
        });

        //Verify Deletion Success
        if (deletedCount === 0) {
            throw { statusCode: 500, message: "Failed to delete post" };
        }

        return { success: true, message: "Post deleted successfully" };

    } catch (err) {
        console.error("[Delete Post Error]:", err);
        throw {
            statusCode: err.statusCode || 500,message: err.message || "Internal server error"};
    }
};
  
module.exports = {
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne
};