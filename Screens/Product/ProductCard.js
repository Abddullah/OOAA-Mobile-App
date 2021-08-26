import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Accordion} from 'native-base';
import PinsCard from '../../Components/PinsCard';
import Carousel from 'simple-carousel-react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
const screenWidth = Dimensions.get('screen').width;
class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip_1: false,
      tooltip_2: false,
      tooltip_3: false,
    };
  }
  render() {
    return (
      <View style={styles.card}>
        <View style={{width: '100%'}}>
          <Carousel color="#8e24aa" dimmedColor="gray" height={200} width={screenWidth-10}>
            <View>
              <Image
                source={{
                  uri:
                    'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                }}
                style={{width: '100%', height: 200}}
              />
            </View>
            <View>
              <Image
                source={{
                  uri:
                    'https://images.pexels.com/photos/877308/pexels-photo-877308.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                }}
                style={{width: '100%', height: 200}}
              />
            </View>
          </Carousel>
        </View>
        <View style={styles.group_icons}>
          <View style={styles.btn_stars}>
            <Tooltip
              isVisible={this.state.tooltip_1}
              content={
                <Image
                  source={{
                    uri:
                      'https://cdn.ablebits.com/_img-blog/line-graph/line-graph-excel.png',
                  }}
                  style={{width: 200, height: 100}}
                />
              }
              placement="bottom"
              onClose={() => this.setState({tooltip_1: false})}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => this.setState({tooltip_1: true})}>
                {[0, 1, 2, 3].map((e, index) => (
                  <AntDesign
                    name="star"
                    style={{fontSize: 20, color: '#ffbb33'}}
                    key={index}
                  />
                ))}
              </TouchableOpacity>
            </Tooltip>
          </View>

          <View style={styles.btn_normal}>
            <Tooltip
              isVisible={this.state.tooltip_2}
              content={
                <Image
                  source={{
                    uri:
                      'https://cdn.ablebits.com/_img-blog/line-graph/line-graph-excel.png',
                  }}
                  style={{width: 200, height: 100}}
                />
              }
              placement="top"
              onClose={() => this.setState({tooltip_2: false})}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => this.setState({tooltip_2: true})}>
                <Text>45%</Text>
              </TouchableOpacity>
            </Tooltip>
          </View>

          <View style={styles.btn_normal}>
            <Tooltip
              isVisible={this.state.tooltip_3}
              content={
                <Image
                  source={{
                    uri:
                      'https://cdn.ablebits.com/_img-blog/line-graph/line-graph-excel.png',
                  }}
                  style={{width: 200, height: 100}}
                />
              }
              placement="left"
              onClose={() => this.setState({tooltip_3: false})}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => this.setState({tooltip_3: true})}>
                <Text>13%</Text>
              </TouchableOpacity>
            </Tooltip>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.cart_btn}>
            <AntDesign
              name="shoppingcart"
              style={{fontSize: 20, color: 'white', marginRight: 8}}
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
        
        <View style={{marginTop: 10}}>
          <Accordion
            icon="add"
            expandedIcon="remove"
            expanded={0}
            dataArray={[
              {
                title: 'Description from OOAA',
                content:
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
              },
            ]}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Accordion
            icon="add"
            expandedIcon="remove"
            dataArray={[
              {
                title: 'Description from Supplier',
                content:
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
              },
            ]}
          />
        </View>
        <View style={{flex: 1, margin: 10}}>
          <View>
            <Text style={styles.text_heading}>Similar Products:</Text>
            <ScrollView horizontal={true}>
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
            </ScrollView>
          </View>
          <View>
            <ScrollView horizontal={true}>
              <PinsCard
                text="Milk"
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
            </ScrollView>
          </View>
        </View>
        <View style={{marginTop: 10}}>
            <Accordion
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
export default ProductCard;
