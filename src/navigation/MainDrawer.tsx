import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigation from './BottomTabNavigation';
import SettingsScreen from '@/screens/Settings/SettingsScreen';
import { Paths } from './paths';
import HomeScreen from '@/screens/Home/HomeScreen';
import LikeScreen from '@/screens/Like/LikeScreen';
import PlayerScreen from '@/screens/Player/PlayerScreen';
import { useTheme } from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';

type DrawerParamList = {
  [Paths.MainTabs]: undefined;
  [Paths.Home]: undefined;
  [Paths.Like]: undefined;
  [Paths.Player]: undefined;
  [Paths.Settings]: undefined;
  [Paths.Example]: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const MainDrawer = () => {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

        drawerActiveTintColor: colors.frost,
        drawerInactiveTintColor: colors.frost,

        drawerStyle: {
          backgroundColor: colors.midnight,
        },

        drawerLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
      }}
    >
      {/* Hidden Tabs */}
      <Drawer.Screen
        name={Paths.Home}
        component={BottomTabNavigation}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Likes */}
      <Drawer.Screen
        name={Paths.Like}
        component={LikeScreen}
        options={{
          title: 'Likes',
          drawerIcon: ({ color, size }) => (
            <Icon name="heart-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Player */}
      <Drawer.Screen
        name={Paths.Player}
        component={PlayerScreen}
        options={{
          title: 'Player',
          drawerIcon: ({ color, size }) => (
            <Icon name="play-circle-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Settings */}
      <Drawer.Screen
        name={Paths.Settings}
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Icon name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default MainDrawer;
