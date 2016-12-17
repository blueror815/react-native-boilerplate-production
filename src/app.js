import {
  Platform
} from 'react-native';
import {Navigation} from 'react-native-navigation';

// screen related book keeping
import {registerScreens} from './screens';
registerScreens();

const createTabs = () => {
  let tabs = [
    {
      label: 'One',
      screen: 'example.FirstTabScreen',
      icon: require('../assets/images/one.png'),
      selectedIcon: require('../assets/images/one_selected.png'),
      title: 'Screen One'
    },
    {
      label: 'Two',
      screen: 'example.SecondTabScreen',
      icon: require('../assets/images/two.png'),
      selectedIcon: require('../assets/images/two_selected.png'),
      title: 'Screen Two',
      navigatorStyle: {
        tabBarBackgroundColor: '#4dbce9',
      }
    }
  ];
  if (Platform.OS === 'android') {
    tabs.push({
      label: 'Collapsing',
      screen: 'example.CollapsingTopBarScreen',
      icon: require('../assets/images/one.png'),
      title: 'Collapsing',
    });
  }
  return tabs;
};
// this will start our app
Navigation.startTabBasedApp({
  tabs: createTabs(),
  appStyle: {
    tabBarBackgroundColor: '#0f2362',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#63d7cc'
  },
  drawer: {
    left: {
      screen: 'example.SideMenu'
    }
  }
});
//Navigation.startSingleScreenApp({
//  screen: {
//    screen: 'example.FirstTabScreen',
//    title: 'Navigation',
//    navigatorStyle: {
//      navBarBackgroundColor: '#4dbce9',
//      navBarTextColor: '#ffff00',
//      navBarSubtitleTextColor: '#ff0000',
//      navBarButtonColor: '#ffffff',
//      statusBarTextColorScheme: 'light'
//    }
//  },
//  drawer: {
//    left: {
//      screen: 'example.SideMenu'
//    }
//  }
//});
