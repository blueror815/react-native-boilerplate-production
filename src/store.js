import {createStore} from 'redux';
import reducers from 'app/redux/reducers';

export default function createStoreWithMiddlewares() {
  return createStore(reducers);
}
