import * as React from 'react';
import { Image, I18nManager, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, FONTS } from "../Constants"; 
import { CommonImages } from '../Constants/images'
import { t } from '../Shared/Lib/Localize'

import HomeScreen from '../Screens/Home/HomeScreen'
import CartScreen from '../Screens/Cart/CartScreen'
import CategoryScreen from '../Screens/Category/CategoryScreen'
import SubCategoryScreen from '../Screens/Category/SubCategoryScreen'
import ProfileScreen from '../Screens/Profile/ProfileScreen'
import DetailsScreen from '../Screens/Details/DetailsScreen'
import ProductListingScreen from '../Screens/Products/ProductListingScreen'

const HomeStack = createStackNavigator();

const headerBackImage = () => {
  return (
    <Image
      style={{height: 17, marginLeft: 10}}
      source={ I18nManager.isRTL ? CommonImages.ArrowRight : CommonImages.ArrowLeft }
    />
  );
};

const headerTitleImage = () => {
  return (
    <Image
      style={{height: 30, width: 120, resizeMode: 'contain'}}
      source={CommonImages.Logo}
    />
  );
};

const headerOptions = {
  headerTitleAlign: 'center',
  headerBackImage,
  headerBackTitle: t('Back'),
  headerShown: true
};

const screenOptions = {
  headerTintColor: COLORS.secondary,
  headerTitleStyle: {
      ...FONTS.navigationTitle
  }
};

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{...headerOptions, headerTitle: () => headerTitleImage()}}/>
      <HomeStack.Screen name="Details" component={DetailsScreen} options={{...headerOptions}} />
      <HomeStack.Screen name="ProductListing" component={ProductListingScreen} options={{...headerOptions, title: t('Products')}}/>
    </HomeStack.Navigator>
  );
}

const CartStack = createStackNavigator();

export function CartStackScreen() {
  return (
    <CartStack.Navigator screenOptions={screenOptions}>
      <CartStack.Screen name="Cart" component={CartScreen} options={{...headerOptions, title: t('tab_cart')}}/>
    </CartStack.Navigator>
  );
}

const CategoryStack = createStackNavigator();

export function CategoryStackScreen() {
  return (
    <CategoryStack.Navigator screenOptions={screenOptions}>
      <CategoryStack.Screen name="Category" component={CategoryScreen} options={{...headerOptions, title: t('CATEGORY')}}/>
      <CategoryStack.Screen name="SubCategoryScreen" component={SubCategoryScreen} options={{...headerOptions, title: t('CATEGORY')}}/>
      <CategoryStack.Screen name="Details" component={DetailsScreen} options={{...headerOptions}} />
      <CategoryStack.Screen name="ProductListing" component={ProductListingScreen} options={{...headerOptions, title: t('Products')}}/>
    </CategoryStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

export function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{...headerOptions, title: t('tab_profile')}}/>
    </ProfileStack.Navigator>
  );
}