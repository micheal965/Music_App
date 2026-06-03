import { Paths } from './paths';
import SettingsScreen from '@/screens/Settings/SettingsScreen';
import LikeScreen from '@/screens/Like/LikeScreen';
import PlayerScreen from '@/screens/Player/PlayerScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '@/screens/Home/HomeScreen';

type TabParamList = {
  [Paths.Home]: undefined;
  [Paths.Like]: undefined;
  [Paths.Player]: undefined;
  [Paths.Settings]: undefined;
  [Paths.Example]: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabNavigation = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.frost,
        tabBarInactiveTintColor: colors.sky,
        tabBarStyle: {
          backgroundColor: colors.midnight,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name={Paths.Home}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Paths.Like}
        component={LikeScreen}
        options={{
          tabBarLabel: 'Likes',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={Paths.Player}
        component={PlayerScreen}
        options={{
          tabBarLabel: 'Player',
          tabBarIcon: ({ color, size }) => (
            <Icon name="play-circle" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={Paths.Settings}
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
