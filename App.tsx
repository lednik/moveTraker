import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {StartView} from './src/components/pages/StartView';
import {WalkingView} from './src/components/pages/WalkingView';
import {RoutesView} from './src/components/pages/RoutesView';
import {RouteView} from './src/components/pages/RouteView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={StartView} />
        <Stack.Screen name="WalkingView" component={WalkingView} />
        <Stack.Screen name="RoutesView" component={RoutesView} />
        <Stack.Screen name="RouteView" component={RouteView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
