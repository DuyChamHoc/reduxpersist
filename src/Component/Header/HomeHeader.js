import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useSelector } from 'react-redux'
import { COLORS } from '../Constant/Color'
import { FONTS } from '../Constant/Font'

const HomeHeader = () => {
    const { userData } = useSelector(state => state.User);
    return (
        <View style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            padding: 10, paddingHorizontal: 15, backgroundColor: COLORS.white, elevation: 2, paddingVertical: 15
        }}>
            <Text style={styles.logo}>APP CHAT</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Avatar
                    source={{ uri: userData.img }}
                    rounded
                    size='medium' />
            </View>
        </View>
    )
}

export default HomeHeader;

const styles = StyleSheet.create({
    logo: {
        fontWeight: 'bold',
        fontFamily: FONTS.Bold,
        color: COLORS.theme,
        fontSize: 35,
    },
})
