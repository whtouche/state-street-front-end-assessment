import React, { Component } from 'react';
import { connect } from "react-redux";
import styles from './App.module.css';
import { fetchData } from './reducer';
import Transactions from './Transactions';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchData())
  }

  render() {
    return (
      <div className={styles.App}>
        <h1>App</h1>
        <Transactions />
      </div>
    );
  }
}

export default connect()(App)

