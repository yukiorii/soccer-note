import React, { Suspense } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { RecoilRoot } from 'recoil';
import { LogBox } from 'react-native';

import useCachedResources from 'src/hooks/useCachedResources';
import useColorScheme from 'src/hooks/useColorScheme';
import Navigation from 'src/navigation';
import Loading from 'src/components/Loading';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  LogBox.ignoreAllLogs()
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
        <NativeBaseProvider theme={theme}>
          <Suspense fallback={<Loading />}>
            <RecoilRoot>
              <Navigation />
              <StatusBar />
            </RecoilRoot>
          </Suspense>
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}
