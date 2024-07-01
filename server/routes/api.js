const express = require("express");
const Ticker = require("../models/ticker");
const router = express.Router();

router.get("/tickers", async (req, res) => {
  try {
    const tickers = await Ticker.find();
    res.json(tickers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tickers" });
  }
});

module.exports = router;
