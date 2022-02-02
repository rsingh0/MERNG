import Post from '../models/post.js';
import authorize from '../utils/check-auth.js';
import { AuthenticationError, UserInputError } from 'apollo-server';

// @desc Create Comment
// @access Private
const createComment = async (postId, body, context) => {
  try {
    // Post should only be created by authorized users
    const user = authorize(context);
    console.log('Authorized User:', user);

    if (!body || !body.trim()) {
      const errorPayload = {
        errors: {
          body: 'Comment body must not be empty',
        },
      };
      throw new UserInputError('Empty Comment', errorPayload);
    }

    // Fetch Post associated to comment
    const post = await Post.findById(postId);
    if (post) {
      // Add new comment as first comment
      post.comments.unshift({
        body,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      await post.save();
      return post;
    }
    throw new UserInputError('Post not found');
  } catch (error) {
    console.log(`Error creating comment on Post ${postId}`.red);
    throw new Error(error);
  }
};

// @desc Delete Comment by Post Id
// @access Private
const deleteComment = async (postId, commentId, context) => {
  // Comment should only be deleted by authorized users
  const { username } = authorize(context);
  console.log('Authorized User:', username);  

  const post = await Post.findById(postId);

  if (post) {
    const commentIndex = post.comments.findIndex((c) => c.id === commentId);

    if (post.comments[commentIndex].username === username) {
      post.comments.splice(commentIndex, 1);
      await post.save();
      return post;
    } else {
      throw new AuthenticationError('Action not allowed');
    }
  } else {
    throw new UserInputError('Post not found');
  }
};

export { createComment, deleteComment };
