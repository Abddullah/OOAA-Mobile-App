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
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import EIcon from 'react-native-vector-icons/MaterialCommunityIcons'
const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            // email: '',
            // password: '',
            // showPassword: false,
            // showError: false,
            // language: 'english'.
            isDrawer: false,
            isFilter: false,
            searchWidth: "85%",
            focus: false,
            blur: false,
            // animationStyle: "",
        }
    }
    onFocus() {
        this.setState({
            focus: true, blur: false
        })
        this.props.darkBody()
    }

    onBlur() {
        this.setState({
            focus: false, blur: true,
        })
        this.props.darkBody()

    }

    render() {
        const fadeIn = {
            from: {
                width: "85%",
            },
            to: {
                width: "95%",
            },
        };
        const fadeOut = {
            from: {
                width: "95%",
            },
            to: {
                width: "85%",
            },
        };
        return (
            <Animatable.View
                animation={this.state.focus ? fadeIn : this.state.blur ? fadeOut : null}
                style={{ borderColor: "#fff", borderRadius: 50, borderWidth: 0.5, height: 40, width: this.state.searchWidth, justifyContent: "center", alignItems: "center", flexDirection: "row", padding: 15 }}>
                <TouchableOpacity style={{ flex: 2 }}>
                    <FontAwesome name='search' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />

                </TouchableOpacity>
                <View style={{ flex: 8, }}>
                    <TextInput
                        placeholder="Type here..."
                        placeholderTextColor="#fff"
                        style={{ height: 40, color: "white" }}
                        onBlur={() => this.onBlur()}
                        onFocus={() => this.onFocus()}
                    // onChangeText={text => onChangeText(text)}
                    // value={value}
                    />
                </View>
                {/* <View style={{ flex: 1 }}>
                <Entypo name='cross' style={{ color: "#ffff", fontWeight: "bold", fontSize: 23, }} />
            </View> */}
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {}
})

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar)
