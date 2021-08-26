import React, { Component } from 'react'
import {
  Image,
  Dimensions, Keyboard,
  StyleSheet,
  Text,
  SafeAreaView, Item, Icon, Button, Input, TextInput,
  View, PanResponder,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Content, Tab, Tabs, Container } from 'native-base';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux'
import Header from '../../Components/header'
import DropMenu from '../../Components/Picker'
import SearchBar from '../../Components/searchBar'
import Footer from '../../Components/footer'
import ProfileDrawer from '../../Components/profileDrawer'
import SimilarAds from '../../Components/SimilarAds'
import FilterDrawer from '../../Components/filterDrawer'
import CloseDrawer from '../../Components/closeDrawer'
import PinsCard from '../../Components/PinsCard';
import CustomInput from '../../Components/Input'
import { identifier } from '@babel/types';
import AppContainer from '../../Components/AppContainer';
const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
class Basket extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      isDrawer: false,
      isFilter: false,
    }
  }
  render() {
    let { isFilter, isDrawer, darkBody } = this.state
    return (
      <>
        <ScrollView
          style={{ backgroundColor: this.props.themeColors.backGroundColor }}>
          <View style={{ flex: 1.5, flexDirection: "row", borderBottomColor: "#EAEAF0", borderBottomWidth: 0.3 }}>
            <View style={{ flex: 1, padding: 15, }}>
              <Text style={{ fontWeight: "bold", color: "#9b9b9b" }}>
                Subtotal
                    </Text>
              <Text style={{ fontSize: 11, fontStyle: "italic", marginHorizontal: "7%", color: "#C0C7C4" }}>
                4 items
                    </Text>
            </View>
            <View style={{ flex: 1, padding: 15, }}>
              <Text style={{ fontSize: 22, color: "#9b9b9b" }}>
                $200
                    </Text>
            </View>
            <View style={{ flex: 1, padding: 15, }}>
              <TouchableOpacity style={styles.buttonView}
                onPress={() => this.props.navigation.navigate('CheckOut')}>
                <Text style={styles.btnText}> checkout </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 2.5, flexDirection: "row", borderBottomColor: "#EAEAF0", borderBottomWidth: 0.3 }}>
            <View style={{ flex: 1, padding: 15, justifyContent: "center", alignItems: 'center' }}>
              <View style={{
                width: 60, height: 60,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
                <Image
                  style={{
                    width: 60, height: 60, borderColor: "#EAEAF0", borderWidth: 1,
                  }}
                  source={
                    { uri: 'data:image/jpeg;base64,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' }
                  } />
              </View>
            </View>
            <View style={{ flex: 1, padding: 15, }}>
              <View>
                <DropMenu themeColors={this.props.themeColors} selected={this.state.quantity}
                  func={(itemValue, itemIndex) => {
                    this.setState({ quantity: itemValue })
                  }}
                />
              </View>
              <View>
                <TouchableOpacity >
                  <AntDesign name='delete' style={{ color: "#D0021B", fontWeight: "bold", fontSize: 21, opacity: 0.7 }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 22, color: "#9b9b9b" }}>
                $5
                    </Text>
            </View>
            <View style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ textAlign: 'center', color: '#9b9b9b' }}>
                Novelty Wrist Ban
             </Text>
            </View>
          </View>
          <View style={{ flex: 6, }}>
            <View style={{ paddingHorizontal: 16 }}>
              {/* <Text style={{ fontWeight: "bold", color: "#9b9b9b" }}>Similar Ads</Text> */}
            </View>
            {/* <SimilarAds /> */}

            <View style={{ flex: 1, margin: 10 }}>
              <View>
                <Text style={[styles.text_heading, { color: this.props.themeColors.forGroundColor, }]}>Similar Products:</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <PinsCard
                    text="Dairy"
                    img="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  />
                  <PinsCard
                    text="Dairy"
                    img="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  />
                  <PinsCard
                    text="Dairy"
                    img="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  />
                </ScrollView>
              </View>
              <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <PinsCard
                    text="Milk"
                    img="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  />
                  <PinsCard
                    text="Dairy"
                    img="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  />
                  <PinsCard
                    text="Dairy"
                    img="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  />
                </ScrollView>
              </View>
            </View>











          </View>
        </ScrollView >
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  buttonView: {
    height: 30,
    // width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(52, 52, 52, 1)',
    backgroundColor: 'rgba(25, 77, 51, 0.6)',
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
)(Basket)




// import React, {Component} from 'react';
// import {
//   Image,
//   Dimensions,
//   Keyboard,
//   StyleSheet,
//   Text,
//   SafeAreaView,
//   View,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import CustomInput from '../../Components/Input';
// import CustomButton from '../../Components/Button';
// import CustomPicker from '../../Components/PickerComp';
// import ItemComponent from './ItemComponent';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {Fab} from 'native-base';
// const screenWidth = Dimensions.get('screen').width;

// class Basket extends Component {
//   constructor() {
//     super();
//     this.state = {};
//   }

//   render() {
//     return (
//       <SafeAreaView style={{flex: 1}}>
//         <Header />
//         <ScrollView>
//           <ItemComponent />
//         </ScrollView>
//         <View>
//         <Fab>
//             <AntDesign name="plus" />
//           </Fab>
//         </View>
//         <View>
//           <Footer navigation={this.props.navigation} />
//         </View>
//       </SafeAreaView>
//     );
//   }
// }
// const styles = StyleSheet.create({});

// function mapStateToProps(state) {
//   return {};
// }

// function mapDispatchToProps(dispatch) {
//   return {};
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Basket);
