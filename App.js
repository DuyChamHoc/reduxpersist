import React, { useEffect, useState } from 'react';
import AppStack from './src/Navigation/AppStack';
import AuthStack from './src/Navigation/AuthStack';
import { COLORS } from './src/Component/Constant/Color';
import Navigation from './src/Service/Navigation';
import Auth from './src/Service/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './src/Redux/reducer/user';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
const Stack = createNativeStackNavigator();

export default function App() {

  const dispatch = useDispatch();

  const { userData, login } = useSelector(state => state.User);

  const [loginChk, setloginChk] = useState(true);


  // useEffect(() => {
  //   getUser();
  // }, []);

  // const getUser = async () => {
  //   let data = await Auth.getAccount();
  //   if (data != null) {
  //     dispatch(setUser(data));
  //     setloginChk(false)
  //   } else {
  //     setloginChk(false)
  //   }
  // }

  // if (loginChk) {
  //   return null;
  // }

  return (
    <NavigationContainer ref={r => Navigation.setTopLevelNavigator(r)}>
      <Stack.Navigator
        headerMode="none"
        detachInactiveScreens={false}
        initialRouteName="Auth"
        screenOptions={{
          cardStyle: { backgroundColor: COLORS.white },
          gestureEnabled: true,
          backgroundColor: COLORS.button,
          gestureDirection: 'horizontal',
        }}>
        {!login ?
          <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} /> :
          <Stack.Screen name="AppStack" component={AppStack} options={{ headerShown: false }} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
