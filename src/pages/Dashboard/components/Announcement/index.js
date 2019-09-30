import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import numeral from 'numeral';
import { actNav, navConstant } from '@navigations';
import images from '@assets';
import LinearGradient from 'react-native-linear-gradient';
import Button from '@components/Button';
import { colour } from '@styles';
import styles from './styles'

export default class Announcement extends Component {


  renderOverlay(product) {
    if (this.props.noOverlay) {
      return null;
    } else {
      return (
        <LinearGradient
          style={ Styles.cover.overlayContainer(this.props.size) }
          colors={ [Colors.black.transparent, Colors.black.opacityHalf, Colors.black.default] }
        >
          <View style={ Styles.cover.title.container }>
            <Text style={ Styles.cover.title.text }>{ product.name }</Text>
          </View>
        </LinearGradient>
      );
    };
  };


  _renderCards = () => {
    let cards = this.props.data.map((d,i) => {
      return (
        <View style={styles.card.container}>
          
           <LinearGradient
            colors={[colour.blackNone, colour.blackTransparent, colour.blackTranslucent,  colour.black80opacity]}
            style = {{alignItems: 'center', justifyContent: 'center', borderRadius: 10,}}
          >
          <Image
            source = {images.icon_logo}
            style = {{width: 250, height:80}}
          />
          <View style={styles.card.text.container}>

            <Text style={styles.card.text.date}>10 Sept 2019</Text>
            <Text style={styles.card.text.title}>{d.title}</Text>
            <Text numberOfLines = {1} ellipsizeMode={'tail'} style={styles.card.text.subtitle}>{d.subtitle}</Text>
          
          </View>
          </LinearGradient>
        </View>
      )
    })
    return (
      <ScrollView style = {styles.bottom.container} horizontal contentContainerStyle = {styles.bottom.contentContainer} showsHorizontalScrollIndicator={false}>
        {cards}
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style = {styles.top.container}>

          <View style = {styles.top.left}>
            <Text style = {styles.top.textPromo}>Pengumuman</Text>
          </View>

          {/* <TouchableOpacity onPress={}> */}
            <View style = {styles.top.right}>
              <Text style = {styles.top.textMore}>Lihat Semua</Text>
            </View>
          {/* </TouchableOpacity> */}
        </View>

        <View style={styles.bottom.outerContainer}>
        {this._renderCards()}
          
        </View>
        


      </View>
    )
  }
}
