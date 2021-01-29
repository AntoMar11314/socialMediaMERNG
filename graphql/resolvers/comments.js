const { AuthenticationError , UserInputError } = require("apollo-server");

const checkAuth = require('../../util/check-auth')
const Post = require("../../models/Post");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Commento vuoto", {
          errors: {
            body: "Il corpo del commento non può essere vuoto",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post non trovato");
    },
    async deleteComment(_, { postId , commentId}, context) {
        const { username } = checkAuth(context);

        const post = await Post.findById(postId);

        if(post) {
            const commentIndex = post.comments.findIndex(c => c.id === commentId);

            if(post.comments[commentIndex].username === username){
                post.comments.splice(commentIndex, 1)
                await post.save();
                return post;
            } else {
                throw new AuthenticationError('Azione non permessa')
            }
        } else {
            throw new UserInputError('Post non trovato')
        }
    }
  },
};
