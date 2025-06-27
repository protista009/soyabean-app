import { AppRegistry } from 'react-native';
import App from './app/index'; // this is your NavigationContainer-rooted app
import appJson from './app.json';
const appName = appJson.expo.name;
import { createRoot } from 'react-dom/client';

// Register the app
AppRegistry.registerComponent(appName, () => App);

// Render it on web
const rootTag = document.getElementById('root') || document.getElementById('main');
AppRegistry.runApplication(appName, {
  rootTag,
});
