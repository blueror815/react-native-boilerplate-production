import {AsyncStorage} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducers from './redux/reducers';
import clientMiddleware from './redux/middlewares/ApiClientMiddleware';
import ApiClient from './helpers/ApiClient';

export default function createStoreWithMiddlewares() {
  const client = new ApiClient();
  const middleware = [clientMiddleware(client)];

  // use Command + Ctrl + Arrow Up to open remote redux dev tools
  const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)), autoRehydrate());
  persistStore(store, {
    storage: AsyncStorage,
    whitelist: ['counter'] // add reducer name that will sync automatically with async storage
  });
  return store;
}
