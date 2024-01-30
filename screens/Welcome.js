import {
  Text,
  StatusBar
} from 'react-native';
import {
  UserCog,
  CarTaxiFront,
  CalendarRange,
  CalendarCheck
} from "lucide-react-native";
import { Box, Icon } from '@gluestack-ui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Book from './Book';
import Trips from './Trips';
import Profile from './Profile';
import Dummy from '../components/Dummy';

const Tab = createBottomTabNavigator();

export default function Welcome({ navigation }) {
  const renderIcon = (icon) => {
    return <Icon as={icon} size="xl"/>
  }

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Trips" component={Trips} options={{
        tabBarIcon: () => renderIcon(CalendarRange)
      }}/>
      <Tab.Screen name="Book Now" component={Book} options={{
        tabBarIcon: () => renderIcon(CarTaxiFront)
      }}/>
      <Tab.Screen name="Scheduled Book" component={Dummy} options={{
        tabBarIcon: () => renderIcon(CalendarCheck)
      }}/>
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: () => renderIcon(UserCog)
      }}/>
    </Tab.Navigator>
  )
}
