import React from 'react';
import styles from './Detail.module.css';

const Detail = (props) => {
  const transaction = props.location.state.transaction;
  return (
    <div className={styles.Detail}>
      <div className={'styles.AccountNum'}>
        <p className={styles.TransactionLabel}>Account No.: </p>
        {transaction.account}
      </div>
      <div className={'styles.AccountName'}>
        <p className={styles.TransactionLabel}>Account Name: </p>
        {transaction.accountName}
      </div>
      <div className={'styles.Currency'}>
        <p className={styles.TransactionLabel}>Currency Code: </p>
        {transaction.currencyCode}
      </div>
      <div className={'styles.Amount'}>
        <p className={styles.TransactionLabel}>Amount: </p>
        {transaction.amount}
      </div>
      <div className={'styles.TransactionType'}>
        <p className={styles.TransactionLabel}>Transaction type: </p>
        {transaction.transactionType}
      </div>
    </div>
  );
};

export default Detail;
