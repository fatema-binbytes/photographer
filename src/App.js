import React from "react";
import { StackNavigator, DrawerNavigator ,TabNavigator,createMaterialTopTabNavigator} from "react-navigation";
import { Root } from "native-base";
import Login from "./screens/Login/";
import ForgotPassword from "./screens/ForgotPassword";
import SignUp from "./screens/SignUp/";
import Walkthrough from "./screens/Walkthrough/";
import Comments from "./screens/Comments/";
import Channel from "./screens/Channel";
import Story from "./screens/Story";

import Sidebar from "./screens/Sidebar";

import Profile from "./screens/Profile/";

import Explore from './screens/Explore'
import ProfileTabs from './screens/Photographer/ProfileTabs'
import Friend from './screens/Settings/inviteFriends'
import Contact from './screens/Settings/contactUs'
import Terms from './screens/Settings/termServices'
import Payment from './screens/Settings/payment'
import ZoomImage from './screens/ZoomImage/zoomImage'

const TabNavigation = TabNavigator({
  Friend:{
    screen:Friend
  },
  Contact:{
    screen:Contact
  },
  Terms:{
    screen:Terms
  },
  Payment :{
    screen:Payment
  }
},{
  lazy:true,
  
  tabBarOptions:{
    scrollEnabled:true,
  style: {
    backgroundColor: '#01cca1',
   
  },
  tabStyle: {
    width:95
  },
  
  
  // labelStyle: {
  //     fontSize: 13,
  //     },
    }
})

const Drawer = DrawerNavigator(
  {
   Explore:{screen:Explore},
    Profile: { screen: Profile },
    ProfileTabs :{screen:ProfileTabs},
    Settings: { screen: TabNavigation }
  },
  {
  initialRouteName:'Explore',
    contentComponent: props => <Sidebar {...props} />
  }
);

const App = StackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    ForgotPassword: { screen: ForgotPassword },
    Walkthrough: { screen: Walkthrough },
    Story: { screen: Story },
    Comments: { screen: Comments },
    Channel: { screen: Channel },
    Drawer: { screen: Drawer },
    ZoomImage:{screen:ZoomImage}
  },
  {
    index: 0,
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <App />
  </Root>;
