import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

export const reducer = (
  state = {
    transactions: [],
    filteredTransactions: [],
    filterTypes: {},
    accountNameFilters: [],
    transactionTypeFilters: [],
    loading: false,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_FILTER_NAMES:
      return {
        ...state,
        filterTypes: action.payload,
      };
    case TOGGLE_ACCOUNT_NAME_FILTER:
      const accountNameFilters = state.accountNameFilters.includes(
        action.payload,
      )
        ? removeFromArray(state.accountNameFilters, action.payload)
        : [...state.accountNameFilters, action.payload];
      return {
        ...state,
        accountNameFilters: accountNameFilters,
      };
    case TOGGLE_TRANSACTION_TYPE_FILTER:
      const transactionTypeFilters = state.transactionTypeFilters.includes(
        action.payload,
      )
        ? removeFromArray(state.transactionTypeFilters, action.payload)
        : [...state.transactionTypeFilters, action.payload];
      return {
        ...state,
        transactionTypeFilters: transactionTypeFilters,
      };
    default:
      return state;
  }
};

function removeFromArray(array, element) {
  return array.filter((e) => e !== element);
}

export const selectFilteredTransactions = (
  state,
  accountNameFilters,
  transactionTypeFilters,
) => {
  const accountNameFilteredTransactions =
    !Array.isArray(accountNameFilters) || !accountNameFilters.length
      ? state
      : state &&
        state.reduce((acc, transaction, index) => {
          // Gotta do these separately
          // gotta match allll filters
          if (accountNameFilters.includes(transaction.accountName)) {
            acc.push(transaction);
          }
          return acc;
        }, []);

  return !Array.isArray(transactionTypeFilters) ||
    !transactionTypeFilters.length
    ? accountNameFilteredTransactions
    : accountNameFilteredTransactions.reduce((acc, transaction, index) => {
        if (transactionTypeFilters.includes(transaction.transactionType)) {
          acc.push(transaction);
        }
        return acc;
      }, []);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
}

export function fetchData() {
  return (dispatch) => {
    dispatch(fetchDataBegin());
    return fetch('/data')
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchDataSuccess(json));

        const filterNames = json.transactions.reduce(
          (accumulator, item, index) => {
            if (!accumulator.accountName.includes(item.accountName)) {
              accumulator.accountName.push(item.accountName);
            }
            if (!accumulator.transactionType.includes(item.transactionType)) {
              accumulator.transactionType.push(item.transactionType);
            }
            return accumulator;
          },
          { accountName: [], transactionType: [] },
        );
        dispatch(setFilterNames(filterNames));
        return json;
      })
      .catch((error) => dispatch(fetchDataFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_DATA_BEGIN = 'FETCH_DATA_BEGIN';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const SET_FILTER_NAMES = 'SET_FILTER_NAMES';

export const TOGGLE_ACCOUNT_NAME_FILTER = 'TOGGLE_ACCOUNT_NAME_FILTER';
export const TOGGLE_TRANSACTION_TYPE_FILTER = 'TOGGLE_TRANSACTION_TYPE_FILTER';

export const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: { error },
});

const setFilterNames = (data) => ({
  type: SET_FILTER_NAMES,
  payload: data,
});

export const toggleAccountNameFilter = (filter) => ({
  type: TOGGLE_ACCOUNT_NAME_FILTER,
  payload: filter,
});
export const toggleTransactionTypeFilter = (filter) => ({
  type: TOGGLE_TRANSACTION_TYPE_FILTER,
  payload: filter,
});
