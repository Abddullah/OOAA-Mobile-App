import React, { Component } from 'react'
import {
    Image,
    Dimensions, Keyboard,
    StyleSheet,
    Text,
    SafeAreaView, Header, Item, Icon, Button, Input, TextInput,
    View, PanResponder,
    TouchableOpacity,
    ScrollView,
    Slider
} from 'react-native';
import { navigation } from 'react-navigation';
import { Content, Tab, Tabs, Container, List, ListItem, Body, Right, Switch, Picker } from 'native-base';

// import { SearchBar } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Entypo from 'react-native-vector-icons/Entypo';
// import CustomInput from '../../Components/Input'
// import CustomButton from '../../Components/Button'
// import CustomPicker from '../../Components/PickerComp'
// import SearchBar from '../../Components/searchBar'
// import FilterDrawer from '../../Components/FilterDrawer'
// import CloseDrawer from '../../Components/closeDrawer'
import { identifier } from '@babel/types';
const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
class FilterDrawer extends Component {
    constructor() {
        super()
        this.state = {
            // email: '',
            // password: '',
            // showPassword: false,
            // showError: false,
            // language: 'english'.
            isDrawer: false,
            selected2: 'High to Low',
            displayShops: false,
            ecoPriority: false,
            yardSales: true,
            broker: false,
            shopSize: 'Local',
            weight: 'High to Low',
            broke: false,
            // animationStyle: "",

        }
        _panResponder = {};

    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                // console.log("move", gestureState.dx)

                // return !(gestureState.dx === 0 && gestureState.dy === 0)
                // if (gestureState.dx > 45) {
                if (gestureState.dx > 45) {
                    console.log("slide close", gestureState.dx)
                    this.setState({
                        animationStyle: "fadeOutRightBig"
                        // animationStyle: 'fadeOutLeftBig',

                    })
                    this.props.animateParent(false)
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
            },
        });
        this.setState({
            animationStyle: this.props.animationStyle,
        })
    }
    onSortionChange() {
        alert("Clicked...!");
    }
    render() {
        let { email, password, showPassword, showError, isDrawer } = this.state
        // let logo = require('../../Assets/OOAAlogo.jpg')
        var { height, width } = Dimensions.get('window');
        return (
            <Animatable.View
                {...this._panResponder.panHandlers}
                animation={this.state.animationStyle}
                duration={300}
                style={{
                    borderRightWidth: 1,
                    borderRightRadius: 2,
                    // borderRightColor: '#ddd',
                    borderBottomWidth: 0,
                    shadowColor: '#000',
                    // shadowOffset: { width: 0, height: 2 },
                    // shadowOpacity: 0.8,
                    // shadowRadius: 2,
                    // elevation: 55,
                    flex: 1, width: "80%", height: "100%", position: "absolute", zIndex: 2, right: 0
                }}

            // style={{
            //     borderRightWidth: 1,
            //     borderRightRadius: 2,
            //     borderRightColor: '#ddd',
            //     borderBottomWidth: 0,
            //     shadowColor: '#000',
            //     // shadowOffset: { width: 0, height: 2 },
            //     // shadowOpacity: 0.8,
            //     // shadowRadius: 2,
            //     // elevation: 55,
            //     flex: 1,
            //     width: '80%',
            //     height: '100%',
            //     position: 'absolute',
            //     zIndex: 2,
            // }}

            >
                <ScrollView style={{
                    flex: 1,
                    // backgroundColor: "#C0C7C4",
                    backgroundColor: this.props.themeColors.backGroundColor

                }}>
                    <List>
                        <ListItem>
                            <Body>
                                <Text style={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Price</Text>
                            </Body>
                            <Picker
                                mode="dropdown"
                                style={{ width: 50 }}
                                placeholder="Filter"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.sortion}
                                onValueChange={this.onSortionChange.bind(this)}
                            >
                                <Picker.Item color={this.props.themeColors.forGroundColor} label="Hight to Low" value="key0" />
                                <Picker.Item color={this.props.themeColors.forGroundColor} label="Low to High" value="key1" />
                                <Picker.Item color={this.props.themeColors.forGroundColor} label="Low to High" value="key1" />
                            </Picker>
                        </ListItem>

                        <ListItem>
                            <Body>
                                <Text style={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Price Range</Text>
                            </Body>
                            <Slider minimumValue={0} maximumValue={100} step={1} thumbTintColor='#444846' style={{ width: 100 }} />

                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text style={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Only dispaly shops which are open</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.displayShops} onValueChange={() => this.setState({ displayShops: !this.state.displayShops })} />
                            </Right>

                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text style={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Eco Priority</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.ecoPriority} onValueChange={() => this.setState({ ecoPriority: !this.state.ecoPriority })} />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text style={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Yard Sales</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.yardSales} onValueChange={() => this.setState({ yardSales: !this.state.yardSales })} />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text style={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Shop Size</Text>
                            </Body>
                            <Picker
                                mode="dropdown"
                                style={{ width: 50 }}
                                placeholder="Filter"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.shopSize}
                                onValueChange={this.onSortionChange.bind(this)}
                            >
                                <Picker.Item color={this.props.themeColors.forGroundColor} label="Local" value="key0" />
                                <Picker.Item color={this.props.themeColors.forGroundColor} label="Local & International" value="key1" />
                                <Picker.Item color={this.props.themeColors.forGroundColor} label="International" value="key2" />
                            </Picker>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text style={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Weight</Text>
                            </Body>
                            <Picker
                                mode="dropdown"
                                style={{ width: 50 }}
                                placeholder="Filter"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.weight}
                                onValueChange={this.onSortionChange.bind(this)}
                            >
                                <Picker.Item color={this.props.themeColors.forGroundColor} label="Hight to Low" value="key0" />
                                <Picker.Item color={this.props.themeColors.forGroundColor} label="Low to High" value="key1" />
                            </Picker>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text style={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Weight Range</Text>
                            </Body>
                            <Slider minimumValue={0} maximumValue={100} step={1} thumbTintColor='#444846' style={{ width: 100 }} />

                        </ListItem>
                        {/* <ListItem>
                            <Body>
                                <Text>I'm Broker</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.broker} onValueChange={() => this.setState({ broker: !this.state.broker })} />
                            </Right>
                        </ListItem> */}

                        <ListItem>
                            <Body>
                                <Text style={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>I'm broke</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.broke} onValueChange={() => this.setState({ broke: !this.state.broke })} />
                            </Right>
                        </ListItem>
                        {/* <ListItem>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("DietryRequirements")}>
                                <Text style={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Dietry Requirements</Text>
                            </TouchableOpacity>
                        </ListItem> */}
                    </List>
                </ScrollView>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {}
})

function mapStateToProps(state) {
    return {
        darkmode: state.root.darkmode,
        themeColors: state.root.themeColors,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterDrawer)
