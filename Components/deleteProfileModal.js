
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, StatusBar,
    ScrollView, Picker, Image, SafeAreaView, ActivityIndicator,
    images, Dimensions, ImageBackground, Alert
} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Item, Fab, Input } from 'native-base';
// import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";
import axios from 'axios';
import { userSaveInStore } from '../store/action/action';

class DeleteProfileModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: true,
            updateLoader: true,
            address: undefined,
        }
    }
    componentWillMount() {
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })
    }


    closeModal = () => {
        this.setState({ isModalVisible: false })
        this.props.closeModal(false)

    }

    upDatePassword() {
        if (this.state.email != undefined) {
            this.setState({
                updateLoader: !this.state.updateLoader
            })
            let cloneData = {
                _id: this.props.user._id,
                email: this.state.email.toLowerCase()
            }
            var options = {
                method: 'POST',
                url: `${this.props.mainUrl}profile/deleteprofile/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: cloneData
            };
            axios(options)
                .then((data) => {
                    console.log(data, "data")
                    this.closeModal()
                    Alert.alert(data.data.message)
                    this.props.navigation.navigate('Login')

                }).catch((err) => {
                    Alert.alert(JSON.stringify(err.response.data.message))
                    this.setState({
                        updateLoader: !this.state.updateLoader
                    })
                })
        }
        else {
            Alert.alert("Please type address")
        }
    }

    render() {
        console.log(this.props.navigation, "navigation")
        return (
            <View>
                <Modal isVisible={this.state.isModalVisible}>
                    <View
                        // onPressOut={() => { this.closeModal(false) }}
                        style={{ height: this.state.screenHeight / 2.5, justifyContent: 'center', alignItems: "center", }}>
                        <View style={{ backgroundColor: "white", width: "90%", height: "100%", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>

                            <View style={{ width: "80%", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>

                                {/* Cancel Button*/}

                                <View style={{ flex: 1, width: "95%", alignItems: "flex-end", justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "white" }}>
                                    {/* <Text style={{ marginLeft: "2%", fontWeight: "bold" }}>{"Confirmation Email"}</Text> */}
                                    <View style={{ flex: 0.87, backgroundColor: "white" }}>

                                        <Text style={{ marginLeft: "2%", fontWeight: "bold" }}>Once you delete your account. It cannot be recovered, reactivated or retrieved.</Text>
                                    </View>
                                    <View style={{ flex: 0.1, backgroundColor: "white" }}>

                                        <TouchableOpacity
                                            style={{ width: 30, marginTop: 10, backgroundColor: "white" }}
                                            onPress={
                                                this.closeModal
                                            }
                                        >
                                            <Entypo name='cross' style={{ textAlign: "right", marginRight: 10, fontSize: 19, fontWeight: "bold", color: "#1E90FF" }} />
                                        </TouchableOpacity>
                                    </View>

                                </View>

                                {/* Address */}

                                <View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            // secureTextEntry
                                            // keyboardType={"number"}
                                            placeholder={"Please type your email"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Please type your email"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={(e) => { this.setState({ email: e }) }}
                                            value={this.state.email}
                                        />
                                        <Entypo name='mail' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>

                                {
                                    (this.state.updateLoader === true) ? (
                                        <TouchableOpacity style={{ width: "100%", height: 50, marginTop: 20, marginBottom: 20, justifyContent: "center", alignItems: "center", backgroundColor: this.props.themeColor }}
                                            onPress={() => this.upDatePassword()}>
                                            <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
                                        </TouchableOpacity>
                                    ) : <ActivityIndicator style={{ top: 20, marginBottom: 40 }} />

                                }

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}


let mapStateToProps = state => {
    return {
        themeColor: state.root.themeColor,
        mainUrl: state.root.mainUrl,
        user: state.root.user,

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        userSaveInStore: (data) => {
            dispatch(userSaveInStore(data));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(DeleteProfileModal);


const styles = StyleSheet.create({
    holder: {
        flex: 0.25,
        justifyContent: 'center',
    },
    contentContainer: {
        paddingBottom: 40,
        backgroundColor: "white",

    },
    container: {
        flex: 1,
    },
    containerForModal: {
        // flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // width:"100%"
    },
    textareaContainer: {
        height: "30%",
        width: "95%",
        padding: 5,
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
    input: { justifyContent: 'center', alignItems: 'center', width: '95%', },
});  
