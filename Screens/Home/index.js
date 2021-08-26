import React, { Component } from 'react'
import {
    Image,
    Dimensions, Keyboard,
    StyleSheet,
    Text,
    SafeAreaView, Item, Icon, Button, Input, TextInput,
    View, PanResponder,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { Content, Tab, Tabs, Container } from 'native-base';

// import { SearchBar } from 'react-native-elements';

import { connect } from 'react-redux'

import Header from '../../Components/header'
import AppContainer from '../../Components/AppContainer'
import Footer from '../../Components/footer'
import ProfileDrawer from '../../Components/profileDrawer'
import FilterDrawer from '../../Components/filterDrawer'
import CloseDrawer from '../../Components/closeDrawer'
import { identifier } from '@babel/types';
const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
class Home extends Component {
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
            // animationStyle: "",

        }
        _panResponder = {};

    }


    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                console.log("move", gestureState.dx)

                // return !(gestureState.dx === 0 && gestureState.dy === 0)
                if (gestureState.dx > 45 && !this.state.isFilter) {
                    console.log("slide close", gestureState.dx)
                    this.setState({
                        isDrawer: true
                    })
                }
                else if (gestureState.dx < -45 && !this.state.isDrawer) {
                    console.log("slide close", gestureState.dx)
                    this.setState({
                        isFilter: true
                    })
                }

            },
            onPanResponderRelease: (evt, gestureState) => {
            },

        });

    }
    animateParent(fals) {
        setTimeout(() => {
            this.setState({
                isDrawer: false, isFilter: false
            })
        }, 250);
    }
    render() {
        let { isFilter, isDrawer, darkBody } = this.state
        let logo = require('../../Assets/OOAAlogo.jpg')
        var { height, width } = Dimensions.get('window');
        return (
            <AppContainer navigation={this.props.navigation}>
             
            </AppContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
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
)(Home)
