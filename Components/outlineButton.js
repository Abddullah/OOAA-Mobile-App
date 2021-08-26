import React, { Component } from 'react'
import { TextInput, View, TouchableOpacity, StyleSheet , Text } from 'react-native'

export default (OutlineButton = props => {
  return (
    <TouchableOpacity
    style={{
        marginTop: 25,
        width: "75%",
        height: 35,
        borderWidth: 1,
        borderColor: "#444846",
        borderRadius: 0,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "5%"
    }}
// onPress={this.addPost.bind(this)}
>
    <Text style={{ color: "#444846" }}>Deliver To This Address</Text>
</TouchableOpacity>
  )
})
const styles = StyleSheet.create({
  buttonView: {
    height: 45,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#141414',
    borderWidth: .3,
    marginVertical : 6,
    borderRadius : 5
  },
  btnText: {color : "#141414" , fontSize : 17 , fontWeight : "700"}
})
