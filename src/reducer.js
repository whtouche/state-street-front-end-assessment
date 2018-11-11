import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

export const reducer = (
  state = {
    transactions: [],
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
    default:
      return state;
  }
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
        console.log('jason is on: ', json);
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
