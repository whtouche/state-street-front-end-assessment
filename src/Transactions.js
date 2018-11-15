import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectFilteredTransactions } from './reducer';
import Transaction from './Transaction';
import styles from './Transactions.module.css';

class Transactions extends Component {
  displayTransactions = (transactions) => {
    return transactions.map((transaction, index) => {
      return <Transaction transaction={transaction} key={index} />;
    });
  };

  render() {
    return (
      <div>
        <div className={styles.Heading}>
          <div className={styles.AccountNum}>Account No.</div>
          <div className={styles.AccountName}>Account Name</div>
          <div className={styles.Currency}>Currency</div>
          <div className={styles.Amount}>Amount</div>
          <div className={styles.TransactionType}>Transaction Type</div>
        </div>
        {this.props.transactions &&
          this.displayTransactions(this.props.filteredTransactions)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactions.transactions,
  filters: state.filters,
  filteredTransactions: selectFilteredTransactions(
    state.transactions.transactions,
    state.accountNameFilters,
    state.transactionTypeFilters,
  ),
});

export default connect(mapStateToProps)(Transactions);
