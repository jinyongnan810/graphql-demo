const grapghql = require("graphql");
const _ = require("lodash"); //help walk through data
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = grapghql;

const users = [
  { id: "1", firstName: "bill", age: 20 },
  { id: "2", firstName: "mike", age: 20 },
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      // to find a user node
      type: UserType,
      args: { id: { type: GraphQLString } }, // pass id to get user
      resolve(parentValue, args) {
        // actual fetching data step
        return _.find(users, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
