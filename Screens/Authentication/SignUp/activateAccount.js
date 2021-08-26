import React, { Component } from 'react';
import {
    Image,
    Dimensions,
    Keyboard,
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity, KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomInput from '../../../Components/Input';
import CustomButton from '../../../Components/Button';
import CustomPicker from '../../../Components/PickerComp';
import axios from 'axios';
// import { ScrollView } from 'react-native-gesture-handler';
const screenWidth = Dimensions.get('screen').width;
class ActivateAccount extends Component {
    constructor() {
        super();
        this.state = {
            code: "",
            showPassword: false,
            showError: false,
            language: 'english',
        };
    }
    showPassword = () => { };
    onChangeText = (name, text) => {
        console.log(name, text, "aaaaaaaaaaa")
        this.setState({ [name]: text });
    };
    codeVerify = () => {

        if (this.state.code) {
            this.setState({
                loader: !this.state.loader
            })

            let email = this.props.navigation.getParam('email');
            let password = this.props.navigation.getParam('password');
            let saveCredentials = this.props.navigation.getParam('saveCredentials');
            // email = JSON.parse(email)
            // String(email)
            // console.log(email, "email")

            let cloneData = {
                email: email,
                code: this.state.code,
                timestampp: new Date().getTime()
            }
            console.log(cloneData, "cloneDatacloneData", `${this.props.mainUrl}signup/activateaccount`)
            var options = {
                method: 'POST',
                // url: `http://192.168.10.12:3002/resetpassword/verifycode`,
                url: `${this.props.mainUrl}signup/activateaccount`,

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
                    this.setState({
                        loader: !this.state.loader
                    })
                    // alert(data.data.message)
                    // this.props.navigation.navigate('Codeverify')
                    this.props.navigation.push("Login", {
                        saveCredentials: saveCredentials,
                        email: email,
                        password: password
                    })
                }).catch((err) => {
                    console.log(JSON.stringify(err), "-------err")
                    alert(err.response.data.message)
                    this.setState({
                        loader: !this.state.loader
                    })
                })
        }
        else {
            alert("code can not be empty")
        }


    };
    valueChange = value => {
        console.log(value);
    };
    render() {

        // email = this.props.navigation.getParam('email');
        // email = JSON.parse(email);

        // console.log(email, "email")
        let { email, password, showPassword, showError } = this.state;
        let logo = require('../../../Assets/OOAAlogo.jpg');
        return (
            <KeyboardAvoidingView style={styles.container} behavior="height" >

                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView style={{
                        flex: 8,
                        // backgroundColor: "green"
                    }}>
                        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', marginTop: "20%" }}>
                            <Image
                                source={logo}
                                style={{ height: 145, width: '80%', resizeMode: 'contain' }}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
                                Activate Your Account
                             </Text>
                        </View>
                        <View style={{ flex: 1.5 }}>

                            <Text style={{ fontSize: 15, textAlign: 'center', marginBottom: 10 }}>
                                Type 6 digit code
                            </Text>

                            <CustomInput
                                // keyboardType="numeric"
                                iconName={'digital-tachograph'}
                                onChangeText={text => this.onChangeText('code', text)}
                                placeholder={'6 digit code'}
                                value={this.state.code}
                                onFocus={() => this.setState({ showError: false })}
                                errorText={showError ? 'Username not recognized' : undefined}
                                navigation={this.props.navigation}
                            />

                            <CustomButton
                                loader={this.state.loader}
                                label={'Submit'}
                                backgroundColor={'#004dcf'}
                                color={'#fff'}
                                onClick={() => this.codeVerify()}
                            />
                            
                            {/* <View style={{ justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')}>
                                    <Text style={{ color: 'blue', marginLeft: 6, textAlign: 'center' }}>Send code again</Text>
                                </TouchableOpacity>
                            </View> */}
                  
                        </View>
                    </ScrollView>

                    <View style={{
                        flex: 0.1,
                        // backgroundColor: "grey"
                    }}>
                        <CustomPicker value={this.state.language} />

                    </View>
                </SafeAreaView >

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});

function mapStateToProps(state) {
    return {
        mainUrl: state.root.mainUrl,

    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActivateAccount);
