const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server');

const rawData = fs.readFileSync('./data/telefonbuch.json');
const telefonbuchData = JSON.parse(rawData);

const typeDefs = gql`
  type Contact {
    name: String!
    phone: String!
  }

  type Query {
    contacts: [Contact!]!
    searchByName(name: String!): [Contact!]!
  }
`;

const resolvers = {
  Query: {
    contacts: () => telefonbuchData,
    searchByName: (_, { name }) => {
      // Filter the telefonbuchData based on the provided name
      return telefonbuchData.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase()));
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
