/**
 * @format
 */
import React from "react"
import {AppRegistry} from 'react-native';
import App from './test03';
import {name as appName} from './app.json';
import theme from './template/bule';
import { NativeBaseProvider  } from 'native-base';
import { LogBox } from 'react-native';

const AppProvider = () => (
      <NativeBaseProvider theme={theme}>
            <App/>
      </NativeBaseProvider>
  );
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
AppRegistry.registerComponent(appName, () => AppProvider);
