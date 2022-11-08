import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { RecoilRoot } from 'recoil';
import { LogBox } from 'react-native';

import useCachedResources from 'src/hooks/useCachedResources';
import useColorScheme from 'src/hooks/useColorScheme';
import Navigation from 'src/navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  LogBox.ignoreLogs([
    "EventEmitter.removeListener('appStateDidChange', ...): Method has been deprecated.",
  ]);

  const theme = extendTheme({
    config: {
      initialColorMode: 'light',
    },
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <RecoilRoot>
          <NativeBaseProvider theme={theme}>
            <Navigation />
            <StatusBar />
          </NativeBaseProvider>
        </RecoilRoot>
      </SafeAreaProvider>
    );
  }
}
