import React, { useEffect, useState } from "react";
import "./WalletHistory.css"; // Ensure you create this CSS file with your custom styles
import { postData } from "../../../services/NodeServices";

const WalletHistoryList = ({ walletid }) => {
  const [walletHistories, setWalletHistories] = useState([]);
  const [error, setError] = useState("");
  
  useEffect(() => {
   
    if (!walletid) return;
    const fetchHistory = async () => {
      try {
        const result  = await postData('api/users/getwallethistory',{walletid:walletid});

        console.log(result)
       
        if (result.status) {
          setWalletHistories(result.data);
        } else {
          setError(result.message || "No history found.");
        }
      } catch (err) {
        console.error("Error fetching wallet history:", err);
        setError("Error fetching history.");
      }
    };
    fetchHistory();
  }, [walletid]);

  return (
    <div className="wallet-history__container">
      <div className="wallet-history__header">Wallet History</div>
      {error && (
        <div className="wallet-history__error">
          {error}
        </div>
      )}
      {!error && walletHistories.length === 0 ? (
        <div className="wallet-history__no-data">No wallet history available.</div>
      ) : (
        <ul className="wallet-history__list">
          {walletHistories.map((history) => (
            <li key={history.wallethistoryid} className="wallet-history__item">
              <div className="wallet-history__row">
                <span className="wallet-history__label">Status:</span>
                <span className="wallet-history__value">{history.stat}</span>
              </div>
              <div className="wallet-history__row">
                <span className="wallet-history__label">Amount:</span>
                <span className="wallet-history__value">{history.coins}</span>
              </div>
              <div className="wallet-history__row">
                <span className="wallet-history__label">Account:</span>
                <span className="wallet-history__value">{history.account}</span>
              </div>
              <div className="wallet-history__row">
                <span className="wallet-history__label">IFSC:</span>
                <span className="wallet-history__value">{history.IFSC}</span>
              </div>
              <div className="wallet-history__row">
                <span className="wallet-history__label">Bank:</span>
                <span className="wallet-history__value">{history.bank}</span>
              </div>
              <div className="wallet-history__row">
                <span className="wallet-history__label">Branch:</span>
                <span className="wallet-history__value">{history.branch}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WalletHistoryList;
