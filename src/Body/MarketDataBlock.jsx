import React, { useState, useEffect } from "react";

const MarketDataBlock = ({ coinId }) => {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coinId) {
      setError("No coinId provided");
      setLoading(false);
      return;
    }

    const fetchMarketData = async () => {
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

    fetchMarketData();
  }, [coinId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const { quotes, total_supply, circulating_supply, max_supply } =
    cryptoData || {};
  const usdData = quotes?.USD;

  if (!usdData) {
    return <p>No USD data available for this cryptocurrency.</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Current Market Data</h2>
      
      <div style={styles.row}>
        <div style={styles.column}>
          <p><strong>Market Cap:</strong> ${usdData.market_cap.toLocaleString()}</p>
          <p><strong>24-Hour Volume:</strong> ${usdData.volume_24h.toLocaleString()}</p>
          <p><strong>24-Hour Change:</strong> {usdData.percent_change_24h}%</p>
          <p><strong>Max Supply:</strong> {max_supply || "N/A"} BTC</p>
        </div>
        <div style={styles.column}>
          <p><strong>1-Hour Change:</strong> {usdData.percent_change_1h}%</p>
          <p><strong>7-Day Change:</strong> {usdData.percent_change_7d}%</p>
          <p><strong>Current Supply:</strong> {circulating_supply || "N/A"} BTC</p>
          <p><strong>All-Time High (ATH):</strong> $69,000</p>
          <p><em>(reached on November 10, 2021)</em></p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "600px",
    margin: "16px auto",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  column: {
    width: "45%",
  },
};

export default MarketDataBlock;
