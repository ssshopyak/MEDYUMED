import React from 'react';
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import { BottomTabBarOptions, BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackProps } from '../types';
import { Branches } from '../../screens/Branches/Branches';
import TabBar from '../../components/TabBar';
import { StyleGuide } from '../../resources/StyleGuide';
import { ProfileStack } from '../ProfileStack/ProfileStack';
import { Service } from '../../screens/Service/Service';
import { SelectMaster } from '../../screens/SelectMaster/SelectMaster';
import { NewFeedback } from '../../screens/NewFeedback/NewFeedback';
import { SelectDataTime } from '../../screens/SelectDataTime/SelectDataTime';
import { SelectServices } from '../../screens/SelectService/SelectService';
import { MasterClass } from '../../screens/Master/Master';
import { Confirmation } from '../../screens/Confirmation/Confirmation';
import { Sale } from '../../screens/Sale/Sale';
import { EntryStack } from '../EntryStack/EntryStack';
import { HomeStack } from '../HomeStack/HomeStack';
import { PopularServices } from '../../screens/PopularServices/PopularServices';

const MainStackNavigator = createStackNavigator<MainStackProps>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
};

function TabBarComponent(props: BottomTabBarProps<BottomTabBarOptions>) {
  return <TabBar {...props} />;
}

const tabBarListeners = ({ navigation, route }) => ({
  tabPress: () => navigation.navigate(route.name),
});

export function MainStack() {
  const Tab = createBottomTabNavigator();

  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBar={TabBarComponent}
      tabBarOptions={{ activeTintColor: StyleGuide.palette.pink, inactiveTintColor: StyleGuide.palette.gray }}
    >
      <Tab.Screen
        component={HomeStack}
        listeners={tabBarListeners}
        name='homeStack'
      />
      <Tab.Screen
        component={ProfileStack}
        listeners={tabBarListeners}
        name='profileStack'
      />
      <Tab.Screen
        component={EntryStack}
        listeners={tabBarListeners}
        name='entryStack'
      />
      <Tab.Screen
        component={Branches}
        name='branches'
      />
    </Tab.Navigator>
  );

  return (
    <MainStackNavigator.Navigator
      screenOptions={screenOptions}
    >
      <MainStackNavigator.Screen
        component={TabNavigator}
        name='tab'
        options={{ animationEnabled: false }}
      />
      <MainStackNavigator.Screen
        component={Service}
        name='service'
      />
      <MainStackNavigator.Screen
        component={SelectMaster}
        name='selectMaster'
      />
      <MainStackNavigator.Screen
        component={NewFeedback}
        name='newFeedback'
      />
      <MainStackNavigator.Screen
        component={SelectDataTime}
        name='selectData'
      />
      <MainStackNavigator.Screen
        component={SelectServices}
        name='selectService'
      />
      <MainStackNavigator.Screen
        component={MasterClass}
        name='master'
      />
      <MainStackNavigator.Screen
        component={Confirmation}
        name='confirmation'
      />
      <MainStackNavigator.Screen
        component={Sale}
        name='sale'
      />
      <MainStackNavigator.Screen
        component={PopularServices}
        name='popularServices'
      />
    </MainStackNavigator.Navigator>
  );
}
