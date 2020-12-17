import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  Image,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SpeechComponent from '../screens/Speech';
import DetailComponent from '../screens/DetailScreen';
import NewsComponent from '../screens/TabScreen'
const Tab = createBottomTabNavigator();

export default function Navigation() {
  console.log('enter here navigation');
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Speech') {
              return < Image
                style={{ width: 40, height: 40, marginTop: 5 }}
                focused={focused}
                source={require("../../images/microphone.png")}
              />
            } else if (route.name === 'Map') {
              return <Image
                style={{ width: 40, height: 40, marginTop: 5 }}
                focused={focused}
                source={require("../../images/map.png")}
              />
            }else if (route.name === 'News') {
              return <Image
                style={{ width: 40, height: 40, marginTop: 5 }}
                focused={focused}
                source={require("../../images/map.png")}
              />
          }
          },
        })}>
        <Tab.Screen name="Speech" component={SpeechComponent} options={{ headerShown: false }} />
        <Tab.Screen name="Map" component={DetailComponent} options={{ headerShown: false }} />
        <Tab.Screen name="News" component={NewsComponent} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
