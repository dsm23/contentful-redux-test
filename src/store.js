import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import logger from "redux-logger";

import rootReducer from "./reducers";

import * as actionCreators from "./actions/actionCreators";

const middleware = [...getDefaultMiddleware(), logger];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production"
});

export const mapStateToProps = state => state;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export function connectComponent(component) {
  return connect(mapStateToProps, mapDispatchToProps)(component);
}
