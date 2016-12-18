import {Navigation} from 'react-native-navigation';
import * as Config from 'app/config';

import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import SideMenu from './SideMenu';
import ModalScreen from './ModalScreen';
import NotificationScreen from './NotificationScreen';
import LightBoxScreen from './LightBoxScreen';
import FormScreen from './FormScreen';
import UploadScreen from './UploadScreen';

export const Screens = {
  FirstScreen: `${Config.Namespace}.FirstScreen`,
  SecondScreen: `${Config.Namespace}.SecondScreen`,
  ModalScreen: `${Config.Namespace}.ModalScreen`,
  NotificationScreen: `${Config.Namespace}.NotificationScreen`,
  SideMenu: `${Config.Namespace}.SideMenu`,
  LightBoxScreen: `${Config.Namespace}.LightBoxScreen`,
  FormScreen: `${Config.Namespace}.FormScreen`,
  UploadScreen: `${Config.Namespace}.UploadScreen`
};

export function registerScreens(store, provider) {
  Navigation.registerComponent(Screens.FirstScreen, () => FirstScreen, store, provider);
  Navigation.registerComponent(Screens.SecondScreen, () => SecondScreen, store, provider);
  Navigation.registerComponent(Screens.ModalScreen, () => ModalScreen, store, provider);
  Navigation.registerComponent(Screens.NotificationScreen, () => NotificationScreen, store, provider);
  Navigation.registerComponent(Screens.SideMenu, () => SideMenu, store, provider);
  Navigation.registerComponent(Screens.LightBoxScreen, () => LightBoxScreen, store, provider);
  Navigation.registerComponent(Screens.FormScreen, () => FormScreen, store, provider);
  Navigation.registerComponent(Screens.UploadScreen, () => UploadScreen, store, provider);
}
