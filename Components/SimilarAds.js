import React, { Component } from 'react'
import { TextInput, View, TouchableOpacity, StyleSheet, Text, ScrollView, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

// import { ScrollView } from 'react-native-gesture-handler';
// import Carousel from 'react-native-snap-carousel';

export default class SimilarAds extends Component {

    _renderItem({ item, index }) {
        return (
            <View >
                <Text >{item.title}</Text>
            </View>
        );
    }

    render() {
        return (

            <ScrollView horizontal={true} style={{ paddingHorizontal: 5 }}>
                    <Content>
                        <Card style={{  }}>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{ uri: 'https://5.imimg.com/data5/JN/JC/MY-24510429/silicone-hand-band-500x500.jpg' }} />
                                    <Body>
                                        <Text>Hand band</Text>
                                        <Text note>200$ only</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Image source={{ uri: 'https://5.imimg.com/data5/JN/JC/MY-24510429/silicone-hand-band-500x500.jpg' }} style={{ height: 100, width: 200, flex: 1 }} />
                                    <Text>
                                        colorful bands
                </Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent textStyle={{ color: '#87838B' }}>
                                        {/* <TouchableOpacity
                    onPress={() => props.navigation.navigate("Pin")}
                    style={{}} >

                </TouchableOpacity> */}
                                        <AntDesign name='star' style={{ color: "#444846", fontWeight: "bold", fontSize: 23, }} />
                                        <Text>1,926 stars</Text>
                                    </Button>
                                </Left>
                            </CardItem>
                        </Card>
                    </Content>
                    <Content style={{ marginHorizontal:10 }}>
                        <Card >
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{ uri: 'https://5.imimg.com/data5/JN/JC/MY-24510429/silicone-hand-band-500x500.jpg' }} />
                                    <Body>
                                        <Text>Hand band</Text>
                                        <Text note>200$ only</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Image source={{ uri: 'https://5.imimg.com/data5/JN/JC/MY-24510429/silicone-hand-band-500x500.jpg' }} style={{ height: 100, width: 200, flex: 1 }} />
                                    <Text>
                                        colorful bands
                </Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent textStyle={{ color: '#87838B' }}>
                                        {/* <TouchableOpacity
                    onPress={() => props.navigation.navigate("Pin")}
                    style={{}} >

                </TouchableOpacity> */}
                                        <AntDesign name='star' style={{ color: "#444846", fontWeight: "bold", fontSize: 23, }} />
                                        <Text>1,926 stars</Text>
                                    </Button>
                                </Left>
                            </CardItem>
                        </Card>
                    </Content>
               
            </ScrollView>
        );
    }
}