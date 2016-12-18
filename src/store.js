import {createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
import reducers from '~/reducers';

export default function createStoreWithMiddlewares() {
  return createStore(reducers);
}
