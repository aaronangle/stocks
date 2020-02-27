import gql from "graphql-tag";

const GET_QUOTE = gql`
    query GetQuote{
        quote(name: $name){
            c
            h
            l
            o
        }
    }
`;

const GET_RECOMMENDATION = gql`
    query GetRecommendation{
        recommendation(name: $name){
            buy
            hold
            period
            sell
            strongBuy
            strongSell
            symbol
        }
    }
`;

const GET_EARNINGS = gql`
    query GetEarnings{
        earnings(name: $name){
            actual
            estimate
            period
            symbol
        }
    }
`;

const GET_SYMBOLS = gql`
    query GetSymbols{
        symbols{
            symbol
        }
    }
`;

const GET_COMPANYINFO = gql`
    query GetCompanyInfo{
        companyInformation{
            address
            city
            country
            currency
            cusip
            description
            exchange
            ggroup
            gind
            gsector
            gsubind
            ipo
            isin
            naic
            name
            phone
            state
            ipo
            weburl
        }
    }
`;

const ADD_SYMBOL = gql`
mutation AddSymbols{
    name{
        symbol
    }
}
`;

export {
    GET_QUOTE,
    GET_RECOMMENDATION,
    GET_SYMBOLS,
    GET_EARNINGS,
    GET_COMPANYINFO,
    ADD_SYMBOL
}