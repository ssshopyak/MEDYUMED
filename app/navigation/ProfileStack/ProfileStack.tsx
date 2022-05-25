import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileProps } from '../types';
import { SCREEN_OPTIONS } from '../navigationUtils';
import { Profile } from '../../screens/Profile/Profile';
import { PersonalData } from '../../screens/PersonalData/PersonalData';
import { Discount } from '../../screens/Discount/Discount';

const ProfileStackNavigator = createStackNavigator<ProfileProps>();

export function ProfileStack() {
  return (
    <ProfileStackNavigator.Navigator
      screenOptions={SCREEN_OPTIONS}
    >
      <ProfileStackNavigator.Screen
        component={Profile}
        name='profile'
      />
      <ProfileStackNavigator.Screen
        component={PersonalData}
        name='personalInfo'
      />
      <ProfileStackNavigator.Screen
        component={Discount}
        name='discount'
      />
    </ProfileStackNavigator.Navigator>
  );
}
