import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions, SafeAreaView, ActivityIndicator
} from 'react-native';
import {
  ListItem,
  Right,
  Separator,
  Left,
  Body,
  Container,
  List,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Accordion } from 'native-base';
import PinsCard from '../../Components/PinsCard';
import Carousel from 'simple-carousel-react-native';
import Modal from 'react-native-modal';
import Tooltip from 'react-native-walkthrough-tooltip';
import { DataTable } from 'react-native-paper';
import AppContainer from "../../Components/AppContainer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageSlider from 'react-native-image-slider';
import axios from 'axios';

const screenWidth = Dimensions.get('screen').width;
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import { Button, ToggleButton } from 'react-native-paper';
import { connect } from 'react-redux';
import MapDirection from '../../Components/maps'

class EstablishmentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false,
      status: true,
    };
  }
  componentDidMount() {
    let navigate = this.props.navigation.getParam('navigate')
    let item = this.props.navigation.getParam('key')
    let shop = this.props.navigation.getParam('shop')
    // let itemsCode = this.props.navigation.getParam('itemsCode')

    let productCode = item._id
    let allProductsInShop = shop.items


    let productDetails;
    for (var i = 0; i < allProductsInShop.length; i++) {
      if (allProductsInShop[i].productId === productCode) {
        productDetails = allProductsInShop[i]
      }
    }
    this.setState({
      productDetails: productDetails,
      item: item,
      shop: shop,
      navigate: navigate
    })

    this.setState({
      isloader: true
    })
    // getting all shops according to location
    // let urlM = `${this.props.mainUrl}addservice/getService/${this.props.user._id}`
    let urlM = `${this.props.mainUrl}addservice/getService/5dd53c99284c720017365646`
    console.log(urlM, "urlM_NEAR_LIST")
    axios({
      method: 'get',
      url: urlM,
    })
      .then(result => {
        console.log(result.data.data, "DATA_FROM_API_NEAR_LIST")
        let nearList = result.data.data
        this.setState({
          nearList: nearList,
          isloader: false
        })
      })
      .catch(err => {
        let error = JSON.parse(JSON.stringify(err))
        console.log(error, 'ERRROR', err)
        this.setState({
          err: error,
          isloader: false
        })
      })
    // getting all samebrand shops 
    let urlMGetSameBrand = `${this.props.mainUrl}addservice/getSameBrand/${productCode}`
    console.log(urlMGetSameBrand, "URL_SAME_BRAND")
    axios({
      method: 'get',
      url: urlMGetSameBrand,
    })
      .then(result => {
        console.log(result.data.data, "DATA_FROM_API_SAME_BRAND_SHOPS")
        let samebrandShops = result.data.data
        this.setState({
          samebrandShops: samebrandShops,
          isloader: false
        })
      })
      .catch(err => {
        let error = JSON.parse(JSON.stringify(err))
        console.log(error, 'ERRROR', err)
        this.setState({
          err: error,
          isloader: false
        })
      })

    // getting all same service shops
    let urlMGetSameService = `${this.props.mainUrl}addservice/getSameService/${shop.catogery}`
    console.log(urlMGetSameService, 'URL_SAME_SERVICE')
    axios({
      method: 'get',
      url: urlMGetSameService,
    })
      .then(result => {
        console.log(result.data.data, "DATA_FROM_API_SAME_SERVICE_SHOPS")
        let sameServiceShops = result.data.data
        this.setState({
          sameServiceShops: sameServiceShops,
          isloader: false
        })
      })
      .catch(err => {
        let error = JSON.parse(JSON.stringify(err))
        console.log(error, 'ERRROR', err)
        this.setState({
          err: error,
          isloader: false
        })
      })

  }

  render() {
    let { productDetails, item, shop, nearList, samebrandShops, sameServiceShops, navigate } = this.state
    console.log(item, shop, "SHOP")
    return (
      <AppContainer navigation={this.props.navigation}>
        {
          (productDetails && item && shop) ? (
            <View style={{ flex: 1, backgroundColor: "red" }}>

              {/* image slider */}
              <SafeAreaView style={styles.container}>
                {
                  (item && item.productImage.length != 0 && item.productImage !== null) ? (
                    <ImageSlider
                      autoPlayWithInterval={8000}
                      images={item.productImage}
                      customSlide={({ index, item, style, width }) => (
                        <View key={index} style={[style, styles.customSlide]}>
                          <Image resizeMode={"cover"} source={{ uri: item }} style={styles.customImage} />
                        </View>
                      )} />
                  ) : <Image resizeMode={"contain"} style={styles.customImage}
                    source={require("../../Assets/nophoto.png")} />
                }
                {/* <Image resizeMode={"contain"} style={styles.customImage}
                  source={require("../../Assets/nophoto.png")} /> */}
              </SafeAreaView>
              <TouchableOpacity
                onPress={() => { this.props.navigation.goBack() }}
                style={{
                  position: "absolute", zIndex: 1, borderRadius: 25,
                  marginTop: 20, width: 40, height: 50, marginLeft: "2.5%",
                  alignItems: "center", justifyContent: "center",
                  backgroundColor: 'rgba(0,50,102,0.8)',
                }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                  <Ionicons name="ios-arrow-back" style={{ color: "white", fontWeight: 'bold', fontSize: 25 }} />
                </Text>
              </TouchableOpacity>


              <View style={{ flex: 0.90, backgroundColor: this.props.themeColors.backGroundColor }}>
                <ScrollView>
                  <View style={styles.group_icons}>
                    <TouchableOpacity
                      style={[styles.btn_stars, { backgroundColor: this.props.themeColors.backGroundColor }]}
                      onPress={() => this.setState({ modalState: !this.state.modalState })}>
                      {[0, 1, 2, 3].map((e, index) => (
                        <AntDesign
                          name="star"
                          style={{ fontSize: 20, color: '#ffbb33' }}
                          key={index}
                        />
                      ))}
                    </TouchableOpacity>

                    <View style={[styles.btn_normal, { backgroundColor: this.props.themeColors.backGroundColor }]}>
                      <Tooltip
                        isVisible={this.state.tooltip_3}
                        content={
                          <View style={{ flex: 1, backgroundColor: this.props.themeColors.backGroundColor, }}>
                            <List>
                              <ListItem>
                                <Text style={{ color: this.props.themeColors.forGroundColor, }}>{shop ? shop.email : "N/a"}</Text>
                              </ListItem>
                              <ListItem >
                                <Text style={{ color: this.props.themeColors.forGroundColor, }}>{shop ? shop.address : "N/a"}</Text>
                              </ListItem>
                              <ListItem style={{ marginBottom: 20 }}>
                                <Text style={{ color: this.props.themeColors.forGroundColor, }}>{shop ? shop.phone : "N/a"}</Text>
                              </ListItem>
                            </List>
                          </View>
                        }
                        placement="top"
                        onClose={() => this.setState({ tooltip_3: false })}>
                        <TouchableOpacity
                          style={{ flexDirection: 'row' }}
                          onPress={() => this.setState({ tooltip_3: true })}>
                          <AntDesign
                            name="contacts"
                            style={{ fontSize: 20, color: '#33b5e5' }}
                          />
                        </TouchableOpacity>
                      </Tooltip>
                    </View>

                    <TouchableOpacity style={[styles.btn_normal, { backgroundColor: this.props.themeColors.backGroundColor,  }]}
                      // onPress={() =>
                      //   alert("Open default map app!")
                      // }
                      onPress={() => navigate.push('googlemapfullview', { shop: shop, navigate: navigate })}>

                      <Feather name="map-pin" style={{ fontSize: 20, color: '#ff4444' }} />
                    </TouchableOpacity>
                  </View>

                  {/* supplier description */}

                  <View style={{ width: '100%', marginTop: 10, marginBottom: 10, backgroundColor: this.props.themeColors.backGroundColor }}>
                    <Collapse>
                      <CollapseHeader style={{ padding: 10 }} >
                        <View style={{ height: 50, width: "100%", justifyContent: "center", borderColor: this.props.darkmode === false ? "grey" : null, borderBottomWidth: this.props.darkmode === false ? 0 : 0.5, backgroundColor: this.props.darkmode === false ? "#EDEBED" : this.props.themeColors.backGroundColor }}>
                          <View style={{ flexDirection: "row", paddingHorizontal: "5%", justifyContent: "space-between" }}>
                            <Text style={[styles.list_title], { color: this.props.themeColors.forGroundColor, fontWeight: "bold", fontSize: 17 }}>{"Description from Supplier"}</Text>
                            <Ionicons name="md-add" style={{ color: "grey", fontWeight: 'bold', fontSize: 20 }} />
                          </View>
                        </View>
                      </CollapseHeader>

                      <CollapseBody>
                        <View style={{ padding: 15 }}>
                          <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
                            <View>
                              <Text style={{ fontSize: 17, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>
                                $ {productDetails.defaultPrice ? productDetails.defaultPrice : "N/A"}
                              </Text>
                              <Text style={{ fontSize: 17, color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>
                                {item.title}
                              </Text>
                            </View>
                          </View>

                          <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10 }}>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Description:</Text>
                            <Text style={{ fontSize: 13, color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{item.description ? item.description : "N/a"}</Text>
                          </View>

                          <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", }}>
                            <View style={{ flex: 1, }}>
                              <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Catogery:</Text>
                              <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{item.categoryType ? item.categoryType : "N/a"}</Text>
                            </View>
                            <View style={{ flex: 1, }}>
                              <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Phone:</Text>
                              <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{shop.phone ? shop.phone : "N/a"}</Text>
                            </View>
                          </View>

                          <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", }}>
                            <View style={{ flex: 1, }}>
                              <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Packing:</Text>
                              <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{item.packing ? "Yes" : "No"}</Text>
                            </View>
                            <View style={{ flex: 1, }}>
                              <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Weight:</Text>
                              <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{(item.waight || item.waightUnit) ? (item.waight + " " + item.waightUnit) : "N/a"}</Text>
                            </View>
                          </View>

                          <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", }}>
                            <View style={{ flex: 1, }}>
                              <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Addres:</Text>
                              <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{shop.address ? shop.address : "N/a"}</Text>
                            </View>

                          </View>
                        </View>
                      </CollapseBody>
                    </Collapse>
                  </View>

                  {/* <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 10 }} >
                    <View
                      style={{
                        // marginTop: 10,
                        marginBottom: 10,
                        width: "90%",
                        marginHorizontal: "5%",
                        borderWidth: 1,
                        borderColor: "#1E90FF",
                        borderRadius: 0,
                        backgroundColor: "#EDEDED",
                      }}
                    >
                      <Text>Shop Location</Text>
                      <MapDirection />
                    </View>
                  </View> */}

                  {/* <View style={{ marginTop: 10, }}>
                    <Accordion
                      // headerStyle={{ backgroundColor: this.props.themeColors.backGroundColor, color: this.props.themeColors.forGroundColor, }}
                      contentStyle={{ backgroundColor: this.props.themeColors.backGroundColor, color: this.props.themeColors.forGroundColor, borderColor: "red" }}
                      icon="add"
                      expandedIcon="remove"
                      dataArray={[
                        {
                          title: 'Policy',
                          content:
                            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
                        },
                      ]}
                    />
                  </View> */}

                  {/* Description from OOAA */}

                  <View style={{ width: '100%', marginTop: -10, marginBottom: 10, backgroundColor: this.props.themeColors.backGroundColor }}>
                    <Collapse>
                      <CollapseHeader style={{ padding: 10 }} >
                        <View style={{ height: 50, width: "100%", justifyContent: "center", borderColor: this.props.darkmode === false ? "grey" : null, borderBottomWidth: this.props.darkmode === false ? 0 : 0.5, backgroundColor: this.props.darkmode === false ? "#EDEBED" : this.props.themeColors.backGroundColor }}>
                          <View style={{ flexDirection: "row", paddingHorizontal: "5%", justifyContent: "space-between" }}>
                            <Text style={[styles.list_title], { color: this.props.themeColors.forGroundColor, fontWeight: "bold", fontSize: 17 }}>{"Policy"}</Text>
                            <Ionicons name="md-add" style={{ color: "grey", fontWeight: 'bold', fontSize: 20 }} />
                          </View>

                        </View>
                      </CollapseHeader>

                      <CollapseBody>
                        <View style={{ padding: 15 }}>
                          <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 17, color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>
                              {`Enjoying our app and all of its features?
Here are some future features to get you excited!

Smart orders: If you buy something like toilet paper regularly, we’ll notice that and remind you to buy some more before it runs out.

We’ll be able to deliver your products to you! You will no longer have to worry about going to your favorite store for your favorite snack. When you can order with OOAA, we’ll go to all your favorite stores for you and drop off the products when it’s most convenient for you.

Mobile pay: you’ll be able to scan and pay for items from your phone. No cashier needed. 

If you have any features which you would love to see in our app, please email ooaaowner@gmail.com and we’ll see what we can do.
These features may not happen, and could be subject to change.`}
                            </Text>

                          </View>
                        </View>
                      </CollapseBody>
                    </Collapse>
                  </View>

                  <View style={{ flex: 1, margin: 10, marginTop: 10 }}>
                    <View>
                      <Text style={styles.text_heading}>Nearby:</Text>
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                          (nearList && nearList != 0) ? (
                            nearList.map((key, index) => {
                              return (
                                <TouchableOpacity key={index}
                                  style={[styles.card2ndOption, {
                                    backgroundColor: this.props.themeColors ? this.props.themeColors.backGroundColor : "red",
                                  }]}
                                  onPress={() => navigate.push('ShopItems', { key: key, navigate: navigate })}
                                >
                                  <Image
                                    resizeMode="cover"
                                    source={require("../../Assets/shopIcons/shopBlue.png")}
                                    style={{ width: 140, height: 120 }}
                                  />
                                  <Text
                                    style={[styles.card_text, {
                                      color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                    }]}
                                  >{key.shopeName}</Text>
                                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: 45, }}>
                                    <View
                                      style={{ flexDirection: "row" }}
                                    >
                                      {[0, 1, 2, 3].map((e, index) => (
                                        <AntDesign
                                          name="star"
                                          style={{ fontSize: 15, color: '#ffbb33' }}
                                          key={index}
                                        />
                                      ))}
                                    </View>
                                    <View style={{ width: "50%", justifyContent: "center", alignItems: "center", }}>
                                      <Text
                                        style={[styles.card_text, {
                                          color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                        }]}
                                      >{key.shopeTime.opening}</Text>
                                      <Text
                                        style={[styles.card_text, {
                                          color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                        }]}
                                      >{key.shopeTime.closing}</Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              )
                            })
                          ) : <View style={{
                            justifyContent: 'center',
                            alignItems: "center",
                          }}>
                              <ActivityIndicator size="large" color="#003266" />
                            </View>
                        }

                        {/* <PinsCard
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
                        /> */}
                      </ScrollView>
                    </View>
                    <View>
                      <Text style={styles.text_heading}>Same Brands:</Text>
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                          (samebrandShops && samebrandShops != 0) ? (
                            samebrandShops.map((key, index) => {
                              // console.log(key, index, "INDEX")
                              return (
                                <TouchableOpacity key={index}
                                  style={[styles.card2ndOption, {
                                    backgroundColor: this.props.themeColors ? this.props.themeColors.backGroundColor : "red",
                                  }]}
                                  onPress={() => navigate.push('ShopItems', { key: key, navigate: navigate })}
                                >
                                  <Image
                                    resizeMode="cover"
                                    source={require("../../Assets/shopIcons/shopBlue.png")}
                                    style={{ width: 140, height: 120 }}
                                  />
                                  <Text
                                    style={[styles.card_text, {
                                      color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                    }]}
                                  >{key.shopeName}</Text>
                                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: 45, }}>
                                    <View
                                      style={{ flexDirection: "row" }}
                                    >
                                      {[0, 1, 2, 3].map((e, index) => (
                                        <AntDesign
                                          name="star"
                                          style={{ fontSize: 15, color: '#ffbb33' }}
                                          key={index}
                                        />
                                      ))}
                                    </View>
                                    <View style={{ width: "50%", justifyContent: "center", alignItems: "center", }}>
                                      <Text
                                        style={[styles.card_text, {
                                          color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                        }]}
                                      >{key.shopeTime.opening}</Text>
                                      <Text
                                        style={[styles.card_text, {
                                          color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                        }]}
                                      >{key.shopeTime.closing}</Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              )
                            })
                          ) : <View style={{
                            justifyContent: 'center',
                            alignItems: "center",
                          }}>
                              <ActivityIndicator size="large" color="#003266" />
                            </View>
                        }
                      </ScrollView>
                      {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
                        </ScrollView> */}
                    </View>
                    <View>
                      <Text style={styles.text_heading}>Same Services:</Text>
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                          (sameServiceShops && sameServiceShops != 0) ? (
                            sameServiceShops.map((key, index) => {
                              // console.log(key, index, "INDEX")
                              return (
                                <TouchableOpacity key={index}
                                  style={[styles.card2ndOption, {
                                    backgroundColor: this.props.themeColors ? this.props.themeColors.backGroundColor : "red",
                                  }]}
                                  onPress={() => navigate.push('ShopItems', { key: key, navigate: navigate })}
                                >
                                  <Image
                                    resizeMode="cover"
                                    source={require("../../Assets/shopIcons/shopBlue.png")}
                                    style={{ width: 140, height: 120 }}
                                  />
                                  <Text
                                    style={[styles.card_text, {
                                      color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                    }]}
                                  >{key.shopeName}</Text>
                                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: 45, }}>
                                    <View
                                      style={{ flexDirection: "row" }}
                                    >
                                      {[0, 1, 2, 3].map((e, index) => (
                                        <AntDesign
                                          name="star"
                                          style={{ fontSize: 15, color: '#ffbb33' }}
                                          key={index}
                                        />
                                      ))}
                                    </View>
                                    <View style={{ width: "50%", justifyContent: "center", alignItems: "center", }}>
                                      <Text
                                        style={[styles.card_text, {
                                          color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                        }]}
                                      >{key.shopeTime.opening}</Text>
                                      <Text
                                        style={[styles.card_text, {
                                          color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                        }]}
                                      >{key.shopeTime.closing}</Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              )
                            })
                          ) : <View style={{
                            justifyContent: 'center',
                            alignItems: "center",
                          }}>
                              <ActivityIndicator size="large" color="#003266" />
                            </View>
                        }
                      </ScrollView>
                      {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
                      </ScrollView> */}
                    </View>
                  </View>

                  {/* <View style={{ marginTop: 10 }}>
                    <Accordion contentStyle={{ backgroundColor: this.props.themeColors.backGroundColor, color: this.props.themeColors.forGroundColor, }}
                      icon="add"
                      expanded={0}
                      expandedIcon="remove"
                      dataArray={[
                        {
                          title: 'OOAA Services',
                          content:
                            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
                        },
                      ]}
                    />
                  </View> */}

                  {/* OOAA Services */}

                  <View style={{ width: '100%', marginTop: 10, marginBottom: 10, backgroundColor: this.props.themeColors.backGroundColor }}>
                    <Collapse>
                      <CollapseHeader style={{ padding: 10 }} >
                        <View style={{ height: 50, width: "100%", justifyContent: "center", borderColor: this.props.darkmode === false ? "grey" : null, borderBottomWidth: this.props.darkmode === false ? 0 : 0.5, backgroundColor: this.props.darkmode === false ? "#EDEBED" : this.props.themeColors.backGroundColor }}>
                          <View style={{ flexDirection: "row", paddingHorizontal: "5%", justifyContent: "space-between" }}>
                            <Text style={[styles.list_title], { color: this.props.themeColors.forGroundColor, fontWeight: "bold", fontSize: 17 }}>{"OOAA Services"}</Text>
                            <Ionicons name="md-add" style={{ color: "grey", fontWeight: 'bold', fontSize: 20 }} />
                          </View>

                        </View>
                      </CollapseHeader>

                      <CollapseBody>
                        <View style={{ padding: 15 }}>
                          <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 17, color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>
                              {`PEPSI
NUTRITION FACTS
Serving Size 12 fl oz (355 mL)
Servings Per Container 1
Amount Per Serving
Calories 150
% Daily Value *
Total Fat 0g	0%
Sodium 30mg	1%
Total Carbohydrate 41g	14%
Sugars 41g
Protein 0g
Not a significant source of other nutrients.
*Percent Daily Values are based on a 2,000 calorie diet.`}
                            </Text>

                          </View>
                        </View>
                      </CollapseBody>
                    </Collapse>
                  </View>

                  <View>
                    <Modal isVisible={this.state.modalState} style={{
                      flex: 0.8,
                      backgroundColor: this.props.themeColors.backGroundColor,
                    }}>
                      <View style={styles.modal}>
                        <Text style={{
                          fontWeight: 'bold',
                          fontSize: 25,
                          textAlign: 'center',
                          margin: 6, color: this.props.themeColors.forGroundColor,
                        }}>Ratings</Text>
                        <View style={styles.modal_list}>
                          <TouchableOpacity
                            style={
                              this.state.status == true
                                ? styles.toggle
                                : styles.toggle_unchecked
                            }
                            onPress={() => {
                              this.setState({ status: !this.state.status });
                            }}>
                            <Text
                              style={
                                this.state.status == true
                                  ? styles.toggle_txt
                                  : styles.toggle_txt_unchecked
                              }>
                              Cleanlinesss
                    </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              this.state.status == true
                                ? styles.toggle
                                : styles.toggle_unchecked
                            }
                            onPress={() => {
                              this.setState({ status: !this.state.status });
                            }}>
                            <Text
                              style={
                                this.state.status == true
                                  ? styles.toggle_txt
                                  : styles.toggle_txt_unchecked
                              }>
                              Good Employee Interaction
                    </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              this.state.status == true
                                ? styles.toggle
                                : styles.toggle_unchecked
                            }
                            onPress={() => {
                              this.setState({ status: !this.state.status });
                            }}>
                            <Text
                              style={
                                this.state.status == true
                                  ? styles.toggle_txt
                                  : styles.toggle_txt_unchecked
                              }>
                              Average Product
                    </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              this.state.status == true
                                ? styles.toggle
                                : styles.toggle_unchecked
                            }
                            onPress={() => {
                              this.setState({ status: !this.state.status });
                            }}>
                            <Text
                              style={
                                this.state.status == true
                                  ? styles.toggle_txt
                                  : styles.toggle_txt_unchecked
                              }>
                              Lightening
                    </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              this.state.status == true
                                ? styles.toggle
                                : styles.toggle_unchecked
                            }
                            onPress={() => {
                              this.setState({ status: !this.state.status });
                            }}>
                            <Text
                              style={
                                this.state.status == true
                                  ? styles.toggle_txt
                                  : styles.toggle_txt_unchecked
                              }>
                              Easy to Navigate
                    </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ margin: 18 }}>
                          <Button
                            mode="contained"
                            onPress={() => this.setState({ modalState: false })}>
                            Okay
                  </Button>
                        </View>
                      </View>
                    </Modal>
                  </View>

                </ScrollView>
              </View>
            </View>
          ) : null
        }

      </AppContainer >
    );
  }
}

const styles = StyleSheet.create({
  card2ndOption: {
    flex: 1, margin: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 0.60, backgroundColor: "#1A1B1A"
  },
  customSlide: {
    backgroundColor: '#1A1B1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggle_unchecked: {
    backgroundColor: 'white',
    padding: 8,
    marginTop: 2,
    margin: 10,
    shadowColor: 'rgba(123,31,162, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  toggle_txt_unchecked: {
    color: 'black',
  },
  toggle: {
    backgroundColor: '#efefef',
    padding: 8,
    margin: 10,
    marginTop: 2,
    shadowColor: 'rgba(123,31,162, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  toggle_txt: {
    fontWeight: 'bold',
    color: '#7b1fa2',
  },
  card: {
    backgroundColor: 'red',
    padding: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card_img: {},
  group_icons: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
  btn_normal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  btn_stars: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  text_heading: {
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontSize: 15,
    color: '#4444ff',
  },
  list_title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  list_header: {
    padding: 5,
    borderBottomColor: '#333',
    borderBottomWidth: 0.5,
  },
  modal: {
    flex: 1,
    // backgroundColor: 'red',
  },
  modal_title: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    margin: 6,
  },
  modal_list: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    themeColors: state.root.themeColors,
    mainUrl: state.root.mainUrl,
    user: state.root.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EstablishmentCard);
