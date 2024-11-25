const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const sequelize = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, 
});


async function startServer() {
  await server.start();
  server.applyMiddleware({ app });


  sequelize.sync({ alter: true }) 
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error('Error synchronizing database', err));

  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql');
  });
}

startServer();
