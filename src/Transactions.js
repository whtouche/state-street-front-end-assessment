import React, { Component } from 'react';
import { connect } from 'react-redux';
import Transaction from './Transaction';
import styles from './Transactions.module.css';

class Transactions extends Component {
  render() {
    console.log('this.props.transactions: ', this.props.transactions);
    return (
      <div>
        <div className={styles.Heading}>
          <div className={styles.AccountNum}>Account No.</div>
          <div className={styles.AccountName}>Account Name</div>
          <div className={styles.Currency}>Currency</div>
          <div className={styles.Amount}>Amount</div>
          <div className={styles.TransactionType}>Transaction Type</div>
        </div>
        {
          this.props.transactions &&
          this.props.transactions.map((transaction, index) => {
            return <Transaction transaction={transaction} key={index} />
          })
        }

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  transactions: state.transactions.transactions,
});

export default connect(mapStateToProps)(Transactions);
