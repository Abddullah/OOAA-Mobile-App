import React, { Component } from 'react'
import {  View,  StyleSheet  } from 'react-native'
import { Picker , Icon } from 'native-base'

export default (CustomPicker = props => {
  return (
    <View style = {{alignItems : 'center'}} >
      <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-up" />}
              style={{ width: '40%' }}
              value = {props.value}
              // onValueChange = {(value)=>props.valueChange(value)}
            >
              <Picker.Item label="English" value="english" />
              <Picker.Item label="Spanish" value="spanish" />
            </Picker>
    </View>
  )
})
const styles = StyleSheet.create({
})
