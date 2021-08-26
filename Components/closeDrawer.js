import React, { Component } from 'react';
import {
    Image,
    Dimensions, Keyboard,
    StyleSheet,
    Text,
    SafeAreaView, Container, Header, Item, Icon, Button, Input, TextInput,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import EIcon from 'react-native-vector-icons/MaterialCommunityIcons'
// import { SearchBar } from 'react-native-elements';
const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
export default CloseProfile = (props, func) => {
    console.log(func, "func", props)
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                props.func()
            }}
            style={{ position: "absolute", height: screenHeight, width: "100%", right: props.right ? null : 0, zIndex: 1, backgroundColor: "black", opacity: 0.8 }}>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

})