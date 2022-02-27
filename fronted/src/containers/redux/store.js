import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

let composeEnhancer = compose;

if (process.env.NODE_ENV !== "production" && typeof window === "object") {
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
export default store;
