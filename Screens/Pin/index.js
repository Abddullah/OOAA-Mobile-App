import React, { Component } from 'react'
import {
  Image,
  Dimensions, Keyboard,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CustomInput from '../../Components/Input'
import CustomButton from '../../Components/Button'
import CustomPicker from '../../Components/PickerComp'
import Tab1 from './Tab1';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../Components/header';
import Footer from '../../Components/footer';
import AppContainer from '../../Components/AppContainer';

const screenWidth = Dimensions.get('screen').width;

class Pin extends Component {
  constructor() {
    super()
    this.state = {
      tab: 'first',
    }
  }

  componentDidMount() {
    // this.props.routeColor("pin")
  }

  render() {
    console.log(this.props.backGroundColor, "backGroundColor")
    if (this.state.tab == 'first') {
      return (
        // <AppContainer navigation={this.props.navigation} route={"pin"}>
        <>
          <View style={{ backgroundColor: this.props.themeColors.backGroundColor, flex: 1 }}>
            <View style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            }} >
              <TouchableOpacity style={styles.icon_btn} onPress={() => this.setState({ tab: 'first' })}>
                <AntDesign name="tags" style={{ fontSize: 25, color: this.props.themeColors.forGroundColor }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon_btn} onPress={() => this.setState({ tab: 'second' })} >
                <AntDesign name="save" style={{ fontSize: 25, color: this.props.themeColors.forGroundColor }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon_btn}>
                <AntDesign name="save" style={{ fontSize: 25, color: this.props.themeColors.forGroundColor }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.add_btn} >
                <AntDesign name="plus" style={{ fontSize: 25, color: this.props.themeColors.forGroundColor }} />
              </TouchableOpacity>
            </View>
            <Tab1 navigate={this.props.navigate} />
          </View>
        </>
        // </AppContainer>
      )




    } else if (this.state.tab == 'second') {
      return (
        <ScrollView style={{ backgroundColor: this.props.themeColors.backGroundColor, }}>
          {/* <Header /> */}
          <View style={styles.tabContainer} >
            <TouchableOpacity style={styles.icon_btn} onPress={() => this.setState({ tab: 'first' })}>
              <AntDesign name="tags" style={{ fontSize: 25, color: this.props.themeColors.forGroundColor }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon_btn} onPress={() => this.setState({ tab: 'second' })} >
              <AntDesign name="save" style={{ fontSize: 25, color: this.props.themeColors.forGroundColor }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon_btn}>
              <AntDesign name="save" style={{ fontSize: 25, color: this.props.themeColors.forGroundColor }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.add_btn} >
              <AntDesign name="plus" style={{ fontSize: 25, color: this.props.themeColors.forGroundColor }} />
            </TouchableOpacity>
          </View>
          <View style={{ height: 600, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is second Tab</Text>
          </View>
          {/* <View>
            <Footer navigation={this.props.navigation} route={"pin"} />
          </View> */}

        </ScrollView>
      );
    }

    return (
      <ScrollView style={{ flex: 1, backgroundColor: this.props.themeColors.backGroundColor, }}>
        <View style={styles.tabContainer} >
          <TouchableOpacity style={styles.icon_btn} onPress={() => this.setState({ tab: 'first' })} >
            <AntDesign name="tags" style={{ fontSize: 25 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon_btn} onPress={() => this.setState({ tab: 'second' })} >
            <AntDesign name="save" style={{ fontSize: 25 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon_btn}>
            <AntDesign name="save" style={{ fontSize: 25 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.add_btn} >
            <AntDesign name="plus" style={{ fontSize: 25 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  icon_btn: {
    paddingTop: 8, paddingBottom: 8,
    paddingLeft: 16, paddingRight: 16,
  },
  add_btn: {
    paddingTop: 8, paddingBottom: 8,
    paddingLeft: 16, paddingRight: 16,
    marginLeft: 'auto'
  }
});

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
  mapDispatchToProps,
)(Pin)
