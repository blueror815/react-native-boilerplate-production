import {createStore, applyMiddleware} from 'redux';
import reducers from 'app/redux/reducers';
import clientMiddleware from 'app/redux/middlewares/ApiClientMiddleware';
import ApiClient from 'app/utils/ApiClient';

export default function createStoreWithMiddlewares() {
  const client = new ApiClient();
  const middleware = [clientMiddleware(client)];

  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(reducers);
}
