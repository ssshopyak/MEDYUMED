import React from 'react';
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import { AuthStackProps } from './types';
import { Login } from '../screens/Login/Login';
import { RegistrationName } from '../screens/RegistrationName/RegistrationName';
import { Onboard } from '../screens/Onboard';

const AuthorizationStackNavigator = createStackNavigator<AuthStackProps>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
};

export function AuthorizationStack() {
  return (
    <AuthorizationStackNavigator.Navigator screenOptions={screenOptions}>
      <AuthorizationStackNavigator.Screen
        component={Onboard}
        name='onboard'
      />
      <AuthorizationStackNavigator.Screen
        component={Login}
        name='login'
      />
      <AuthorizationStackNavigator.Screen
        component={RegistrationName}
        name='registration_name'
      />
    </AuthorizationStackNavigator.Navigator>
  );
}
