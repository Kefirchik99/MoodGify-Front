import React, { useState, useEffect } from "react";

const CryptoCard = ({ coinId }) => {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coinId) {
      setError("No coinId provided");
      setLoading(false);
      return;
    }

    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          `https://api.coinpaprika.com/v1/tickers/${coinId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCryptoData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [coinId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const { name, symbol, quotes, rank } = cryptoData || {};
  const usdData = quotes?.USD;

  if (!usdData) {
    return <p>No USD data available for this cryptocurrency.</p>;
  }

  return (
    <div className="crypto-card" style={styles.card}>
      <h2>{name} ({symbol})</h2>
      <p><strong>Rank:</strong> {rank}</p>
      <p><strong>Price:</strong> ${usdData.price.toFixed(2)}</p>
      <p><strong>Market Cap:</strong> ${usdData.market_cap.toLocaleString()}</p>
      <p><strong>24h Change:</strong> {usdData.percent_change_24h}%</p>
      <h3>Historical Price Data:</h3>
      <ul style={styles.list}>
        <li><strong>1 Day Ago:</strong> ${(usdData.price * (1 - usdData.percent_change_24h / 100)).toFixed(2)}</li>
        <li><strong>1 Week Ago:</strong> Estimate not available from this API.</li>
        <li><strong>1 Month Ago:</strong> Estimate not available from this API.</li>
      </ul>
      <h3>Additional Information:</h3>
      <ul style={styles.list}>
        <li>Lightning Network Update: March 20, 2019</li>
        <li>Block Reward Halving: May 11, 2020</li>
        <li>Bitcoin Cash Fork: August 1, 2017</li>
      </ul>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "400px",
    margin: "16px auto",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    fontFamily: "Arial, sans-serif",
  },
  list: {
    paddingLeft: "20px",
  },
};

export default CryptoCard;
