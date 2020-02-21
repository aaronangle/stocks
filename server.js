const express = require("express");
const app = express();
const data = require("./controllers/data");
const PORT = process.env.PORT || 3001;
const connectToDatabase = require("./config/db");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(data)

app.get("*", (req, res) => {
    res.sendFile(path.join)
});

connectToDatabase();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))