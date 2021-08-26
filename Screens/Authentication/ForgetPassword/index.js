import React, { Component } from 'react';
import {
  Image,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  SafeAreaView,
  View, KeyboardAvoidingView,
  TouchableOpacity, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomInput from '../../../Components/Input';
import CustomButton from '../../../Components/Button';
import CustomPicker from '../../../Components/PickerComp';
import axios from 'axios';
const screenWidth = Dimensions.get('screen').width;
class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      showError: false,
      language: 'english',
      loader: false

    };
  }
  showPassword = () => { };
  onChangeText = (name, text) => {
    console.log(name, text, "aaaaaaaaaaa")
    this.setState({ [name]: text });
  };

  login = () => {
    this.setState({
      loader: !this.state.loader
    })
    let cloneData = {
      email: this.state.email,
      createdAt: new Date().getTime()

    }
    var options = {
      method: 'POST',
      // url: `http://192.168.10.12:3002/resetpassword/sendcode`,
      url: `${this.props.mainUrl}resetpassword/sendcode`,

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
        alert(data.data.message)
        // this.props.navigation.navigate('Codeverify', { email: JSON.stringify(cloneData.email) })
        this.props.navigation.navigate('Codeverify', { email: cloneData.email })

        // this.props.navigation.navigate("EditPost", { vewJob: JSON.stringify(viewJob) })
        // viewJob = this.props.navigation.getParam('vewJob');
        // viewJob = JSON.parse(viewJob);
      }).catch((err) => {
        console.log(err, "-------err")
        alert(err.response.data.message)
        this.setState({
          loader: !this.state.loader
        })
      })


    // if (this.state.email != "") {
    //   this.setState({ showError: true });
    //   this.props.navigation.navigate('Codeverify')

    // }
    // else {
    //   alert("Please type Email")
    // }
    // Keyboard.dismiss();
    // this.props.navigation.navigate('Home');
  };
  valueChange = value => {
    console.log(value);
  };
  render() {
    let { email, password, showPassword, showError } = this.state;
    let logo = require('../../../Assets/OOAAlogo.jpg');
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" >

        <SafeAreaView style={{
          flex: 1,
          // backgroundColor: "red"
        }}>
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
                Find Your Account
          </Text>
            </View>
            <View style={{ flex: 1.5 }}>
              <Text style={{ fontSize: 15, textAlign: 'center', marginBottom: 10 }}>
                Type e-mail address for your acccount
          </Text>

              <CustomInput
                iconName={'user'}
                onChangeText={text => this.onChangeText('email', text)}
                placeholder={'E-mail address'}
                onFocus={() => this.setState({ showError: false })}
                value={this.state.email}
                errorText={showError ? 'Username not recognized' : undefined}
                navigation={this.props.navigation}
              />

              <CustomButton
                loader={this.state.loader}
                label={'Send Recovery E-mail'}
                backgroundColor={'#004dcf'}
                color={'#fff'}
                onClick={() => this.login()}
              />
              <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Codeverify')}>
                  <Text style={{ textAlign: 'center' }}>Already have a code?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={{ color: 'blue', marginLeft: 6, textAlign: 'center' }}>Back to login</Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>

          <View style={{
            flex: 0.1,
            // backgroundColor: "grey"
          }}>

            <CustomPicker value={this.state.language} />

          </View>
        </SafeAreaView>
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
)(ForgetPassword);
