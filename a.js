const { ApolloServer, gql } = require('apollo-server');

const port = 3001

const sdl_service = `

type A @key(fields: "id") {
  id: ID!
  a: String!
}

type Query {
  as: [A!]!
}
`;

const sdl_federation = `
scalar _Any
scalar _FieldSet

# a union of all types that use the @key directive
union _Entity = A

type _Service {
  sdl: String
}

extend type Query {
  _entities(representations: [_Any!]!): [_Entity]!
  _service: _Service!
}

directive @external on FIELD_DEFINITION
directive @requires(fields: _FieldSet!) on FIELD_DEFINITION
directive @provides(fields: _FieldSet!) on FIELD_DEFINITION
directive @key(fields: _FieldSet!) on OBJECT | INTERFACE

# this is an optional directive discussed below
directive @extends on OBJECT | INTERFACE
`

const typeDefs = gql(sdl_service + sdl_federation);

const resolvers = {
  Query: {
    _service(obj, args, context, info) {
      return { sdl: sdl_service };
    }
  },
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
});

server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});