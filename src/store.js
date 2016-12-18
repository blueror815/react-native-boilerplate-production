import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducers from 'app/redux/reducers';
import clientMiddleware from 'app/redux/middlewares/ApiClientMiddleware';
import ApiClient from 'app/utils/ApiClient';

export default function createStoreWithMiddlewares() {
  const client = new ApiClient();
  const middleware = [clientMiddleware(client)];

  // use Command + Ctrl + Arrow Up to open remote redux dev tools
  return createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));
}
