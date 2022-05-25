import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { useInstance } from 'react-ioc';
import { AuthorizationStack } from './AuthStack';
import { useAppSelector } from '../redux/hooks/selectors';
import { MainStack } from './MainStack';
import { Splash } from '../screens/Splash';
import { useMount } from '../lib/hooks';
import { MainController } from '../redux/controllers/MainController';

enableScreens();

export function AppNavigator() {
  const myService = useInstance(MainController);

  useMount(async () => {
    await myService.init();
  });

  const isInitialized = useAppSelector(state => state.app.initialized);
  const token = useAppSelector(state => state.user.token);
  const name = useAppSelector(state => state.user.name);
  const email = useAppSelector(state => state.user.email);
  const phone = useAppSelector(state => state.user.phone);

  if (!isInitialized && !phone) {
    return <Splash />;
  }

  if (token && name && email && phone) {
    return (
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <AuthorizationStack />
    </NavigationContainer>
  );
}
