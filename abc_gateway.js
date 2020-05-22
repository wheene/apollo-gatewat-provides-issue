const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const port = 4000

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'A', url: 'http://localhost:3001' },
    { name: 'B', url: 'http://localhost:3002' },
    { name: 'C', url: 'http://localhost:3003' },
  ],
  debug: true
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen(port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
