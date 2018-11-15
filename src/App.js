import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './App.module.css';
import Filters from './Filters';
import { fetchData } from './reducer';
import Transactions from './Transactions';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchData());
  }

  render() {
    return (
      <div>
        <h1 className={styles.AppHeader}>My Transactions</h1>
        <hr className={styles.AppHeader}/>
        <div className={styles.App}>
          <Filters />
          <Transactions />
        </div>
      </div>
    );
  }
}

export default connect()(App);
