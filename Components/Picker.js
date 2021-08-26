import React, { Component } from 'react'
import { TextInput, View, TouchableOpacity, StyleSheet, Text, Picker, Item } from 'react-native'

export default (DropMenu = props => {
  console.log(props, props.themeColors.forGroundColor, "*********")
  return (
    <Picker
      selectedValue={props.selected}
      style={{ height: 50, width: 100, }}
      onValueChange={(itemValue, itemIndex) => {
        () => props.func(itemValue, itemIndex)
      }
      }>
      {/* <Picker.Item label="select quantity" value="select quantity" /> */}
      <Picker.Item color={props.themeColors.forGroundColor} label="1" value="1" />
      <Picker.Item color={props.themeColors.forGroundColor} label="2" value="2" />
      <Picker.Item color={props.themeColors.forGroundColor} label="3" value="3" />
      <Picker.Item color={props.themeColors.forGroundColor} label="4" value="4" />
      <Picker.Item color={props.themeColors.forGroundColor} label="5" value="5" />
      <Picker.Item color={props.themeColors.forGroundColor} label="6" value="6" />
      <Picker.Item color={props.themeColors.forGroundColor} label="7" value="7" />
      <Picker.Item color={props.themeColors.forGroundColor} label="8" value="8" />
      <Picker.Item color={props.themeColors.forGroundColor} label="9" value="9" />
      <Picker.Item color={props.themeColors.forGroundColor} label="10" value="10" />
      <Picker.Item color={props.themeColors.forGroundColor} label="other" value="other" />
    </Picker>
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
    marginVertical: 6,
    borderRadius: 5
  },
  btnText: { color: "#141414", fontSize: 17, fontWeight: "700" }
})
