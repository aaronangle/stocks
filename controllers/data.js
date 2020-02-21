const express = require("express");
const router = express.Router();
const axios = require("axios");
const Symbols = require("../model/symbols")
const allSymbols = require("../model/symbols")

router.get("/api/basicinfo/:symbol", function (req, res) {
    const { symbol } = req.params;

    axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=bogh4o7rh5rej5i71mg0`)
        .then(response => {
            res.json({ data: response.data })
        })
})

router.get("/api/trends/:symbol", function (req, res) {
    const { symbol } = req.params;

    axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=bogh4o7rh5rej5i71mg0`)
        .then(response => {
            res.json({ data: response.data })
        })
})

router.get("/api/symbols", async function (req, res) {
    const symbols = await Symbols.find()
    res.json(symbols)
})

router.get("/api/ipo", function (req, res) {
    axios.get('https://finnhub.io/api/v1/calendar/ipo?token=bogh4o7rh5rej5i71mg0')
        .then(response => {
            res.json({ data: response.data })
        })
})

router.get("/api/earnings/:symbol", function (req, res) {
    const { symbol } = req.params
    axios.get(`https://finnhub.io/api/v1/stock/earnings?symbol=${symbol}&token=bogh4o7rh5rej5i71mg0`)
        .then(response => {
            res.json({ data: response.data })
        })
})

router.post("/api/add", async function (req, res) {
    await Symbols.updateOne({ $push: { symbol: req.body.symbol } })
    res.status(200)
})

router.post("/api/createSymbol", async function (req, res) {
    // await allSymbols.insert()
    console.log(req.body.element)
})
module.exports = router;