import React, { Component } from 'react';
import { DefaultTheme as PaperTheme, Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { navigationRef } from "./RootNavigation";

import { StatusBar } from 'react-native';
import axios from "axios";

import SplashScreen from "./src/screens/splashScreen";
import MainScreen from "./src/screens/mainScreen";
import AppScreen from "./src/screens/appScreen";
import { Provider } from "react-redux";
import { store } from "./src/modules/store";

import { APP_BACKEND } from "./config"

const MyTheme = {
  ...PaperTheme,
  colors: {
    ...PaperTheme.colors,
    background: "white"
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
    background: "white"
  },
};

axios.defaults.baseURL = APP_BACKEND;


// APP - COMPONENT
class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  render() {
    Stack = createStackNavigator();
    return (
      // PROVIDER FOR REDUX STATE
      <Provider store={store}>
        {/* <PaperProvider theme={MyTheme}/> */}
        {/* NAVIGATION CONTAINER - For enabling navigation */}
        <NavigationContainer theme={theme} ref={navigationRef}>
          <StatusBar hidden={true} />
          <Stack.Navigator initialRouteName="Splash" headerMode={"none"}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="App" component={AppScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* <PaperProvider /> */}
      </Provider>
    );
  }
}

export default App;