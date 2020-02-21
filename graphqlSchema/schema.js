const graphql = require("graphql");

const { GraphQLObjectType, GraphQLArray, GraphQLInt, GraphQLString, GraphQLFloat } = graphql;

const Price = new GraphQLObjectType({
    name: "Price",
    fields: () => ({
        c: { type: GraphQLFloat },
        h: { type: GraphQLFloat },
        l: { type: GraphQLFloat },
        o: { type: GraphQLFloat }
    })
})