import React, { useState } from 'react';
import {
    StatusBar,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../Component/Constant/Color';
import uuid from 'react-native-uuid';
import SimpleToast from 'react-native-simple-toast';
import database from '@react-native-firebase/database';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');
export default function Register({ navigation }) {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [about, setabout] = useState('');
    const registerUser = async () => {
        if (name == '' || email == '' || pass == '' || about == '') {
            SimpleToast.show('Fill in all the fields!');
            return false;
        }
        let data = {
            id: uuid.v4(),
            name: name,
            emailId: email,
            password: pass,
            about: about,
            img: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
        };

        database()
            .ref('/users/' + data.id)
            .set(data)
            .then(() => {
                SimpleToast.show('Register Successfully!');
                setname("");
                setemail("");
                setpass("");
                setabout("");
                navigation.navigate("Login");
            });
    };
    return (
        <View>
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
            <View >
                <KeyboardAwareScrollView
                    style={{ marginTop: 20 }}
                    showsVerticalScrollIndicator={false}>
                    <Card
                        style={{
                            backgroundColor: '#fff',
                            width: width - 30,
                            borderRadius: 15,
                        }}>
                        <Text style={styles.Login}>Register</Text>
                        <Text style={styles.smallTxt}>
                            In order to Register your account please fill out all fields
                        </Text>
                        <View style={[styles.inputContainer, { marginTop: 10 }]}>
                            <View style={styles.inputIconView}>
                                <Icon1
                                    name="people"
                                    style={{
                                        color: '#fff',
                                        fontSize: 18,
                                        textAlign: 'center',
                                    }}
                                />
                            </View>
                            <TextInput
                                autoCapitalize="none"
                                style={styles.inputs}
                                placeholder="Enter Full Name"
                                underlineColorAndroid="transparent"
                                onChangeText={value => setname(value)}
                                value={name}
                                placeholderTextColor={COLORS.liteBlack}
                            />
                        </View>
                        <View style={styles.inputContainer}>
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
                                autoCapitalize="none"
                                style={styles.inputs}
                                placeholder="Enter Email Id"
                                underlineColorAndroid="transparent"
                                onChangeText={value => setemail(value)}
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
                                autoCapitalize="none"
                                style={styles.inputs}
                                placeholder="Enter Password"
                                underlineColorAndroid="transparent"
                                onChangeText={value => setpass(value)}
                                value={pass}
                                secureTextEntry={true}
                                placeholderTextColor={COLORS.liteBlack}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.inputIconView}>
                                <Icon2
                                    name="info"
                                    style={{
                                        color: '#fff',
                                        fontSize: 18,
                                        textAlign: 'center',
                                    }}
                                />
                            </View>
                            <TextInput
                                autoCapitalize="none"
                                style={styles.inputs}
                                placeholder="Enter About"
                                underlineColorAndroid="transparent"
                                onChangeText={value => setabout(value)}
                                value={about}
                                placeholderTextColor={COLORS.liteBlack}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={registerUser}
                        >
                            <Text style={styles.btnText}>Register Now</Text>
                        </TouchableOpacity>

                        <View style={styles.contactView}>
                            <Text style={styles.smallTxt}>Existing user?</Text>
                            <TouchableOpacity
                                style={{ marginLeft: 4 }}
                                onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.register}>Login Now</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </KeyboardAwareScrollView>
            </View>
        </View >
    )
}
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
        height: 48,
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
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
        marginTop: 2,
    },
    btn: {
        marginTop: 20,
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