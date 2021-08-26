
import React, { Component } from 'react';
import {
    View, StyleSheet, TouchableOpacity, Text, Alert, ActivityIndicator
} from 'react-native';
import { Switch, Radio } from 'native-base';
import { connect } from "react-redux";
import { userSaveInStore } from '../store/action/action';
import { addressSaveToStore } from '../../client/store/action//action';
import AppContainer from '../../client/Components/AppContainer'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';

class AddressList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoader: false
        }
    }

    componentWillMount() {
        console.log(this.props.userAddress, "USER_ADDRESS_LIST")
        this.setState({
            userAddress: this.props.userAddress,
        })
    }

    componentWillReceiveProps(nextProp) {
        console.log(nextProp.userAddress, "USER_ADDRESS")
        this.setState({
            userAddress: nextProp.userAddress,
        })
    }
    //active address
    activeAddress(key, index) {
        let AllAddress = this.state.userAddress
        for (var i = 0; i < AllAddress.length; i++) {
            AllAddress[i].active = false
        }
        AllAddress[index].active = true
        this.setState({
            userAddress: AllAddress
        })
    }
    //add address
    addAddress = () => {
        if (this.state.userAddress.length < 10) {
            this.props.navigation.push('UpdateAddress')
        }
        else {
            Alert.alert("Limit each user to 10 addresses.")
        }
    }
    //address eidt routing
    _goto(object) {
        this.props.navigation.push('UpdateAddress', { edit: true, dataforedit: object })
    }

    deleteAddress = (key, index) => {
        this.setState({
            isLoader: !this.state.isLoader,
            loadIndex: index
        })

        let deleteKey = key._id
        let urlm = `${this.props.mainUrl}profile/deleteAddress/${deleteKey}`;
        axios({
            method: 'DELETE',
            url: urlm,
            headers: {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
        })
            .then(data => {
                console.log(data.data.message, "DELETE_ADDRESS")
                let AllAddress = this.state.userAddress
                AllAddress.splice(index, 1)

                this.setState({
                    isLoader: !this.state.isLoader,
                })

                this.props.addressSaveToStore(AllAddress)
            })
            .catch(err => {
                this.setState({
                    isLoader: !this.state.isLoader,
                })
                let error = err.response.data.error.message
                Alert.alert(error)
                console.log(error, "ERROR_ON_DELETE_ADDRESS")
            })
    }


    render() {
        let { isLoader, userAddress, loadIndex } = this.state
        let { themeColors, darkmode } = this.props
        return (
            <AppContainer navigation={this.props.navigation} title={"Address List"}>
                <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: themeColors.backGroundColor }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, width: "90%", }}>
                        {
                            (this.props.userAddress && this.props.userAddress.length != 0) ? (
                                this.props.userAddress.map((key, index) => {
                                    return (
                                        <View style={{ backgroundColor: darkmode === false ? "#F1F1F1" : themeColors.externalShade, margin: 7, width: "100%" }}>
                                            <TouchableOpacity style={{ flex: 1, width: "100%", justifyContent: "space-around", }} key={index}
                                                onPress={() => { this.activeAddress(key, index) }}
                                                onLongPress={() => this._goto(key)}
                                                style={{ flex: 1, flexDirection: "row", margin: 10 }}>
                                                <View style={{ flex: 1, flexDirection: "row" }}>
                                                    <Radio color={darkmode === false ? "#000000" : themeColors.forGroundColor} selected={key.active} style={{ marginLeft: 10 }} />
                                                    <Text style={{ marginLeft: 10, color: darkmode === false ? "#000000" : themeColors.forGroundColor }}>{key.flatNumber ? key.flatNumber : null + " " + key.streetNumber ? key.streetNumber : null + " " + key.townCity ? key.townCity : null + " " + key.Country ? key.Country : null}</Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => { this.deleteAddress(key, index) }}
                                                    style={{ flex: 0.2, justifyContent: "center", alignItems: "center", }}>
                                                    {
                                                        (isLoader === true && index === loadIndex) ? (
                                                            <ActivityIndicator style={{ color: "blue" }} />
                                                        )
                                                            :
                                                            <AntDesign name='delete' style={{ color: "red", fontWeight: "bold", fontSize: 25, }} />
                                                    }

                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            ) : null
                        }

                    </ScrollView>
                    {
                        (this.props.userAddress.length == 0) ? (
                            <View style={{ marginBottom: "30%", alignItems: "center" }}>
                                <Text style={{ fontSize: 12, color: "#3F4341", textAlign: "center" }}>To add your address{"\n"} please click the button down there</Text>
                                <Animatable.View
                                    duration={2000}
                                    animation="bounceIn" iterationCount={1000}
                                >
                                    <Entypo name="arrow-long-down" style={{ fontWeight: 'bold', fontSize: 28, color: "#3F4341" }} />

                                </Animatable.View>
                            </View>
                        ) : null
                    }
                    <View style={{ alignItems: "center", marginBottom: "2%" }}>
                        <TouchableOpacity
                            onPress={() => this.addAddress()}
                            activeOpacity={0.8} style={{ backgroundColor: "#003366", width: 60, height: 60, borderRadius: 60, justifyContent: "center", alignItems: "center" }}>
                            <AntDesign name="plus" style={{ color: "#fff", fontSize: 22 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </AppContainer >
        );
    }
}


let mapStateToProps = state => {
    return {
        mainUrl: state.root.mainUrl,
        user: state.root.user,
        themeColors: state.root.themeColors,
        darkmode: state.root.darkmode,
        userAddress: state.root.userAddress,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        addressSaveToStore: (data) => {
            dispatch(addressSaveToStore(data));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressList);


const styles = StyleSheet.create({

});  
