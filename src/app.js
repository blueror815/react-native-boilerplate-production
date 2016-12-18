
import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import {registerScreens, Screens} from 'app/screens';
import createStore from 'app/store';

const store = createStore();
registerScreens(store, Provider);

const tabs = [
  {
    label: 'Modal',
    screen: Screens.FirstScreen,
    icon: require('app/assets/images/one.png'),
    title: 'Screen One'
  },
  {
    label: 'Redux',
    screen: Screens.SecondScreen,
    icon: require('app/assets/images/two.png'),
    title: 'Screen Two'
  },
  {
    label: 'Form',
    screen: Screens.FormScreen,
    icon: require('app/assets/images/three.png'),
    title: 'Screen Two'
  }
];

Navigation.startTabBasedApp({
  tabs,
  appStyle: {
    tabBarBackgroundColor: '#0f2362',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#63d7cc'
  },
});
