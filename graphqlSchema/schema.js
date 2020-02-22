const graphql = require("graphql");
const axios = require("axios");
const Symbols = require("../model/symbols");
require('dotenv').config()

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList, GraphQLSchema } = graphql;

const PriceType = new GraphQLObjectType({
    name: "Price",
    fields: () => ({
        c: { type: GraphQLFloat },
        h: { type: GraphQLFloat },
        l: { type: GraphQLFloat },
        o: { type: GraphQLFloat }
    })
});

const RecommendationType = new GraphQLObjectType({
    name: "Recommendation",
    fields: () => ({
        buy: { type: GraphQLInt },
        hold: { type: GraphQLInt },
        period: { type: GraphQLString },
        sell: { type: GraphQLInt },
        strongBuy: { type: GraphQLInt },
        strongSell: { type: GraphQLInt },
        symbol: { type: GraphQLString }
    })
});

const EarningsType = new GraphQLObjectType({
    name: "Earnings",
    fields: () => ({
        actual: { type: GraphQLFloat },
        estimate: { type: GraphQLFloat },
        period: { type: GraphQLString },
        symbol: { type: GraphQLString },
    })
});

const SymbolsType = new GraphQLObjectType({
    name: "Symbols",
    fields: () => ({
        _id: { type: GraphQLString },
        symbol: { type: new GraphQLList(NameType) }
    })
});

const NameType = new GraphQLObjectType({
    name: "Name",
    fields: () => ({
        name: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        quote: {
            type: PriceType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                console.log(args)
                return axios.get(`https://finnhub.io/api/v1/quote?symbol=${args.name}&token=${process.env.SECRET_KEY}`)
                    .then(res => res.data)
            }
        },
        recommendation: {
            type: new GraphQLList(RecommendationType),
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${args.name}&token=${process.env.SECRET_KEY}`)
                    .then(res => res.data)
            }
        },
        earnings: {
            type: new GraphQLList(EarningsType),
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`https://finnhub.io/api/v1/stock/earnings?symbol=${args.name}&token=${process.env.SECRET_KEY}`)
                    .then(res => res.data)
            }
        },
        symbols: {
            type: new GraphQLList(SymbolsType),
            resolve(parent, args) {
                return Symbols.find()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
