import React from 'react';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/insfrastructure/theme';
import { useFonts as useOswald, Lato_400Regular } from '@expo-google-fonts/lato';
import { useFonts as useLato, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { Navigation } from './src/insfrastructure/navigation';
import { LoginScreen } from './src/features/screens/login.screens';
import { AuthContextProvider } from './src/services/auth/auth.context';
import { ProductContextProvider } from './src/services/products/product.context';
import { ClockInOutContextProvider } from './src/services/clock/clock.context';


export default function App() {
  const [latoLoaded] = useOswald({
    Lato_400Regular,
  });
  const [oswaldLoaded] = useLato({
    Oswald_400Regular,
  });

  if (!latoLoaded || !oswaldLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme} >
        <AuthContextProvider>
          <ProductContextProvider>
            <ClockInOutContextProvider>
              <Navigation />
              <ExpoStatusBar style="auto" />
            </ClockInOutContextProvider>
          </ProductContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}
