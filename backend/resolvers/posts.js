import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
} from '../controllers/postController.js';

const posts = {
  Query: {
    getPosts: () => getPosts(),
    getPost: (_, { postId }) => getPost(postId),
  },
  Mutations: {
    createPost: (parent, { body }, context) => createPost(body, context),
    deletePost: (parent, { postId }, context) => deletePost(postId, context),
    likePost: (parent, { postId }, context) => likePost(postId, context),
  },
};

export default posts;
