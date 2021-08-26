import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image, SafeAreaView,
    ScrollView,
    Dimensions, ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    Accordion, Separator, ListItem,
    Right,
} from 'native-base';
import PinsCard from '../../Components/PinsCard';
import Carousel from 'simple-carousel-react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import AppContainer from "../../Components/AppContainer";
const screenWidth = Dimensions.get('screen').width;
import ImageSlider from 'react-native-image-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
} from 'accordion-collapse-react-native';
import InfiniteScroll from 'react-native-infinite-scroll';
import axios from 'axios';

class ProductsRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltip_1: false,
            tooltip_2: false,
            tooltip_3: false,
            limit: 4,
            offset: 0,
            moreloader: false,
            similarProducts: [],
        };
    }
    componentWillMount() {
        // alert("working")
        let category = this.props.navigation.getParam('category')
        let key = this.props.navigation.getParam('key')
        let navigate = this.props.navigation.getParam('navigate')
        console.log(category, key, navigate, "GETTING_DATA")
        this.setState({
            product: key,
            category: category,
            navigate: navigate
        }, () => {
            this._onEndReached()
        })
    }

    _onEndReached() {
        let { category, limit, offset, moreloader } = this.state
        //loader start
        this.setState({
            moreloader: true,
        })


        let urlM = `${this.props.mainUrl}products/getproductcategorywiseAccTags/${category}/${offset}/${limit}`
        // let urlM = `${this.props.mainUrl}products/getproductcategorywise/${category}/${offset}/${limit}`
        console.log(urlM, "URL")

        
        if (moreloader === false) {
            //getting data from api
            return axios({
                method: 'get',
                url: urlM,
            })
                .then(result => {
                    console.log(result.data.data, "DATA_FROM_API")
                    let responseAPI = result.data.data
                    let clonData = this.state.similarProducts
                    for (var i = 0; i < responseAPI.length; i++) {
                        clonData.push(responseAPI[i])
                    }
                    this.setState({
                        similarProducts: clonData,
                        moreloader: false,
                        offset: offset + responseAPI.length,
                    })
                })
                .catch(err => {
                    let error = JSON.parse(JSON.stringify(err))
                    console.log(error, 'ERRROR', err)
                    this.setState({
                        err: error,
                        moreloader: false,
                    })
                })
        }
    }


    render() {
        let { product, similarProducts, category } = this.state
        console.log(product, "product")
        return (
            <AppContainer navigation={this.props.navigation}>
                <View style={{ flex: 1, }}>
                    {/* image slider */}
                    <SafeAreaView style={styles.container}>
                        {
                            (product && product.productImage.length != 0 && product.productImage !== null) ? (
                                <ImageSlider
                                    autoPlayWithInterval={8000}
                                    images={product.productImage}
                                    customSlide={({ index, item, style, width }) => (
                                        <View key={index} style={[style, styles.customSlide]}>
                                            <Image resizeMode={"cover"} source={{ uri: item }} style={styles.customImage} />
                                        </View>
                                    )} />
                            ) : <Image resizeMode={"contain"} style={styles.customImage}
                                source={require("../../Assets/nophoto.png")} />
                        }
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
                            {/* rating */}
                            <View style={styles.group_icons}>
                                <View style={[styles.btn_stars, { backgroundColor: this.props.themeColors.backGroundColor }]}>
                                    <Tooltip
                                        isVisible={this.state.tooltip_1}
                                        content={
                                            <Image
                                                source={{
                                                    uri:
                                                        'https://cdn.ablebits.com/_img-blog/line-graph/line-graph-excel.png',
                                                }}
                                                style={{ width: 200, height: 100 }}
                                            />
                                        }
                                        placement="bottom"
                                        onClose={() => this.setState({ tooltip_1: false })}>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row' }}
                                            onPress={() => this.setState({ tooltip_1: true })}>
                                            {[0, 1, 2, 3, 4].map((e, index) => (
                                                <AntDesign
                                                    name="star"
                                                    style={{ fontSize: 20, color: '#ffbb33' }}
                                                    key={index}
                                                />
                                            ))}
                                        </TouchableOpacity>
                                    </Tooltip>
                                </View>

                                <View style={[styles.btn_normal, { backgroundColor: this.props.themeColors.backGroundColor }]}>
                                    <Tooltip
                                        isVisible={this.state.tooltip_2}
                                        content={
                                            <Image
                                                source={{
                                                    uri:
                                                        'https://cdn.ablebits.com/_img-blog/line-graph/line-graph-excel.png',
                                                }}
                                                style={{ width: 200, height: 100 }}
                                            />
                                        }
                                        placement="top"
                                        onClose={() => this.setState({ tooltip_2: false })}>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row' }}
                                            onPress={() => this.setState({ tooltip_2: true })}>
                                            <Text style={{ color: this.props.themeColors.forGroundColor, }}>100%</Text>
                                        </TouchableOpacity>
                                    </Tooltip>
                                </View>

                                <View style={[styles.btn_normal, { backgroundColor: this.props.themeColors.backGroundColor }]}>
                                    <View>
                                        <Text style={{ fontSize: 17, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>
                                            $ {product.price ? product.price : "N/A"}
                                            {/* test */}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* add to my cart */}

                            <View
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity style={styles.cart_btn}>
                                    <AntDesign
                                        name="shoppingcart"
                                        style={{ fontSize: 20, color: 'white', marginRight: 8 }}
                                    />
                                    <Text
                                        style={{
                                            textTransform: 'uppercase',
                                            letterSpacing: 1,
                                            color: 'white',
                                            fontWeight: 'bold',
                                        }}>
                                        Add to My Cart
                                    </Text>
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
                                                        $ {product.price ? product.price : "N/A"}
                                                    </Text>
                                                    <Text style={{ fontSize: 17, color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>
                                                        {product.title}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10 }}>
                                                <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Description:</Text>
                                                <Text style={{ fontSize: 13, color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{product.description ? product.description : "N/a"}</Text>
                                            </View>

                                            <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", }}>
                                                <View style={{ flex: 1, }}>
                                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Catogery:</Text>
                                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{product.categoryType ? product.categoryType : "N/a"}</Text>
                                                </View>
                                                <View style={{ flex: 1, }}>
                                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Phone:</Text>
                                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{product.phone ? product.phone : "N/a"}</Text>
                                                </View>
                                            </View>

                                            <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", }}>
                                                <View style={{ flex: 1, }}>
                                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Packing:</Text>
                                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{product.packing ? "Yes" : "No"}</Text>
                                                </View>
                                                <View style={{ flex: 1, }}>
                                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Weight:</Text>
                                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{(product.waight || product.waightUnit) ? (product.waight + " " + product.waightUnit) : "N/a"}</Text>
                                                </View>
                                            </View>

                                            <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", }}>
                                                <View style={{ flex: 1, }}>
                                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Addres:</Text>
                                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{product.address ? product.address : "N/a"}</Text>
                                                </View>

                                            </View>
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                            </View>

                            {/* Description from OOAA */}

                            <View style={{ width: '100%', marginTop: 10, marginBottom: 10, backgroundColor: this.props.themeColors.backGroundColor }}>
                                <Collapse>
                                    <CollapseHeader style={{ padding: 10 }} >
                                        <View style={{ height: 50, width: "100%", justifyContent: "center", borderColor: this.props.darkmode === false ? "grey" : null, borderBottomWidth: this.props.darkmode === false ? 0 : 0.5, backgroundColor: this.props.darkmode === false ? "#EDEBED" : this.props.themeColors.backGroundColor }}>
                                            <View style={{ flexDirection: "row", paddingHorizontal: "5%", justifyContent: "space-between" }}>
                                                <Text style={[styles.list_title], { color: this.props.themeColors.forGroundColor, fontWeight: "bold", fontSize: 17 }}>{"Description from OOAA"}</Text>
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

                            {/* Similar Products: */}

                            <View style={{ marginTop: 10, width: "100%", }}>
                                <Text style={[styles.category_text_styling, { color: this.props.themeColors.forGroundColor, }]}>Similar Products:</Text>
                                <InfiniteScroll style={{}}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    onLoadMoreAsync={this._onEndReached.bind(this)}
                                >
                                    {
                                        (similarProducts.length != 0) ? (
                                            < >
                                                {
                                                    similarProducts.map((key, index) => {
                                                        // console.log(key, index, "INSIDE_MAP")
                                                        return (
                                                            <TouchableOpacity
                                                                key={index}
                                                                onPress={() => this.setState({
                                                                    product: key,
                                                                })}
                                                            >
                                                                <PinsCard themeColors={this.props.themeColors} text={key.title} img={key.productImage[0]} />
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                                {
                                                    (this.state.moreloader === true) ? (
                                                        <View style={{
                                                            justifyContent: 'center',
                                                            alignItems: "center",
                                                        }}>
                                                            <ActivityIndicator size="large" color="#003266" />
                                                        </View>
                                                    ) : null
                                                }
                                            </>

                                        ) : null
                                    }
                                </InfiniteScroll>
                            </View>

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


                        </ScrollView>
                    </View>
                </View>
            </AppContainer>
        );
    }
}
const styles = StyleSheet.create({
    list_title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 6,
    },
    category_text_styling: {
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginLeft: 6,
    },
    container: {
        flex: 0.60, backgroundColor: "#1A1B1A"

    },
    customSlide: {
        backgroundColor: '#1A1B1A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customImage: {
        width: "100%",
        height: "100%",
    },
    card: {
        backgroundColor: 'white',
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
    cart_btn: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffbb33',
        padding: 10,
        margin: 5,
    },
});

function mapStateToProps(state) {
    return {
        themeColors: state.root.themeColors,
        darkmode: state.root.darkmode,
        mainUrl: state.root.mainUrl,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsRender);
