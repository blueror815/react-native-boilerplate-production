import {Navigation} from 'react-native-navigation';
import * as Config from '../config';

import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import SideMenu from './SideMenu';
import ModalScreen from './ModalScreen';
import NotificationScreen from './NotificationScreen';
import LightBoxScreen from './LightBoxScreen';

export const Screens = {
  FirstScreen: `${Config.Namespace}.FirstScreen`,
  SecondScreen: `${Config.Namespace}.SecondScreen`,
  ModalScreen: `${Config.Namespace}.ModalScreen`,
  NotificationScreen: `${Config.Namespace}.NotificationScreen`,
  SideMenu: `${Config.Namespace}.SideMenu`,
  LightBoxScreen: `${Config.Namespace}.LightBoxScreen`
};

export function registerScreens() {
  Navigation.registerComponent(Screens.FirstScreen, () => FirstScreen);
  Navigation.registerComponent(Screens.SecondScreen, () => SecondScreen);
  Navigation.registerComponent(Screens.ModalScreen, () => ModalScreen);
  Navigation.registerComponent(Screens.NotificationScreen, () => NotificationScreen);
  Navigation.registerComponent(Screens.SideMenu, () => SideMenu);
  Navigation.registerComponent(Screens.LightBoxScreen, () => LightBoxScreen);
}
