import { ApolloServer } from 'apollo-server';
import typeDefs from './typeDefs/index.js';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import resolvers from './resolvers/index.js';

dotenv.config({ path: './config.env' });
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const port = process.env.PORT || 5000;

server.listen(port).then((res) => {
  console.log(
    `Server running at ${res.url} on ${process.env.NODE_ENV} environment at port ${port}`
      .yellow.bold
  );
});
