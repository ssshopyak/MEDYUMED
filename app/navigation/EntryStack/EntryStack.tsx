import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EntryProps } from '../types';
import { SCREEN_OPTIONS } from '../navigationUtils';
import { Entry } from '../../screens/Entry/Entry';
import { EndConfirmation } from '../../screens/EndConfirmation/EndConfirmation';

const EntryStackNavigator = createStackNavigator<EntryProps>();

export function EntryStack() {
  return (
    <EntryStackNavigator.Navigator
      screenOptions={SCREEN_OPTIONS}
    >
      <EntryStackNavigator.Screen
        component={Entry}
        name='event'
      />
      <EntryStackNavigator.Screen
        component={EndConfirmation}
        name='endConfirmation'
      />
    </EntryStackNavigator.Navigator>
  );
}
