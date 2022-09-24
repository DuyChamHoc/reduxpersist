import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../Component/Constant/Color';
import Login from '../Screen/Auth/Login';
import Register from '../Screen/Auth/Register';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: COLORS.button },
                gestureEnabled: true,
                backgroundColor: COLORS.button,
                gestureDirection: 'horizontal',
            }}
            initialRouteName="Login" headerMode="none">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}