import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Filters.module.css';
import { toggleAccountNameFilter, toggleTransactionTypeFilter } from './reducer';

class Filters extends Component {
  render() {
    return (
      <div>
        <h3 className={styles.FilterTitle}>Filters</h3>
        <div className={styles.AccountNameFilters}>
          <p className={styles.FilterHeader}>Account Name</p>
          {this.props.filters.accountName &&
            this.props.filters.accountName.map((name, index) => {
              return (
                <div className={styles.Filter} key={index}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      this.props.dispatch(toggleAccountNameFilter(name))
                    }
                  />
                  {name}
                </div>
              );
            })}
        </div>
        <div className={styles.TransactionTypeFilters}>
          <p className={styles.FilterHeader}>Transaction Type</p>
          {this.props.filters.transactionType &&
            this.props.filters.transactionType.map((name, index) => {
              return (
                <div className={styles.Filter} key={index}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      this.props.dispatch(toggleTransactionTypeFilter(name))
                    }
                  />
                  {name}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filterTypes,
});

export default connect(mapStateToProps)(Filters);
