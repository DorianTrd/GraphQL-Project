const { Post, Comment } = require('../models');

const resolvers = {
    Query: {
        posts: async (_, { order = 'DESC' }) => {
            return Post.findAll({
                order: [['createdAt', order]],  
                include: [{ model: Comment, as: 'comments' }], 
            });
        },
        comments: async (_, { postId }) => {
            return Comment.findAll({ where: { postId } });
        },
    },

    Mutation: {
        createPost: async (_, { title, author, url }) => {
            return Post.create({ title, author, url }); 
        },
        createComment: async (_, { postId, content, name }) => {
            return Comment.create({ postId, content, name });
        },
        deletePost: async (_, { id }) => {
            const post = await Post.findByPk(id);
            if (!post) throw new Error('Post not found');
            await post.destroy();
            return true;
        },
        deleteComment: async (_, { id }) => {
            const comment = await Comment.findByPk(id);
            if (!comment) throw new Error('Comment not found');
            await comment.destroy();
            return true;
        },
    },
};

module.exports = resolvers;
