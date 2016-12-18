import {createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
import reducers from 'app/reducers';

export default function createStoreWithMiddlewares() {
  return createStore(reducers);
}
