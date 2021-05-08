import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import { TabIcons } from '../Constants/images'
import { COLORS } from "../Constants"; 
import { t } from '../Shared/Lib/Localize'

import { HomeStackScreen, CategoryStackScreen, CartStackScreen, ProfileStackScreen } from './Stacks'

const Tab = createBottomTabNavigator();

const tabBar = (focused, tabOff, tabOn, color) => (
  <View>
    {focused ? (
      <Image source={tabOff} />
    ) : (
      <Image source={tabOn} />
    )}
  </View>
);

export default function Tabbar() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={ ({ route }) => ({
            tabBarIcon: ( { focused, color, size } ) => {
              let onIcon;
              let offIcon;
              if (route.name === 'Home') {
                onIcon = TabIcons.HomeOn;
                offIcon = TabIcons.HomeOff;
              } else if (route.name === 'Category') {
                onIcon = TabIcons.CategoryOn;
                offIcon = TabIcons.CategoryOff;
              } else if (route.name === 'Cart') {
                onIcon = TabIcons.CartOn;
                offIcon = TabIcons.CartOff;
              } else if (route.name === 'Profile') {
                onIcon = TabIcons.AccountOn;
                offIcon = TabIcons.AccountOff;
              }
              return tabBar(focused, onIcon, offIcon, color);
            },
          })}
          tabBarOptions={{
            activeTintColor: COLORS.primary,
            inactiveTintColor: COLORS.lightGray,
          }}
          > 
          <Tab.Screen name="Home" component={HomeStackScreen} options={{title: t('tab_home')}} />
          <Tab.Screen name="Category" component={CategoryStackScreen} options={{title: t('tab_category')}} />
          <Tab.Screen name="Cart" component={CartStackScreen} options={{title: t('tab_cart')}} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} options={{title: t('tab_profile')}} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }