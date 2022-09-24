import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../Component/Constant/Color';
import database from '@react-native-firebase/database';
import SimpleToast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/reducer/user';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Auth from '../../Service/Auth';

const { width, height } = Dimensions.get('window');

function Login({ navigation }) {

  const dispatch = useDispatch();

  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');

  const loginUser = async () => {
    database()
      .ref('users/')
      .orderByChild("emailId")
      .equalTo(email)
      .once('value')
      .then(async snapshot => {
        if (snapshot.val() == null) {
          SimpleToast.show("Invalid Email Id!");
          return false;
        }
        let userData = Object.values(snapshot.val())[0];
        if (userData?.password != pass) {
          SimpleToast.show("Invalid Password!");
          return false;
        }

        console.log('User data: ', userData);
        dispatch(setUser(userData));
        // await Auth.setAccount(userData);
        SimpleToast.show("Login Successfully!");
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={COLORS.theme}
        barStyle="light-content"
        hidden={false}
      />
      <View style={styles.uppercard}>
        <Image
          style={{ width: 200, height: 100, borderRadius: 35 }}
          source={{ uri: 'https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/86151c2b7127392a75653d418c81b7bb.png' }}
        />
        <Text
          style={{
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          APP CHAT
        </Text>
      </View>
      <View style={{ height: '60%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        <Card
          style={{
            height: '60%', justifyContent: 'center', alignItems: 'center',
            backgroundColor: '#27AE60',
            width: '90%',
            borderRadius: 30,
          }}>
          <View style={styles.cardView}>
            <Text style={styles.Login}>Login</Text>
            <Text style={styles.smallTxt}>
              In order to login your account please enter credentials
            </Text>
            <KeyboardAwareScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>

              <View style={[styles.inputContainer, { marginTop: 30 }]}>
                <View style={styles.inputIconView}>
                  <Icon
                    name="gmail"
                    type="MaterialCommunityIcons"
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      textAlign: 'center',
                    }}
                  />
                </View>
                <TextInput
                  style={styles.inputs}
                  placeholder="Enter Email Id"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onChangeText={value => {
                    setemail(value);
                  }}
                  value={email}
                  placeholderTextColor={COLORS.liteBlack}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputIconView}>
                  <Icon
                    name="key"
                    type="MaterialCommunityIcons"
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      textAlign: 'center',
                    }}
                  />
                </View>
                <TextInput
                  style={styles.inputs}
                  placeholder="Enter Password"
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  onChangeText={value => {
                    setpass(value);
                  }}
                  value={pass}
                  placeholderTextColor={COLORS.liteBlack}
                />
              </View>

            </KeyboardAwareScrollView>

            <TouchableOpacity
              style={styles.btn}
              onPress={loginUser}
            >
              <Text style={styles.btnText}>Login Now</Text>
            </TouchableOpacity>

            <View style={styles.contactView}>
              <Text style={styles.smallTxt}>New user?</Text>
              <TouchableOpacity style={{ marginLeft: 4 }}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.register}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  uppercard: {
    height: height / 4,
    backgroundColor: COLORS.theme,
    borderBottomLeftRadius: height / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: height / 2 - 50,
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 13,
  },
  loginBtn: {
    height: 48,
    width: '95%',
    backgroundColor: COLORS.theme,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  loginText: {
    color: COLORS.lightgray,
    fontSize: 18,
  },
  buttonSec: { marginTop: 20, justifyContent: 'center', alignItems: 'center' },
  logo: {
    height: height / 2 - 50,
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 13,
  },

  inputs: {
    borderBottomColor: COLORS.white,
    flex: 1,
    color: 'black',
    paddingLeft: 10,
  },
  inputContainer: {
    borderRadius: 30,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginBottom: 10,
    elevation: 2,
  },
  inputIconView: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.theme,
    height: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
  },
  smallTxt: {
    fontSize: 15,
    color: COLORS.black,
    marginTop: 10,
    opacity: .5,
    textAlign: 'center',
  },
  register: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 12,
    textAlign: 'center',
    color: COLORS.textInput,
    textDecorationLine: 'underline'
  },
  contactView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
  btn: {
    marginTop: 40,
    backgroundColor: COLORS.theme,
    width: '100%',
    height: 50,
    borderRadius: 30,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Login: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: COLORS.textInput,
    fontSize: 20,
    marginTop: 10,
  },
  cardView: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingBottom: 20,
    paddingTop: 20,
  }
});