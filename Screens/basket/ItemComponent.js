import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

class ItemComponent extends React.Component {
  render() {
    return (
      <View style={{padding: 5, flex: 8,}}>
        <View style={styles.card}>
            <Image source={{uri: 'https://i.pinimg.com/564x/87/b5/20/87b520cac07b60e75a21b29f7f36fd12.jpg'}} style={{width: '100%', height: 200}} />
            <View style={styles.card_body}>
            <View style={styles.group_icons}>
          <TouchableOpacity style={styles.btn_stars}>
            {[0, 1, 2, 3].map((e, index) => (
                  <AntDesign
                name="star"
                style={{fontSize: 20, color: '#ffbb33'}}
                key={index}
              />
            ))}
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_normal}>
            <Text>-30%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_normal}>
          <Text>$4500</Text>
          </TouchableOpacity>
        </View>
            </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
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
      backgroundColor: '#efefef',
    },
    btn_stars: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 2,
      backgroundColor: '#efefef',
    },
    
  });

export default ItemComponent;
