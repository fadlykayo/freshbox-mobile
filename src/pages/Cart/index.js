import React, { PureComponent } from 'react';
import { Text, View, Image } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import styles from './styles';
import images from '@assets';


class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      data: [{
        image: images.icon_forgot_password,
        title: "wortel",
        category: "sayur segar",
        price: 21000,
        favorite: false,
        counter: 0
      },
      {
        image: images.icon_forgot_password,
        title: "wortel",
        category: "sayur segar",
        price: 21000,
        love: images.icon_favorite,
        loved: images.icon_favorited,
        favorite: false,
        counter: 0
      },
      {
        image: images.icon_forgot_password,
        title: "belimbing",
        category: "buah",
        price: 21000,
        love: images.icon_favorite,
        loved: images.icon_favorited,
        favorite: false,
        counter: 0
      }
      ,{
        image: images.icon_forgot_password,
        title: "mangga",
        category: "buah",
        price: 21000,
        love: images.icon_favorite,
        loved: images.icon_favorited,
        favorite: false,
        counter: 0
      },
      {
        image: images.icon_forgot_password,
        title: "sawi",
        category: "sayur segar",
        price: 21000,
        love: images.icon_favorite,
        loved: images.icon_favorited,
        favorite: false,
        counter: 0
      }]
     };
  }
  render() {
    return (
      <Container>
        <NavigationBar 
          title={'cart.navigationTitle'}
          onPress={actNav.goBack}
        />
        <View
          style={styles.container}
        >

          <View
            style={styles.cartContainer}
          >
            <View
              style={styles.imageContainer}
            >
              <Image
                resizeMode={'contain'} 
                source={images.icon_forgot_password}
                style={styles.logo}
              />
            </View>
            <View
              style={styles.contentContainer}
            >
              <Text>2</Text>
              <Text>3</Text>
              <Text>4</Text>
            </View>
            <View
              style={styles.addContainer}
            >
              <Text>
                3
              </Text>
            </View>
          </View>
          
          <View
            style={styles.cartContainer}
          >
            <View
              style={styles.imageContainer}
            >
              <Image
                resizeMode={'contain'} 
                source={images.icon_forgot_password}
                style={styles.logo}
              />
            </View>
            <View
              style={styles.contentContainer}
            >
              <Text>2</Text>
              <Text>3</Text>
              <Text>4</Text>
            </View>
            <View
              style={styles.addContainer}
            >
              <Text>
                3
              </Text>
            </View>
          </View>

          <View
            style={styles.cartContainer}
          >
            <View
              style={styles.imageContainer}
            >
              <Image
                resizeMode={'contain'} 
                source={images.icon_forgot_password}
                style={styles.logo}
              />
            </View>
            <View
              style={styles.contentContainer}
            >
              <Text>2</Text>
              <Text>3</Text>
              <Text>4</Text>
            </View>
            <View
              style={styles.addContainer}
            >
              <Text>
                3
              </Text>
            </View>
          </View>

          <View
            style={styles.cartContainer}
          >
            <View
              style={styles.imageContainer}
            >
              <Image
                resizeMode={'contain'} 
                source={images.icon_forgot_password}
                style={styles.logo}
              />
            </View>
            <View
              style={styles.contentContainer}
            >
              <Text>2</Text>
              <Text>3</Text>
              <Text>4</Text>
            </View>
            <View
              style={styles.addContainer}
            >
              <Text>
                3
              </Text>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

export default Cart;