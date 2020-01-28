import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native'
import images from '@assets'
import { analytics } from '@helpers';
import styles from './styles'
const { height, width } = Dimensions.get('window');


export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: 0,
      count: 0,
    }
  }

  navigateToCategories = (category) => {
    // analytics.log(`Category_${category.name.split(" ").join("_")}_Pressed`)
    this.props.navigateToCategories(category)
  }

  onScrollEvent = () => (e) => {
    analytics.log(`Category_Scrolled`)
    this.setState({ scrollX: e.nativeEvent.contentOffset.x });
  };

  renderIndicator(images, indexPage) {
    let counter = -1;
    if(images) {
        const imagesRender = images.map((image, index) => {
        counter++;
        return <View key={ index } style={ [styles.cover.indicator.bubble, counter === indexPage ? styles.cover.indicator.bubbleActive : {}] } />
      });

      return (
        <View style={ styles.cover.indicator.container(this.props.top, this.props.right) }>
          { imagesRender }
        </View>

      );
    }

  };

  renderCategory = (page) => {
    return page.map((item, i) => {

        return (
          <TouchableWithoutFeedback onPress = {() => this.navigateToCategories(item)} key={i}>
            <View style={styles.icon.outerContainer}>
              <View style={styles.icon.container}>
              {
                item.images_url && item.images_url !== '' ? 
                <Image
                  source={{uri: item.images_sizes_url.original[0]}}
                  style={styles.icon.image}
                /> : <Image
                  source={images.icon_all_categories}
                  style={styles.icon.image}
                />
              }
                
              </View>

              <Text style={styles.icon.text} numberOfLines = { 2 } >{item.name == 'Default' ? 'All' : item.name}</Text>
              
              
            </View>
          </TouchableWithoutFeedback>
        )

    })
  }

  renderPageCategory = (page, index) => {
    
    return (
      
      <View style={styles.page.container}>
        <View style={styles.page.innerContainer}>
        {
          page ? this.renderCategory(page) : null
        }
        </View>

        



      </View>
    )
  }


  render () {
    let position = Math.round(this.state.scrollX / width);
    return (
      <View style={styles.container}>
        <View style={styles.text.container}>
          <Text style={styles.text.font}>Categories</Text>
        </View>
          <FlatList
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            onScroll={this.onScrollEvent()}
            data = {this.props.categoriesPage}
            keyExtractor={(item) => item[0].code}
            renderItem={({item, index}) => (
            this.renderPageCategory(item, index)
            
            )}
          />
        {this.renderIndicator(this.props.categoriesPage, position)} 
      </View>
    )
  }
  
}
