import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import styles from './App.module.css';
import Detail from './Detail';
import Filters from './Filters';
import { fetchData } from './reducer';
import Transactions from './Transactions';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchData());
  }

  render() {
    return (
      <Router>
        <div>
          <h1 className={styles.AppHeader}>
            <Link to="/" style={{color: 'black'}}>My Transactions</Link>
          </h1>
          <hr className={styles.AppHeader} />
          <div className={styles.App}>
            <Route exact path="/" component={Filters} />
            <Route exact path="/" component={Transactions} />

            <Route
              path="/transactions/:transaction"
              render={(props) => <Detail {...props} />}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
