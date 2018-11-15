import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Transaction.module.css';

const Transaction = ({transaction}) => {
  return (
    <div className={styles.Transaction}>
      <Link style={{color: 'black'}} to={{pathname: `/transactions/${transaction.account}`, state: {transaction: transaction}}}>
        <div className={styles.AccountNum}>{transaction.account}</div>
      </Link>
      <div className={styles.AccountName}>{transaction.accountName}</div>
      <div className={styles.Currency}>{transaction.currencyCode}</div>
      <div className={styles.Amount}>{transaction.amount}</div>
      <div className={styles.TransactionType}>
        {transaction.transactionType}
      </div>
    </div>
  );
};

export default Transaction;
