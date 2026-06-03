import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';
import RootStackNavigation from './RootStackNavigation';

function ApplicationNavigator() {
  const { navigationTheme } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <RootStackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
