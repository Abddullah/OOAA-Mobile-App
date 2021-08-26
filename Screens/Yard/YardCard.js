import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity, ActivityIndicator,
  Animated,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { connect } from 'react-redux'
import axios from 'axios';

class YardCard extends React.Component {
  constructor() {
    super()
    this.state = {
      myYardsData: []
    }
  }
  componentDidMount() {
    console.log("Work")
    axios({
      method: 'get',
      url: `${this.props.mainUrl}products/getproduct/${this.props.userInfo._id}`,
    })
      .then(data => {
        console.log(data, "rrrrrrrr")
        let myYardsData = data.data.data
        let totalYard = 0
        for (var i = 0; i < myYardsData.length; i++) {
          totalYard = totalYard + myYardsData[i].price
        }
        this.setState({
          myYardsData, totalYard
        })
        this.props.func(myYardsData)
      })
      .catch(err => {
        let error = JSON.parse(JSON.stringify(err))
        console.log(error, 'ERRROR', err)
        this.setState({
          err: error
        })
      })
  }
  deleteYard(uid, index) {
    console.log(`${this.props.mainUrl}getproduct/${uid}`)
    axios({
      method: 'DELETE',
      url: `${this.props.mainUrl}products/deleteproduct/${uid}`,
    })
      .then(data => {
        console.log(data, "delete")
        let myYardsDataClone = this.state.myYardsData
        myYardsDataClone.splice(index, 1)
        let totalYard = 0
        for (var i = 0; i < myYardsDataClone.length; i++) {
          totalYard = totalYard + myYardsDataClone[i].price
        }
        this.setState({
          myYardsData: myYardsDataClone, totalYard: totalYard
        })
      })
      .catch(err => {
        let error = JSON.parse(JSON.stringify(err))
        console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
        if (error.message && error.message === "Request failed with status code 409") {
        }
      })
  }
  render() {
    const { totalYard, myYardsData, loader } = this.state
    console.log(totalYard, myYardsData, "totalYard,myYardsData")
    return (
      <View style={{ padding: 5, flex: 8, }}>
        <View>
          <Text style={[styles.top_title, { color: this.props.themeColors.forGroundColor }]}>Your Yard: ${totalYard}</Text>
        </View>
        {(myYardsData) ? (
          <View>

            {
              myYardsData.map((e, index) => {
                return (
                  <TouchableOpacity onPress={() => this.props.navigation.push("FullViewItemCard", { data: e })} activeOpacity={0.9} style={styles.yard_card}>

                    {
                      (e.productImage && e.productImage.length > 0) ? (
                        <Image
                          resizeMode="cover"
                          source={{
                            uri: e.productImage[0],
                          }}
                          style={{ width: 100, height: 100, }}
                        />
                      ) :
                        <Image
                          resizeMode="contain"
                          source={require("../../Assets/nophoto.png")}
                          style={{ width: 100, height: 100 }}
                        />
                    }
                    <View style={[styles.card_body, { backgroundColor: this.props.themeColors.externalShade }]}>
                      <View style={styles.body_1}>
                        <Text style={[styles.card_title, { color: this.props.themeColors.forGroundColor }]}>{e.title}</Text>
                        <Text style={[styles.card_views, { color: this.props.themeColors.forGroundColor }]}>{e.views} Views</Text>
                      </View>
                      <View style={styles.body_2}>
                        <TouchableOpacity
                          onPress={() => this.deleteYard(e._id, index)}
                          style={styles.card_btn}>
                          <Fontisto
                            name="trash"
                            style={{ color: 'white', fontSize: 14, marginRight: 6 }}
                          />
                          <Text style={{ color: 'white' }}>Delete</Text>
                        </TouchableOpacity>
                        <Text style={[styles.card_price, { color: this.props.themeColors.forGroundColor }]}>${e.price}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }
              )
            }
          </View>
        ) : (
            <View style={{
              width: "100%",
              justifyContent: 'center',
              alignItems: "center", marginVertical: "50%", opacity: 0.3
            }}>
              <ActivityIndicator size="large" color="black" />
              {
                (this.state.err) ?
                  (
                    <Text style={{ marginTop: 25 }}>{this.state.err}</Text>
                  ) : <Text style={{ marginTop: 25 }} >Loading....</Text>
              }
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top_title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 4,
  },
  yard_card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 4,
  },
  card_body: {
    flex: 1,
    padding: 10
  },
  body_1: {
    flex: 1,
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body_2: {
    flex: 1,
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card_title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  card_views: {
    color: 'rgba(0, 0, 0, 0.5)',
    marginLeft: 'auto',
  },
  card_btn: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: '#ff4444',
    color: 'white',
    flexDirection: 'row',
    margin: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  card_price: {
    marginLeft: 10,
    fontWeight: 'bold',
  },

});

function mapStateToProps(state) {
  return {
    mainUrl: state.root.mainUrl,
    userInfo: state.root.user,
    themeColors: state.root.themeColors,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YardCard);


