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
      <div className={styles.App}>
        <Filters />
        <Transactions />
      </div>
    );
  }
}

export default connect()(App);
