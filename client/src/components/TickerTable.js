import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TickerTable.css";

const TickerTable = () => {
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tickers");
        setTickers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tickers:", error);
      }
    };

    fetchTickers();
  }, []);

  return (
    <div className="container">
      <header>
        <h1 className="hold">HODLINFO</h1>
        <div className="currency-selectors">
          <button>INR</button>
          <button>BTC</button>
          <button>BUY BTC</button>
        </div>
        <button className="connect-telegram">Connect Telegram</button>
        <div className="theme-toggle">
          <input type="checkbox" id="theme-switch" />
          <label htmlFor="theme-switch"></label>
        </div>
      </header>
      <p className="best">Best Price to Trade</p>
      <div className="statistics">
        <div className="stat">
          <p className="price">0.88 %</p>
          <p>5 Mins</p>
        </div>
        <div className="stat">
          <p className="price">1.53 %</p>
          <p>1 Hour</p>
        </div>
        <div className="stat">
          <p className="mid">₹ 54,51,831</p>
        </div>
        <div className="stat">
          <p className="price">3.1 %</p>
          <p>1 Day</p>
        </div>
        <div className="stat">
          <p className="price">10.53 %</p>
          <p>7 Days</p>
        </div>
      </div>
      <p className="average">Average BTC/INR net price including commission</p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Platform</th>
            <th>Last Traded Price</th>
            <th>Buy / Sell Price</th>
            <th>Difference</th>
            <th>Savings</th>
          </tr>
        </thead>
        <tbody>
          {tickers.map((ticker, index) => (
            <tr key={ticker._id} className="table-row">
              <td>{index + 1}</td>
              <td>{ticker.name}</td>
              <td>₹ {ticker.last}</td>
              <td>
                ₹ {ticker.buy} / ₹ {ticker.sell}
              </td>
              <td>
                {(((ticker.sell - ticker.buy) / ticker.buy) * 100).toFixed(2)}%
              </td>
              <td>₹ {(ticker.sell - ticker.buy).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TickerTable;
