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
        o: { type: GraphQLFloat },
        pc: { type: GraphQLFloat }
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

const CompanyInformationType = new GraphQLObjectType({
    name: "CompanyInfo",
    fields: () => ({
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        currency: { type: GraphQLString },
        cusip: { type: GraphQLString },
        description: { type: GraphQLString },
        exchange: { type: GraphQLString },
        ggroup: { type: GraphQLString },
        gind: { type: GraphQLString },
        gsector: { type: GraphQLString },
        gsubind: { type: GraphQLString },
        ipo: { type: GraphQLString },
        isin: { type: GraphQLString },
        naics: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        state: { type: GraphQLString },
        ipo: { type: GraphQLString },
        weburl: { type: GraphQLString },
        employeeTotal: { type: GraphQLString }
    })
})

const CompanyNews = new GraphQLObjectType({
    name: "CompanyNews",
    fields: () => ({
        category: { type: GraphQLString },
        datetime: { type: GraphQLString },
        headline: { type: GraphQLString },
        id: { type: GraphQLString },
        image: { type: GraphQLString },
        related: { type: GraphQLString },
        source: { type: GraphQLString },
        summary: { type: GraphQLString },
        url: { type: GraphQLString }
    })
})
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        quote: {
            type: PriceType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
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
        companyInformation: {
            type: CompanyInformationType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`https://finnhub.io/api/v1/stock/profile?symbol=${args.name}&token=${process.env.SECRET_KEY}`)
                    .then(res => res.data)
            }
        },
        companyNews: {
            type: new GraphQLList(CompanyNews),
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`https://finnhub.io/api/v1/news/${args.name}?token=${process.env.SECRET_KEY}`)
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
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addSymbol: {
            type: NameType,
            args: {
                name: { type: GraphQLString }
            },
            async resolve(parent, args) {
                await Symbols.updateOne({ $push: { symbol: { "name": args.name } } });
                return args.name
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
