import gql from "graphql-tag";

const GET_QUOTE = gql`
    query GetQuote($name: String!){
        quote(name: $name){
            c
            h
            l
            o
        }
    }
`;

const GET_RECOMMENDATION = gql`
    query GetRecommendation($name: String!){
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
    query GetEarnings($name: String!){
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
            symbol{
                name
            }
        }
    }
`;

const GET_COMPANYINFO = gql`
    query GetCompanyInfo($name: String!){
        companyInformation(name: $name){
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
            naics
            name
            phone
            state
            ipo
            weburl
            employeeTotal
        }
    }
`;

const GET_COMPANY_NEWS = gql`
    query GetCompanyNews($name: String!){
        companyNews(name: $name){
            category
            datetime
            headline
            id
            image
            related
            source
            summary
            url
        }
    }
`;

const GET_GENERAL_NEWS = gql`
    query GetGeneralNews{
        generalNews{
            category
            datetime
            headline
            id
            image
            related
            source
            summary
            url
        }
    }
`;

const ADD_SYMBOL = gql`
mutation AddSymbols($name: String!){
    addSymbol(name: $name){
            name
}
}
`;

export {
    GET_QUOTE,
    GET_RECOMMENDATION,
    GET_SYMBOLS,
    GET_EARNINGS,
    GET_COMPANYINFO,
    GET_COMPANY_NEWS,
    GET_GENERAL_NEWS,
    ADD_SYMBOL
}