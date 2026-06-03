import React from 'react';
import { Paths } from '@/navigation/paths';
import { Startup } from '@/screens';
import { RootStackParamList } from './types';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@/theme';
import MainDrawer from './MainDrawer';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  const { variant } = useTheme();
  return (
    <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Startup} name={Paths.Startup} />
      <Stack.Screen component={MainDrawer} name={Paths.MainDrawer} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
