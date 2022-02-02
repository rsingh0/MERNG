export default `

input UserInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
}
type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String
}
`;
