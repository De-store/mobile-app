import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { allReducers } from "./reducers/index";

const initialState = {};

const middleWare = [thunk];

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;;
export const store = createStore(
  allReducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare)), /* preloadedState, */
  +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {});
