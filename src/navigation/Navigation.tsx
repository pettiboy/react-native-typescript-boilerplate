import React from 'react';
import {COLORS} from '../constants';
import {AllOrdersRightHeader, CustomTextHeader} from './Headers';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AuthStackParamList} from './types';

import {Login as LoginScreen, Otp as OTPScreen} from '../screens/auth';
import {Home as HomeScreen} from '../screens/home';

const AuthenticationStack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <NavigationContainer>
      <AuthenticationStack.Navigator screenOptions={{header: () => null}}>
        <AuthenticationStack.Screen name="Login" component={LoginScreen} />
        <AuthenticationStack.Screen name="Otp" component={OTPScreen} />
      </AuthenticationStack.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = createStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: props => <CustomTextHeader title={'Home'} {...props} />,
          headerBackTitleVisible: false,
          headerTintColor: COLORS.PRIMARY,
        }}
      />
    </HomeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const MainStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.GREY,
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
          headerShown: false,
        }}>
        <Tab.Screen
          name="HomeTab"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="list-alt" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
