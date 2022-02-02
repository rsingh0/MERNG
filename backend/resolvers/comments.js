import {
  createComment,
  deleteComment,
} from '../controllers/commentController.js';

const comments = {
  Mutations: {
    createComment: (parent, { postId, body }, context) =>
      createComment(postId, body, context),
    deleteComment: (parent, { postId, commentId }, context) =>
      deleteComment(postId, commentId, context),
  },
};

export default comments;
