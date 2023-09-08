import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../components/style.js';
const {primary,tertiary} = Colors;
import Login from '../screens/Login.js';
import Signup from '../screens/Signup.js'
import Welcome from '../screens/Welcome.js';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle:{
                        paddingLeft: 20
                    }
                }}
                initialRouteName='Login'
            >
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Signup' component={Signup}/>
                <Stack.Screen name='Welcome' component={Welcome}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;
