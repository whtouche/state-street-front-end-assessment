import React from 'react';
import styles from './Transaction.module.css';

const Transaction = (props) => {
  return (
    <div className={styles.Transaction}>
      <div className={styles.AccountNum}>{props.transaction.account}</div>
      <div className={styles.AccountName}>{props.transaction.accountName}</div>
      <div className={styles.Currency}>{props.transaction.currencyCode}</div>
      <div className={styles.Amount}>{props.transaction.amount}</div>
      <div className={styles.TransactionType}>{props.transaction.transactionType}</div>
    </div>
  );
};

export default Transaction;
