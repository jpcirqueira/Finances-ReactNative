import React from 'react';
import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';

import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import { AppRoutes } from './src/routes/app.routes'; 
import theme from './src/global/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading />
  }
  
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes/>
      </NavigationContainer>
    </ThemeProvider>
  );
}

