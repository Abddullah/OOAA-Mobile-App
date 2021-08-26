import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView, SafeAreaView,
    Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Accordion } from 'native-base';
import PinsCard from '../../Components/PinsCard';
import Carousel from 'simple-carousel-react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import ImageSlider from 'react-native-image-slider';
import { object } from 'prop-types';
import { CheckBox } from 'react-native-elements';
import AppContainer from '../../Components/AppContainer'
import { connect } from 'react-redux';

const screenWidth = Dimensions.get('screen').width;
class FullViewItemCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesUri: [],
            selectedSubcatogory: []
        };
    }
    componentWillMount() {
        let dataRecive = this.props.navigation.getParam('data')
        if (dataRecive && dataRecive.subcatory && dataRecive.subcatory.length !== 0) {
            let subcatory = JSON.parse(dataRecive.subcatory)
            let selectedSubcatogory = [
                {}, {}, {},
            ]

            for (var i = 0; i < subcatory.length; i++) {
                for (var key in subcatory[i]) {
                    if (subcatory[i][key] === true) {
                        selectedSubcatogory[i][key] = subcatory[i][key]
                    }
                }
            }
            this.setState({
                selectedSubcatogory: selectedSubcatogory
            })
        }

        this.setState({
            fullItemData: dataRecive,
            imagesUri: dataRecive.productImage,
        }, () => { console.log(this.state.imagesUri, "----") })
    }
    render() {
        const { imagesUri, fullItemData, selectedSubcatogory } = this.state
        console.log(selectedSubcatogory, "selectedSubcatogory")
        return (
            <AppContainer navigation={this.props.navigation} title={"Full View"}>
                <View style={{ flex: 1, }}>
                    <SafeAreaView style={styles.container}>

                        {
                            (imagesUri && imagesUri.length != 0 && imagesUri !== null) ? (
                                <ImageSlider
                                    autoPlayWithInterval={8000}
                                    images={imagesUri}
                                    customSlide={({ index, item, style, width }) => (
                                        <View key={index} style={[style, styles.customSlide]}>
                                            <Image resizeMode={"contain"} source={{ uri: item }} style={styles.customImage} />
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
                        {/* // onPress={() => { this.props.navigation.goBack() }}
                        // style={{ position: "absolute", zIndex: 1, marginTop: 20, width: "15%", alignItems: "center" }}>
                        // <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                        //     <Ionicons name="ios-arrow-back" style={{ color: "white", fontWeight: 'bold', fontSize: 25 }} />
                        // </Text> */}
                    </TouchableOpacity>

                    <View style={{ flex: 0.65, backgroundColor: this.props.themeColors.backGroundColor }}>
                        <ScrollView style={{}}>
                            <View style={{ padding: 15 }}>
                                <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                    <View>
                                        <Text style={{ fontSize: 17, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>
                                            $ {fullItemData.price}
                                        </Text>
                                        <Text style={{ fontSize: 17, color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>
                                            {fullItemData.title}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.push("IncludeDetails", { catogery: fullItemData.categoryType, fullItemDataForEdit: fullItemData })}>
                                        <AntDesign name="edit" style={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor, fontWeight: 'bold', fontSize: 20 }} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10 }}>
                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Description:</Text>
                                    <Text style={{ fontSize: 13, color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{fullItemData.description ? fullItemData.description : "N/a"}</Text>
                                </View>

                                <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", }}>
                                    <View style={{ flex: 1, }}>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Catogery:</Text>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{fullItemData.categoryType ? fullItemData.categoryType : "N/a"}</Text>
                                    </View>
                                    <View style={{ flex: 1, }}>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Phone:</Text>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{fullItemData.phone ? fullItemData.phone : "N/a"}</Text>
                                    </View>
                                </View>

                                <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", }}>
                                    <View style={{ flex: 1, }}>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Packing:</Text>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{fullItemData.packing ? "Yes" : "No"}</Text>
                                    </View>
                                    <View style={{ flex: 1, }}>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Weight:</Text>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{(fullItemData.waight || fullItemData.waightUnit) ? (fullItemData.waight + " " + fullItemData.waightUnit) : "N/a"}</Text>
                                    </View>
                                </View>

                                <View style={{ borderBottomColor: "#E4ECE8", borderBottomWidth: 1, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", }}>
                                    <View style={{ flex: 1, }}>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Addres:</Text>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor }}>{fullItemData.address ? fullItemData.address : "N/a"}</Text>
                                    </View>

                                </View>

                                {
                                    (selectedSubcatogory.length != 0 && selectedSubcatogory !== null) ? (
                                        <>
                                            {
                                                (Object.entries(selectedSubcatogory[0]).length != 0) ? (
                                                    <View style={{ borderBottomColor: "#E4ECE8", marginTop: 10, borderBottomWidth: 0.3, }}>
                                                        <Text style={{ fontSize: 17, fontWeight: "bold", color: this.props.themeColors.forGroundColor }}>Standard dietary requirement:</Text>
                                                        {
                                                            Object.keys(selectedSubcatogory[0]).map((value, index) => {
                                                                console.log(value, index, "OBJLOOP")
                                                                return (
                                                                    <CheckBox
                                                                        containerStyle={{
                                                                            height: 30, justifyContent: 'center',
                                                                            // backgroundColor: "red"
                                                                            backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null,


                                                                        }}
                                                                        textStyle={{ fontSize: 11 }}
                                                                        size={20}
                                                                        title={value}
                                                                        checked={true}
                                                                        checkedColor='#003366'

                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                ) : null
                                            }

                                            {
                                                (Object.entries(selectedSubcatogory[1]).length != 0) ? (
                                                    <View style={{ borderBottomColor: "#E4ECE8", marginTop: 10, borderBottomWidth: 0.3, }}>
                                                        <Text style={{ fontSize: 17, fontWeight: "bold", color: this.props.themeColors.forGroundColor }}>Religious restrictions:</Text>

                                                        {
                                                            Object.keys(selectedSubcatogory[1]).map((value, index) => {
                                                                console.log(value, index, "OBJLOOP")
                                                                return (
                                                                    <CheckBox
                                                                        containerStyle={{
                                                                            height: 30, justifyContent: 'center',
                                                                            // backgroundColor: "red"
                                                                            backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null,

                                                                        }}
                                                                        textStyle={{ fontSize: 11 }}
                                                                        size={20}
                                                                        title={value}
                                                                        checked={true}
                                                                        checkedColor='#003366'
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                ) : null
                                            }
                                            {
                                                (Object.entries(selectedSubcatogory[2]).length != 0) ? (
                                                    <View style={{ borderBottomColor: "#E4ECE8", marginTop: 10, borderBottomWidth: 0.3, }}>
                                                        <Text style={{ fontSize: 17, fontWeight: "bold", color: this.props.themeColors.forGroundColor }}>Common food allergies:</Text>
                                                        {
                                                            Object.keys(selectedSubcatogory[2]).map((value, index) => {
                                                                console.log(value, index, "OBJLOOP")
                                                                return (
                                                                    <CheckBox
                                                                        containerStyle={{
                                                                            height: 30, justifyContent: 'center',
                                                                            // backgroundColor: "red"
                                                                            backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null,

                                                                        }}
                                                                        textStyle={{ fontSize: 11 }}
                                                                        size={20}
                                                                        title={value}
                                                                        checked={true}
                                                                        checkedColor='#003366'
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                ) : null
                                            }
                                            {/* 
                                            <View style={{ borderBottomColor: "#E4ECE8", marginTop: 10, borderBottomWidth: 0.3, }}>
                                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Religious restrictions:</Text>
                                                {
                                                    Object.keys(selectedSubcatogory[1]).map((value, index) => {
                                                        console.log(value, index, "OBJLOOP")
                                                        return (
                                                            <CheckBox
                                                                containerStyle={{ height: 30, justifyContent: 'center' }}
                                                                textStyle={{ fontSize: 11 }}
                                                                size={20}
                                                                title={value}
                                                                checked={true}
                                                                checkedColor='#003366'

                                                            />
                                                        )
                                                    })
                                                }
                                            </View> */}

                                            {/* <View style={{ borderBottomColor: "#E4ECE8", marginTop: 10, borderBottomWidth: 0.3, }}>
                                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Common food allergies:</Text>
                                                {
                                                    Object.keys(selectedSubcatogory[2]).map((value, index) => {
                                                        console.log(value, index, "OBJLOOP")
                                                        return (
                                                            <CheckBox
                                                                containerStyle={{ height: 30, justifyContent: 'center' }}
                                                                textStyle={{ fontSize: 11 }}
                                                                size={20}
                                                                title={value}
                                                                checked={true}
                                                                checkedColor='#003366'
                                                            />
                                                        )
                                                    })
                                                }
                                            </View> */}
                                        </>

                                    ) : null
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    holder: {
        flex: 0.25,
        justifyContent: 'center',
    },
    contentContainer: {
        paddingBottom: 60,
        backgroundColor: "white",

    },
    container: {
        flex: 0.35, backgroundColor: "#1A1B1A"

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
        backgroundColor: '#1A1B1A',
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


// export default FullViewItemCard;
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FullViewItemCard);
