import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';
import StackNavigation from './StackNavigation';

function ApplicationNavigator() {
  const { navigationTheme } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
