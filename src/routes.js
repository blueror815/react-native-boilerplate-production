import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import {Provider} from 'react-redux';
import MainScreen from 'app/screens/MainScreen';
import createStoreWithMiddlewares from 'app/store';

const store = createStoreWithMiddlewares();
export default class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="main" component={MainScreen} title="Main" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
