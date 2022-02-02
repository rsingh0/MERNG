import gql from 'graphql-tag';
import user from './user.js';
import posts from './posts.js';
import comment from './comment.js';
import like from './like.js';
import queries from './queries.js';
import mutations from './mutations.js';

export default gql`
  ${user}
  ${posts}
  ${comment}
  ${like}
  ${queries}
  ${mutations}
`;
