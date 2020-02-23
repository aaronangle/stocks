const mongoose = require("mongoose");

const SymbolSchema = new mongoose.Schema({
    symbol: Array
})

module.exports = mongoose.model("Symbol", SymbolSchema)