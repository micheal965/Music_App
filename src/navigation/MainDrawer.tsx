import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigation from './BottomTabNavigation';
import SettingsScreen from '@/screens/Settings/SettingsScreen';
import { Paths } from './paths';
import LikeScreen from '@/screens/Like/LikeScreen';
import { useTheme } from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
import { useEffect } from 'react';
import { useI18n } from '@/hooks';

type DrawerParamList = {
  [Paths.MainTabs]: undefined;
  [Paths.Profile]: undefined;
  [Paths.Like]: undefined;
  [Paths.Settings]: undefined;
  Language: undefined;
  Theme: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function ThemeActionScreen() {
  const { changeTheme, variant } = useTheme();
  const navigation = useNavigation();
  
  useEffect(() => {
    changeTheme(variant == 'default' ? 'dark' : 'default');
    navigation.goBack();
  }, []);

  return null;
}
function LanguageActionScreen() {
  const { toggleLanguage } = useI18n();
  const navigation = useNavigation();

  useEffect(() => {
    toggleLanguage();
    navigation.goBack();
  }, []);

  return null;
}

const MainDrawer = () => {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

        drawerInactiveTintColor: colors.frost,
        drawerActiveTintColor: colors.sky,
        drawerStyle: {
          backgroundColor: colors.midnight,
        },
        drawerItemStyle: {
          marginVertical: 3,
          borderRadius: 10,
          padding: 0,
        },
        drawerLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
        drawerType: 'slide',
      }}
    >
      {/* Hidden Tabs */}
      <Drawer.Screen
        name={Paths.MainTabs}
        component={BottomTabNavigation}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={Paths.Profile}
        component={ProfileScreen}
        options={{
          title: 'Profile',
          drawerIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Likes */}
      <Drawer.Screen
        name={Paths.Like}
        component={LikeScreen}
        options={{
          title: 'Liked Songs',
          drawerIcon: ({ color, size }) => (
            <Icon name="heart-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Language */}
      <Drawer.Screen
        name="Language"
        component={LanguageActionScreen}
        options={{
          title: 'Language',
          drawerIcon: ({ color, size }) => (
            <Icon name="globe-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Contact Us */}
      {/* <Drawer.Screen
        name={Paths.Player}
        component={PlayerScreen}
        options={{
          title: 'Player',
          drawerIcon: ({ color, size }) => (
            <Icon name="play-circle-outline" size={size} color={color} />
          ),
        }}
      /> */}

      {/* FAQs */}
      {/* <Drawer.Screen
        name={Paths.Player}
        component={PlayerScreen}
        options={{
          title: 'Player',
          drawerIcon: ({ color, size }) => (
            <Icon name="play-circle-outline" size={size} color={color} />
          ),
        }}
      /> */}

      {/* Theme */}
      <Drawer.Screen
        name="Theme"
        component={ThemeActionScreen}
        options={{
          title: 'Theme',
          drawerIcon: ({ color, size }) => (
            <Icon name="moon-outline" size={size} color={color} />
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
