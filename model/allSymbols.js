const mongoose = require("mongoose");

const AllSymbolSchema = new mongoose.Schema(
    {
        symbol: String
    }
)

module.exports = mongoose.model("allSymbol", AllSymbolSchema)