const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const schema = require("./graphqlSchema/schema");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const connectToDatabase = require("./config/db");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

connectToDatabase();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))