
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    ScrollView, ActivityIndicator, Alert
} from 'react-native';
import { Item, Input } from 'native-base';
import { connect } from "react-redux";
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Textarea from 'react-native-textarea';
import axios from 'axios';
import { userSaveInStore } from '../store/action/action';
import AppContainer from '../../client/Components/AppContainer'
import { addressSaveToStore } from '../../client/store/action//action';
import { clone } from '@babel/types';

class UpdateAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updateLoader: true,
            edit: false,
            // fullName: "Abdullah",
            // phoneNumber: "03452153709",
            // region: "Pak",
            // postCode: "+92",
            // streetNumber: "north",
            // flatNumber: "AA+106",
            // townCity: "Karachi",
            // Country: "Pakistan",
            // deliveryToInstruction: "Noting else",
            // numberToAccess: "786",
        }
    }

    componentWillMount() {
        let edit = this.props.navigation.getParam('edit')
        let dataforedit = this.props.navigation.getParam('dataforedit')
        if (edit === true) {
            console.log(dataforedit, "dataforedit")
            this.setState({
                edit: true,
                fullName: dataforedit.fullName,
                phoneNumber: dataforedit.phoneNumber,
                region: dataforedit.region,
                postCode: dataforedit.postCode,
                streetNumber: dataforedit.streetNumber,
                flatNumber: dataforedit.flatNumber,
                townCity: dataforedit.townCity,
                Country: dataforedit.Country,
                deliveryToInstruction: dataforedit.deliveryToInstruction,
                numberToAccess: dataforedit.numberToAccess,
                _id: dataforedit._id,
            })
        }
    }


    updateAddress() {
        let { fullName, phoneNumber, region, postCode, streetNumber, flatNumber, townCity, Country, deliveryToInstruction, numberToAccess, edit, _id } = this.state;

        if (fullName || phoneNumber || region || postCode || streetNumber || flatNumber || townCity || Country || deliveryToInstruction || numberToAccess) {
            this.setState({
                updateLoader: !this.state.updateLoader
            })
            let cloneData = {
                fullName,
                phoneNumber,
                region,
                postCode,
                streetNumber,
                flatNumber,
                townCity,
                Country,
                deliveryToInstruction,
                numberToAccess,
                userId: this.props.user._id,
            }
            if (edit === false) {
                urlm = `${this.props.mainUrl}profile/addAddress/`
            }
            else {
                urlm = `${this.props.mainUrl}profile/updateAddress/`
                cloneData._id = _id
            }
            console.log(cloneData, "cloneData")
            var options = {
                method: 'POST',
                url: urlm,
                headers:
                {
                    contentType: 'application/json',
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: cloneData
            };
            axios(options)
                .then((data) => {
                    console.log(data, "cloneData")
                    this.setState({
                        updateLoader: !this.state.updateLoader,
                    })
                    let urlm = `${this.props.mainUrl}profile/getAddress/${this.props.user._id}`;
                    axios({
                        method: 'get',
                        url: urlm,
                        headers: {
                            'cache-control': 'no-cache',
                            "Allow-Cross-Origin": '*',
                        },
                    })
                        .then(data => {
                            console.log(data.data.data, "afterupdate")
                            this.props.addressSaveToStore(data.data.data)
                            this.props.navigation.navigate('AddressList')
                        })
                        .catch(err => {
                            console.log(JSON.stringify(err.response.data.message), "-------err")
                            this.props.navigation.navigate('AddressList')
                        })
                    Alert.alert(data.data.message)
                }).catch((err) => {
                    console.log(err.response, "responseerr")
                    alert(JSON.stringify(err.response.data.message))
                    this.setState({
                        updateLoader: !this.state.updateLoader
                    })
                })
        }
        else {
            this.props.navigation.navigate('AddressList');
        }
    }

    render() {
        let { fullName, phoneNumber, region, postCode, streetNumber, flatNumber, townCity, Country, deliveryToInstruction, numberToAccess, edit } = this.state;
        let { themeColors, darkmode } = this.props
        return (
            <AppContainer navigation={this.props.navigation} title={"Address"}>
                <View style={{ flex: 1, backgroundColor: themeColors.backGroundColor }}>
                    <View style={{ justifyContent: 'center', alignItems: "center", }}>
                        <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                            <ScrollView style={{ width: "90%", marginTop: 15 }} showsVerticalScrollIndicator={false}>
                                {/* full name */}
                                <View style={{ marginTop: 0 }}>
                                    <Item
                                        style={styles.input}>
                                        {/* // style={[styles.input, { this.props.darkmode === true ? this.props.themeColors.forGroundColor : "#000000" }]}> */}
                                        <Input
                                            placeholder={"Full name"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Full name"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={fullName => fullName.length < 51 ? this.setState({ fullName }) : null}
                                            value={fullName}
                                        />
                                        <Entypo name='user' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* phone number */}
                                <View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            keyboardType="numeric"
                                            placeholder={"Phone number"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Phone number"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={phoneNumber => phoneNumber.length < 51 ? this.setState({ phoneNumber }) : null}
                                            value={phoneNumber}
                                        />
                                        <Entypo name='phone' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* region */}
                                <View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            placeholder={"Region"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Region"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={region => region.length < 51 ? this.setState({ region }) : null}
                                            value={region}
                                        />
                                        <Fontisto name='world-o' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* post code */}
                                <View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            placeholder={"Post code"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Post code"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={postCode => postCode.length < 21 ? this.setState({ postCode }) : null}
                                            value={postCode}
                                        />
                                        <Entypo name='newsletter' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* Street,numbere */}
                                <View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            placeholder={"Street, number, P.O. box, c/os"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Street, number, P.O. box, c/os"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={streetNumber => streetNumber.length < 61 ? this.setState({ streetNumber }) : null}
                                            value={streetNumber}
                                        />
                                        <FontAwesome name='road' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* flat,numbere */}
                                <View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            placeholder={"Flat, suit unit, building, floor"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Flat, suit unit, building, floor"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={flatNumber => flatNumber.length < 61 ? this.setState({ flatNumber }) : null}
                                            value={flatNumber}
                                        />
                                        <FontAwesome name='building-o' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* Town City */}
                                <View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            placeholder={"Town/City"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Town/City"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={townCity => townCity.length < 51 ? this.setState({ townCity }) : null}
                                            value={townCity}
                                        />
                                        <FontAwesome5 name='city' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* Country */}
                                <View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            placeholder={"Country"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Country"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={Country => Country.length < 51 ? this.setState({ Country }) : null}
                                            value={Country}
                                        />
                                        <Fontisto name='world' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* Delivery Instructions */}
                                <View style={styles.container}>
                                    <Textarea
                                        containerStyle={[styles.textareaContainer, {
                                            backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : 'rgba(52, 52, 52, .1)',
                                        }]}
                                        style={[styles.textarea, { color: this.props.darkmode === false ? this.props.themeColors.forGroundColor : "#000000" }]}
                                        onChangeText={(deliveryToInstruction) => this.setState({ deliveryToInstruction })}
                                        defaultValue={deliveryToInstruction}
                                        maxLength={255}
                                        placeholder={'Delivery instructions'}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>
                                {/* number to acces building */}
                                <View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            placeholder={"Number to access the building"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Number to access the building"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={numberToAccess => numberToAccess.length < 31 ? this.setState({ numberToAccess }) : null}
                                            value={numberToAccess}
                                        />
                                        <Entypo name='dial-pad' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {
                                    (this.state.updateLoader === true) ? (
                                        <TouchableOpacity style={{ width: "100%", height: 50, marginTop: 20, marginBottom: 20, justifyContent: "center", alignItems: "center", backgroundColor: this.props.themeColor }}
                                            onPress={() => this.updateAddress()}>
                                            {
                                                (
                                                    edit === true
                                                ) ? (
                                                        <Text style={{ color: "white", fontWeight: "bold" }}>Update</Text>
                                                    ) :
                                                    <Text style={{ color: "white", fontWeight: "bold" }}>Add</Text>
                                            }
                                        </TouchableOpacity>
                                    ) : <ActivityIndicator style={{ top: 20, marginBottom: 20, }} />
                                }
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </AppContainer >
        );
    }
}


let mapStateToProps = state => {
    return {
        themeColor: state.root.themeColor,
        mainUrl: state.root.mainUrl,
        user: state.root.user,
        themeColors: state.root.themeColors,
        darkmode: state.root.darkmode,

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        userSaveInStore: (data) => {
            dispatch(userSaveInStore(data));
        },
        addressSaveToStore: (data) => {
            dispatch(addressSaveToStore(data));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateAddress);


const styles = StyleSheet.create({
    holder: {
        flex: 0.25,
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        marginTop: 20,
        // paddingBottom: 40,
        backgroundColor: "green",

    },
    container: {
        // flex: 1,
        // height: 50,
        marginTop: 10,
        width: "100%",
        // backgroundColor: "red",
        // paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForModal: {
        // flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // width:"100%"
    },
    textareaContainer: {
        height: 150,
        width: "100%",
        padding: 10,
        // backgroundColor: '#F8F8F8',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 100,
        fontSize: 14,
        // color: '#333',
    },
    customSlide: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customImage: {
        width: "100%",
        height: "100%",
    },
    listView: {
        width: "100%", height: 40, marginTop: 15,
        borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    listTextOption: {
        marginLeft: 10, color: "#000", fontWeight: "bold", fontSize: 12
    },
    listTextOptionValue: {
        marginLeft: 10, color: "#6a6a6a", textAlign: "right",
    },
    input: { justifyContent: 'center', alignItems: 'center', width: '100%', },
});  
