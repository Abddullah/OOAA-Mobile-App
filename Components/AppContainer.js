import React, { Component } from 'react'
import {
    Image,
    Dimensions, Keyboard,
    StyleSheet,
    Text,
    SafeAreaView, Item, Button, Input, TextInput,
    View, PanResponder,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { Container, Content, Footer, FooterTab, Tab, Tabs, TabHeading, Icon, ScrollableTab } from 'native-base';

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

import { connect } from 'react-redux'

import Header from '../Components/header'
import FootersTabs from '../Components/footer'
import ProfileDrawer from '../Components/profileDrawer'
import FilterDrawer from '../Components/filterDrawer'
import CloseDrawer from '../Components/closeDrawer'
import { identifier } from '@babel/types';

// tab1
import Pin from '../Screens/Pin';
// tab2
import Search from '../Screens/Search/index';
// tab3
import Gift from '../Screens/Gift/index';
// tab4
import Basket from '../Screens/basket/index';

//icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import footer from '../Components/footer';

class AppContainer extends Component {
    constructor() {
        super()
        this.state = {
            isDrawer: false,
            isFilter: false,
            darkBody: false,
            iconColor: ""
        }
        _panResponder = {};
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                // console.log("move", gestureState.dx)
                // return !(gestureState.dx === 0 && gestureState.dy === 0)
                if (gestureState.dx > 45 && !this.state.isFilter) {
                    console.log("slide close", gestureState.dx)
                    // this.setState({
                    //     isDrawer: true
                    // })
                }
                else if (gestureState.dx < -45 && !this.state.isDrawer) {
                    console.log("slide close", gestureState.dx)
                    // this.setState({
                    //     isFilter: true
                    // })
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


    activeColor(key) {
        console.log(key.ref.key)
        if (key.ref.key == ".0") {
            this.setState({
                iconColor: "pin"
            })
        }
        if (key.ref.key == ".1") {
            this.setState({
                iconColor: "search"
            })
        }
        if (key.ref.key == ".2") {
            this.setState({
                iconColor: "gift"
            })
        }
        if (key.ref.key == ".3") {
            this.setState({
                iconColor: "basket"
            })
        }

    }
    componentWillUnmount() {

    }

    render() {
        let { isFilter, isDrawer, darkBody, iconColor } = this.state
        let { FooterHave, title } = this.props
        console.log(this.props.themeColor, "this")
        var { height, width } = Dimensions.get('window');
        return (
            <View
                {...this._panResponder.panHandlers}
                style={{ flex: 1, backgroundColor: "#fff" }}>
                {((isDrawer) && <CloseDrawer func={() => this.setState({ isDrawer: !isDrawer })} />)}
                {(isDrawer && <ProfileDrawer animationStyle="fadeInLeftBig" animateParent={this.animateParent.bind(this)} navigation={this.props.navigation} />)}
                {(isFilter && <FilterDrawer animationStyle="fadeInRightBig" animateParent={this.animateParent.bind(this)} navigation={this.props.navigation} />)}
                {((isFilter) && <CloseDrawer func={() => this.setState({ isFilter: !isFilter })} right={isFilter} />)}
                {/* Header */}
                <View style={{}}>
                    <Header
                        darkBody={() => { this.setState({ darkBody: !darkBody }) }}
                        func2={() => { this.setState({ isFilter: !isFilter }) }}
                        func={() => { this.setState({ isDrawer: !isDrawer }) }}
                        title={title && title}
                    />
                </View>

                {/* body*/}
                {/* <View style={{ flex: 8, opacity: darkBody ? 0.2 : 1, }}>
                    {this.props.children ? this.props.children : null}
                </View > */}

                {/* ffffffffffooooter */}
                {/* <View style={{ flex: 8, opacity: darkBody ? 0.2 : 1, }}>
                    <FootersTabs navigate={this.props.navigation} routeUI={this.props.route} />
                </View> */}

                <View style={{ flex: 8, opacity: darkBody ? 0.2 : 1, }}>
                    <View style={{
                        flex: 1,
                        height: 55,
                        backgroundColor: this.props.themeColors.backGroundColor,
                    }}>
                        <Tabs onChangeTab={(key) => this.activeColor(key)}
                            tabBarPosition="bottom" locked={true}
                            tabBarUnderlineStyle={{ backgroundColor: this.props.themeColors.backGroundColor }}
                        >
                            {/* //Pin// */}
                            <Tab
                                heading={
                                    <TabHeading
                                        style={{ flexDirection: "column", backgroundColor: this.props.themeColors.backGroundColor }}
                                    >
                                        <AntDesign name="pushpin" style={{ color: this.state.iconColor === "pin" ? "#003366" : '#909090', fontWeight: 'bold', fontSize: 20 }} />
                                    </TabHeading>}
                            >
                                {this.props.children && iconColor === "" ? this.props.children :
                                    <Pin
                                        navigate={this.props.navigation}
                                    />
                                }
                            </Tab>

                            {/* //Search// */}
                            <Tab
                                heading={
                                    <TabHeading
                                        style={{ flexDirection: "column", backgroundColor: this.props.themeColors.backGroundColor }}
                                    >
                                        <FontAwesome name="search" style={{ color: this.state.iconColor === "search" ? "#003366" : '#909090', fontWeight: 'bold', fontSize: 20 }} />
                                    </TabHeading>
                                }
                            >

                                {this.props.children && iconColor === "" ? this.props.children :
                                    <Search
                                        navigate={this.props.navigation}
                                    />
                                }

                            </Tab>

                            {/* //Gift// */}
                            <Tab
                                heading={
                                    <TabHeading
                                        style={{ flexDirection: "column", backgroundColor: this.props.themeColors.backGroundColor }}
                                    >
                                        <AntDesign name="gift" style={{ color: this.state.iconColor === "gift" ? "#003366" : '#909090', fontWeight: 'bold', fontSize: 20 }} />
                                    </TabHeading>
                                }
                            >
                                {this.props.children && iconColor === "" ? this.props.children :
                                    <Gift navigate={this.props.navigation} />
                                }
                            </Tab>

                            {/* //Basket// */}
                            <Tab
                                heading={
                                    <TabHeading
                                        style={{ flexDirection: "column", backgroundColor: this.props.themeColors.backGroundColor }}
                                    >
                                        <MaterialIcons name='shopping-cart' style={{ color: this.state.iconColor === "basket" ? "#003366" : '#909090', fontWeight: 'bold', fontSize: 20 }} />
                                    </TabHeading>
                                }
                            >
                                {this.props.children && iconColor === "" ? this.props.children :
                                    <Basket navigation={this.props.navigation} />
                                }
                            </Tab>

                        </Tabs>
                    </View>
                </View>
            </View>
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
    return {

        themeColor: state.root.themeColor,
        themeColors: state.root.themeColors,

    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer)
