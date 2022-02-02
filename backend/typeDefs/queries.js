export default `

type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
`;
