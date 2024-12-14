import React, { useState, useEffect } from "react";

const CryptoDetailsBlock = ({ coinId }) => {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coinId) {
      setError("No coinId provided");
      setLoading(false);
      return;
    }

    const fetchCryptoDetails = async () => {
      try {
        const response = await fetch(
          `https://api.coinpaprika.com/v1/coins/${coinId}`
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

    fetchCryptoDetails();
  }, [coinId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const {
    name,
    symbol,
    rank,
    description,
    links,
    started_at,
  } = cryptoData || {};

  const conversions = {
    EUR: "28,500",
    GBP: "25,700",
    AUD: "46,200",
    CAD: "40,500",
    JPY: "3,200,000",
    CNY: "217,000",
    INR: "2,500,000",
    CHF: "27,000",
  };

  return (
    <div style={styles.container}>
      <h2>{name}</h2>
      <p style={styles.rank}>Rank {rank}</p>
      <p><strong>Symbol:</strong> {symbol}</p>
      <p><strong>Creation Date:</strong> {started_at || "N/A"}</p>
      <p>
        <strong>Source Code:</strong>{" "}
        <a href={links?.source_code[0]} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </p>
      <p>
        <strong>Twitter:</strong>{" "}
        <a href={`https://twitter.com/${links?.twitter_handle}`} target="_blank" rel="noreferrer">
          @{links?.twitter_handle}
        </a>
      </p>
      <p>
        <strong>Reddit:</strong>{" "}
        <a href={links?.reddit_url} target="_blank" rel="noreferrer">
          {links?.reddit_url}
        </a>
      </p>
      <button style={styles.button}>Add to compare</button>
      <h3>Currency Conversion</h3>
      <ul style={styles.list}>
        {Object.entries(conversions).map(([currency, value]) => (
          <li key={currency}>
            <strong>{currency}:</strong> {value}
          </li>
        ))}
      </ul>
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
  rank: {
    background: "#f3f4f6",
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "4px",
    marginBottom: "8px",
  },
  button: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    background: "#4caf50",
    color: "#fff",
    cursor: "pointer",
    margin: "16px 0",
  },
  list: {
    paddingLeft: "20px",
  },
};

export default CryptoDetailsBlock;
