const graphql = require("graphql");
const axios = require("axios");

const { GraphQLObjectType, GraphQLArray, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList, GraphQLSchema } = graphql;

const Price = new GraphQLObjectType({
    name: "Price",
    fields: () => ({
        c: { type: GraphQLFloat },
        h: { type: GraphQLFloat },
        l: { type: GraphQLFloat },
        o: { type: GraphQLFloat }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        quote: {
            type: new GraphQLList({ Price }),
            resolve(parent, args) {
                return axios.get("'https://finnhub.io/api/v1/quote?symbol=AAPL&token=bogh4o7rh5rej5i71mg0'")
                    .then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema()