import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeProps } from '../types';
import { SCREEN_OPTIONS } from '../navigationUtils';
import { Visits } from '../../screens/Visits/Visits';
import { Bonuses } from '../../screens/Bonuses/Bonuses';
import { Main } from '../../screens/Main/Main';

const HomeStackNavigator = createStackNavigator<HomeProps>();

export function HomeStack() {
  return (
    <HomeStackNavigator.Navigator
      screenOptions={SCREEN_OPTIONS}
    >
      <HomeStackNavigator.Screen
        component={Main}
        name='main'
      />
      <HomeStackNavigator.Screen
        component={Visits}
        name='visits'
      />
      <HomeStackNavigator.Screen
        component={Bonuses}
        name='bonuses'
      />
    </HomeStackNavigator.Navigator>
  );
}
