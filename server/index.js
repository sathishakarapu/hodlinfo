const express = require("express");
const axios = require("axios");
const connectDB = require("./database");
const Ticker = require("./models/ticker");
const apiRoutes = require("./routes/api");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

const fetchDataAndStore = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const tickers = Object.values(response.data).slice(0, 10);

    await Ticker.deleteMany({});

    for (const ticker of tickers) {
      await Ticker.create({
        name: ticker.name,
        last: ticker.last,
        buy: ticker.buy,
        sell: ticker.sell,
        volume: ticker.volume,
        base_unit: ticker.base_unit,
      });
    }
  } catch (error) {
    console.error("Error fetching and storing data:", error);
  }
};

connectDB();

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await fetchDataAndStore();
});
