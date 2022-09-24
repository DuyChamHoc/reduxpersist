import moment from 'moment';
import  Icon  from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../Constant/Color';

const TimeDelivery = (props) => {
    const { sender, item } = props;
    return (
        <View
            style={[styles.mainView, {
                justifyContent: 'flex-end',
            }]}
        >
            <Text style={{
                fontFamily: 'Poppins-Regular', 
                fontSize: 7,
                color: sender ? COLORS.white : COLORS.black
            }}>
                {moment(item.send_time).format('LLL')}
            </Text>
                <Icon
                    name = {"checkmark-done"}
                    type = "Ionicons"
                    style={{color: item.seen ? COLORS.black : COLORS.white , fontSize: 15, marginLeft: 5}}
                />

        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2
    }
});

export default TimeDelivery;