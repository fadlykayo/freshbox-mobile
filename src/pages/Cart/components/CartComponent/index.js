import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import StaticText from '@components/StaticText';
import Content from '../Content';
import styles from './styles';
import images from '@assets';


class CartComponent extends PureComponent {
  constructor() {
    super()
  }

  formatPrice = (input) => {
    return (input).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  render() {
    return (
      <View
        style={styles.eachCartContainer}
      >
        <View
          style={styles.imageContainer}
        >
          <Image
            resizeMode={'contain'} 
            source={this.props.data.image}
            style={styles.picture}
          />
        </View>
        
        <Content 
          data={this.props.data}
        />
        
        <View
          style={styles.addContainer}
        >
        { this.props.data.favorite ? (
          <TouchableHighlight
            // onPress={() => this.onChangeText(index, false)}
            style={ styles.touchableFavorite }
          >
          <Image
            resizeMode={'contain'} 
            source={images.icon_favorited}
            style={ styles.favoriteLogo }
          />
        </TouchableHighlight>
        ) : (
          <TouchableHighlight
          // onPress={() => this.onChangeText(index, true)}
          style={ styles.touchableFavorite }
          >
          <Image
            resizeMode={'contain'} 
            source={images.icon_favorite}
            style={ styles.favoriteLogo }
          />
        </TouchableHighlight>
        )}
        
        <View
          style={styles.touchableItem}
        >
          <TouchableHighlight
            onPress={() => this.props.changeTotalItem(this.props.index, "desc")}
          >
            <StaticText 
              style={styles.operatorText}
              property={'cart.symbol.minus'}/>
          </TouchableHighlight>
          <Text
            style={styles.itemText}
          >
            {this.props.data.counter}
          </Text>
          <TouchableHighlight
            onPress={() => this.props.changeTotalItem(this.props.index, "inc")}
          >
            <StaticText 
              style={styles.operatorText}
              property={'cart.symbol.plus'}/>
          </TouchableHighlight>
        </View>
            
        </View>
      </View>
    );
  }
}

export default CartComponent;