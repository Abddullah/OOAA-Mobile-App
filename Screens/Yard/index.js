import React, { Component } from 'react';
import {
  Image,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomInput from '../../Components/Input';
import CustomButton from '../../Components/Button';
import CustomPicker from '../../Components/PickerComp';
const screenWidth = Dimensions.get('screen').width;
import Header from '../../Components/header';
import Footer from '../../Components/footer';
import YardCard from './YardCard';
import { Fab } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import CloseDrawer from '../../Components/closeDrawer'
import ProfileDrawer from '../../Components/profileDrawer'
import FilterDrawer from '../../Components/filterDrawer'
import * as Animatable from 'react-native-animatable';
import AppContainer from '../../Components/AppContainer'

class Yard extends Component {
  constructor() {
    super();
    this.state = {
      isFilter: false,
      isDrawer: false,
      darkBody: false,
    };
  }
  animateParent(fals) {
    setTimeout(() => {
      this.setState({
        isDrawer: false, isFilter: false
      })
    }, 250);
  }
  render() {
    let { isFilter, isDrawer, darkBody } = this.state;
    console.log(this.props.themeColors, "themeColors")
    return (
      <AppContainer navigation={this.props.navigation} title={"My Yard"}>
        <SafeAreaView style={{ flex: 1, backgroundColor: this.props.themeColors.backGroundColor }}>
          <ScrollView>
            <YardCard navigation={this.props.navigation} func={(Yards) => this.setState({ data: Yards })} />
          </ScrollView>
          {!this.state.data &&
            <View style={{ marginBottom: "30%", alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: "#3F4341", textAlign: "center" }}>To sell your second hand personal items{"\n"} please click the button down there</Text>
              {/* <AntDesign name="arrowright" style={{ marginLeft: 20, top: 3, fontWeight: 'bold', fontSize: 35 }} /> */}
              <Animatable.View
                duration={2000}
                animation="bounceIn" iterationCount={1000}
              >
                <Entypo name="arrow-long-down" style={{ fontWeight: 'bold', fontSize: 28, color: "#3F4341" }} />
              </Animatable.View>
            </View>
          }
          <View style={{ alignItems: "center", marginBottom: "2%" }}>
            {/* <Fab style={{backgroundColor:"#003366"}} onPress={() => this.props.navigation.navigate("CreateYard")}>
          </Fab> */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("CreateYard")}
              activeOpacity={0.8} style={{ backgroundColor: "#003366", width: 60, height: 60, borderRadius: 60, justifyContent: "center", alignItems: "center" }}>
              <AntDesign name="plus" style={{ color: "#fff", fontSize: 22 }} />
            </TouchableOpacity>
          </View>
          {/* <View>
          <Footer navigation={this.props.navigation} />
        </View> */}
        </SafeAreaView>
      </AppContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

function mapStateToProps(state) {
  return {
    themeColors: state.root.themeColors,
    mainUrl: state.root.mainUrl,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Yard);
