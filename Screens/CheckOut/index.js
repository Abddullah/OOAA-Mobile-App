import React, { Component } from 'react'
import {
    Image,
    Dimensions, Keyboard,
    StyleSheet,
    Text,
    View, PanResponder,
    TouchableOpacity, Picker,
    ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import Details from '../../Components/Details'
import OutlineButton from '../../Components/outlineButton'
import AppContainer from '../../Components/AppContainer'
import CloseDrawer from '../../Components/closeDrawer'
import ProfileDrawer from '../../Components/profileDrawer'
import FilterDrawer from '../../Components/filterDrawer'
class Checkout extends Component {
    constructor() {
        super()
        this.state = {
            quantity: 1,
            isDrawer: false,
            isFilter: false,
        }
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
            <>
                {((isDrawer) && <CloseDrawer func={() => this.setState({ isDrawer: !isDrawer })} />)}
                {(isDrawer && <ProfileDrawer animationStyle="fadeInLeftBig" animateParent={this.animateParent.bind(this)} navigation={this.props.navigation} />)}
                {(isFilter && <FilterDrawer animationStyle="fadeInRightBig" animateParent={this.animateParent.bind(this)} navigation={this.props.navigation} />)}
                {((isFilter) && <CloseDrawer func={() => this.setState({ isFilter: !isFilter })} right={isFilter} />)}
                <View style={{}}>
                    <Header
                        darkBody={() => { this.setState({ darkBody: !darkBody }) }}
                        func2={() => { this.setState({ isFilter: !isFilter }) }}
                        func={() => { this.setState({ isDrawer: !isDrawer }) }}
                    />
                </View>

                <ScrollView
                    style={{ backgroundColor: this.props.themeColors.backGroundColor }}>
                    <View style={{ justifyContent: 'center', alignItems: "center" }}>
                        <View style={{ flexDirection: 'row', width: '100%', flex: 1, }}>
                            <View style={{ flex: 9 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity style={[styles.buttonView, { backgroundColor: this.state.selectedButton1 ? '#444846' : "#fff" }]} onPress={() => this.setState({ selectedButton1: true, selectedButton2: false })}>
                                        <Text style={[styles.btnText, { color: this.state.selectedButton1 ? "#fff" : "black" }]}> Deliver </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 17, color: "#9b9b9b" }}> Or </Text>
                            </View>
                            <View style={{ flex: 9 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity style={[styles.buttonView, { backgroundColor: this.state.selectedButton2 ? '#444846' : "#fff" }]} onPress={() => this.setState({ selectedButton1: false, selectedButton2: true })}>
                                        <Text style={[styles.btnText, { color: this.state.selectedButton2 ? "#fff" : "black" }]}> Collect </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/* <View style={{ borderColor: "black", borderWidth: 0.3, height: 1, width: "100%", opacity: 0.1 }}>
                        </View>
                        <View>
                        </View> */}
                    </View>

                    <View style={{ margin: 10 }}>
                        <Details />
                    </View>

                    <View style={{ width: "70%", alignItems: "center", flexDirection: "row", marginHorizontal: "5%" }}>
                        <OutlineButton />
                        <View>
                            <Picker
                                selectedValue={this.state.language}
                                style={{ height: 50, width: 100 }}
                            // onValueChange={(itemValue, itemIndex) =>
                            //     this.setState({ language: itemValue })
                            // }
                            >
                                <Picker.Item color={this.props.themeColors.forGroundColor} label="new" value="new" />
                                <Picker.Item color={this.props.themeColors.forGroundColor} label="edit" value="edit" />
                                <Picker.Item color={this.props.themeColors.forGroundColor} label="remove" value="remove" />
                            </Picker>
                        </View>
                    </View>
                    {/* <View style={{ justifyContent: "space-between", padding: 15 }}>
                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <TouchableOpacity style={{ backgroundColor: "red", borderRadius: 2, width: 50, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 10, color: "#fff" }}>remove</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: "#F0DE0A", borderRadius: 2, width: 50, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 10, color: "#fff" }}>edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: "#7ED321", borderRadius: 2, width: 50, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 10, color: "#fff" }}>new</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                </ScrollView >
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    buttonView: {
        height: 45,
        width: '60%',
        // backgroundColor: '#444846',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#141414',
        borderWidth: .3,
        marginVertical: 6,
        borderRadius: 5
    },
    btnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
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
        themeColors: state.root.themeColors,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout)
