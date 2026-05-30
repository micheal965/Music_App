import React from 'react';
import { Paths } from '@/navigation/paths';
import { Example, Startup } from '@/screens';
import HomeScreen from '@/screens/Home/HomeScreen';
import LikeScreen from '@/screens/Like/LikeScreen';
import PlayerScreen from '@/screens/Player/PlayerScreen';
import { RootStackParamList } from './types';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@/theme';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  const { variant } = useTheme();
  return (
    <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Startup} name={Paths.Startup} />
      <Stack.Screen component={HomeScreen} name={Paths.Home} />
      <Stack.Screen component={LikeScreen} name={Paths.Like} />
      <Stack.Screen component={PlayerScreen} name={Paths.Player} />
      <Stack.Screen component={Example} name={Paths.Example} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
