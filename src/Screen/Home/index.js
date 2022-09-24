
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { COLORS } from '../../Component/Constant/Color';
import { FONTS } from '../../Component/Constant/Font';
import HomeHeader from '../../Component/Header/HomeHeader';
import Navigation from '../../Service/Navigation';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../Redux/reducer/user';
import Auth from '../../Service/Auth';

const Home = (props) => {

  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.User);

  const [chatList, setchatList] = useState([]);

  useEffect(() => {
    getChatlist();
  }, []);
  const getChatlist = async () => {
    database()
      .ref('/chatlist/' + userData?.id)
      .on('value', snapshot => {
        if (snapshot.val() != null) {
          setchatList(Object.values(snapshot.val()))
        }
      });
  }
  const logout =()=>{
    dispatch(removeUser());
    // Auth.logout();
  }
  const renderItem = ({ item }) => (
    <ListItem
      containerStyle={{ paddingVertical: 8, marginVertical: 0,borderRadius:5,borderWidth:1,borderColor:COLORS.theme}} 
      onPress={() => Navigation.navigate('SingleChat', { receiverData: item })}>
      <Avatar
        source={{ uri: item.img }}
        rounded
        size="medium" />
      <ListItem.Content>
        <ListItem.Title style={{ fontFamily: FONTS.Medium, fontSize: 14 }}>
          {item.name}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{ fontFamily: FONTS.Regular, fontSize: 12 }} numberOfLines={1}>
          {item.lastMsg}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <HomeHeader />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={chatList}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.but1}
        onPress={() => logout()}>
        <Icon1
          name="logout"
          style={{ color: COLORS.white, fontSize: 20 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.but}
        onPress={() => Navigation.navigate('AllUser')}>
        <Icon
          name="users"
          type="FontAwesome5"
          style={{ color: COLORS.white, fontSize: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  but: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.theme,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  but1: {
    marginLeft:30,
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.theme,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});