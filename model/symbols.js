const mongoose = require("mongoose");

const SymbolSchema = new mongoose.Schema(
    {
        symbol: {
            type: Array
        }
    }
)

module.exports = mongoose.model("Symbol", SymbolSchema)