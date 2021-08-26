import React, { Component } from 'react'
import { TextInput, View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Container, Header, Content, Footer, FooterTab, Button, Tab, Tabs, TabHeading, Icon } from 'native-base';

import Pin from '../Screens/Pin';
import Tab1 from '../Screens//Pin/Tab1';

// export default CloseProfile = (props,func) => {

export default FootersTabs = (props, ) => {
    console.log(props.navigate, "Footer")
    return (
        // <View style={{
        //     height: 55, backgroundColor: '#fff', justifyContent: 'center',
        //     // paddingHorizontal: '5%',
        //     borderTopColor: 'grey', borderTopWidth: 0.5
        // }}>

        //     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
        //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: props.routeUI === "pin" ? "#909090" : null }}>
        // <TouchableOpacity
        //     onPress={() => props.navigation.navigate('Pin')}
        //     style={{}} >
        //     <AntDesign name="pushpin" style={{ color: props.routeUI === "pin" ? "#003366" : '#909090', fontWeight: 'bold', fontSize: 27 }} />

        // </TouchableOpacity>
        //         </View>
        //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: props.routeUI === "search" ? "#909090" : null }}>
        //             <TouchableOpacity
        //                 onPress={() => props.navigation.navigate('Search')}
        //                 style={{}} >
                        // <FontAwesome name="search" style={{ color: props.routeUI === "search" ? "#003366" : '#909090', fontWeight: 'bold', fontSize: 27 }} />

        //             </TouchableOpacity>
        //         </View>
        //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: props.routeUI === "gift" ? "#909090" : null }}>
        //             <TouchableOpacity
        //                 onPress={() => props.navigation.navigate('Gift')}
        //                 style={{}} >
        //                 <AntDesign name="gift" style={{ color: props.routeUI === "gift" ? "#003366" : '#909090', fontWeight: 'bold', fontSize: 30 }} />

        //             </TouchableOpacity>
        //         </View>
        //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: props.routeUI === "basket" ? "#909090" : null }}>
        //             <TouchableOpacity
        //                 onPress={() => props.navigation.navigate('Basket')}
        //                 style={{}} >
        //                 {/* <Zocial name='cart' style={{ color: "#909090", fontWeight: "bold", fontSize: 30, }} /> */}
                        // <MaterialIcons name='shopping-cart' style={{ color: props.routeUI === "basket" ? "#003366" : '#909090', fontWeight: "bold", fontSize: 30, }} />

        //             </TouchableOpacity>
        //         </View>
        //     </View>
        // </View>
        <View style={{
            flex: 1,
            height: 55, backgroundColor: '#fff', justifyContent: 'center',
            alignSelf: "flex-end", justifyContent: "flex-end"
        }}>
            <Tabs tabBarPosition="bottom" locked={true}
            >
                <Tab heading={<TabHeading style={{ flexDirection: "column" }}><Icon name="camera" /><Text>Camera</Text></TabHeading>}>
                    <Pin navigate={props.navigate} />
                </Tab>

                <Tab heading="Tab2">
                    <Tab1 />
                </Tab>

            </Tabs>
        </View>


    )
}
const styles = StyleSheet.create({
    buttonView: {
        height: 45,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#141414',
        borderWidth: .3,
        marginVertical: 6,
        borderRadius: 5,
    },
    btnText: { color: '#141414', fontSize: 17, fontWeight: '700' },
})
