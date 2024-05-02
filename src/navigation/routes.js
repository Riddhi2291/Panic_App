import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp, {routeName as signUpRouteName} from '../containers/SignUp';
import OTP, {routeName as otpRouteName} from '../containers/OTP';

const Stack = createNativeStackNavigator();

export function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={signUpRouteName} component={SignUp} />
        <Stack.Screen name={otpRouteName} component={OTP} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
