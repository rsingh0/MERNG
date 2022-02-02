import { registerUser, loginUser } from '../controllers/userController.js';

// parent - The previous object, which for a field on the root Query type is often not used.
// args - The arguments provided to the field in the GraphQL query.
// context - A value which is provided to every resolver and holds important contextual information like the currently logged in user, or access to a database.
// info - A value which holds field-specific information relevant to the current query as well as the schema details

const users = {
  Mutations: {
    register: (
      parent,
      { userInput: { username, password, confirmPassword, email } },
      context,
      info
    ) => registerUser(username, password, confirmPassword, email),
    login: (parent, { username, password }, context, info) =>
      loginUser(username, password),
  },
};

export default users;
