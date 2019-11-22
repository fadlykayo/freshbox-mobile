import React, { Component, PureComponent } from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Image,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { actNav, navConstant } from '@navigations';
import Button from '@components/Button'
import Styles from './style';

const { height, width } = Dimensions.get('window');

const bannerWidth = width;


export default class Carousel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      scrollX: 0,
      count: 0,
    };
  };


  componentDidMount() {
    // this.startInterval();
  };

  startInterval() {
    
    if(this.props.products !== null) {
      this.interval = setInterval(() => {
        if (this.state.scrollX === this.state.count * bannerWidth) {
          // console.log('disini')
          this.setState({
            count: Math.round((this.state.scrollX / bannerWidth) + 1),
          });
        } else {
          if (this.state.scrollX > this.state.count * bannerWidth) {
            // console.log('disana')
            this.setState({
              count: Math.round((this.state.scrollX / bannerWidth) + 1),
            });
          } else {
            // console.log('disana2')
            this.setState({
              count: Math.round((this.state.scrollX / bannerWidth) + 1),
            });
          };
        };

        if (this.state.count >= this.props.products.length) {
          this.setState({
            count: 0,
          });
        };

        this.refs.cover.scrollTo({x: this.state.count * bannerWidth, animated: true});
      }, 4000);
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  onScrollEvent = () => (e) => {
    this.setState({ scrollX: e.nativeEvent.contentOffset.x });
  };

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



  renderCover(products) {
    if(this.props.rewardDetail && products.length !== 0) {
      return products.map((product, index) => {
        return (
          <View key={ index }>

            <Image style={ Styles.cover.image(this.props.size) } source={ {uri: product.url} }/>
                    <Text Style={{fontSize: 21, color: 'white'}}>{product.title}</Text>

            {/* { this.renderOverlay(product) } */}

          </View>
        );
      });

    } else {
      if(products && products.length !== 0) {
        
        return products.map((product, index) => {
          
          return (
            
              <View key={ index } style={Styles.cover.outerContainer}>
                <TouchableOpacity onPress = {() => this.navigateToBannerDetail(product)} activeOpacity={1}>
                  <Image 
                    style={ Styles.cover.image(this.props.size) } 
                    source={{uri:product.images_dashboard_mobile_url_original}}
                    resizeMode='cover'
                  />
                </TouchableOpacity>
                
              </View>
            
          );
        });
      } else {
        return (
          <View style={Styles.cover.emptyStateView}>
            {/* <Image
              style={ Styles.cover.image(20)}
              source={ Images.noImage }
              resizeMode='contain'
            /> */}
                    {/* <Text Style={{fontSize: 21, color: 'white'}}>{product.name_banner}</Text> */}

            {/* <Text Style={Styles.cover.emptyText}>No Image Available</Text> */}
          </View>
        )
      }
    }

  };

  navigateToBannerDetail = (product) => {
    // console.warn(product)
    this.props.navigateToBannerDetail(product)
    // actNav.navigate(navConstant.BannerDetail, {link: link})
  }

  navigateToCampaign = () => {
    this.props.navigateToCampaign();
  }

  renderIndicator(images, indexPage) {
    let counter = -1;

    if(images) {
        const imagesRender = images.map((image, index) => {
        counter++;
        return <View key={ index } style={ [Styles.cover.indicator.bubble, counter === indexPage ? Styles.cover.indicator.bubbleActive : {}] } />
      });

      return (
        <View style={ Styles.cover.indicator.container(this.props.top, this.props.right) }>
          { imagesRender }
        </View>

      );
    }

  };

  render() {
    let position = Math.round(this.state.scrollX / bannerWidth);

    return (
      <View style ={Styles.outerContainer}>
        <ScrollView
          style={ Styles.cover.container(this.props.size) }
          horizontal
          pagingEnabled
          bounces={ false }
          ref='cover'
          onScroll={ this.onScrollEvent() }
          scrollEventThrottle={ 0 }
          showsHorizontalScrollIndicator={ false }
        >
          { this.renderCover(this.props.products) }
        </ScrollView>

        { this.renderIndicator(this.props.products, position) }
        <TouchableOpacity style={Styles.button.container} onPress={this.navigateToCampaign}>
          <Text style={Styles.button.text}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>
    );
  };
};