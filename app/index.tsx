import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import PredictScreen from './PredictScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Image
                source={require('../assets/images/icon.png')
}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 10,
                  borderRadius: 20,
                }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Predict Disease" component={PredictScreen} />
      </Stack.Navigator>
    
  );
}
