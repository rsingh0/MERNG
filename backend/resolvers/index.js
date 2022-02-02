import posts from './posts.js';
import users from './users.js';
import comments from './comments.js';

const resolvers = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...posts.Query,
  },
  Mutation: {
    ...users.Mutations,
    ...posts.Mutations,
    ...comments.Mutations,
  },
};

export default resolvers;
