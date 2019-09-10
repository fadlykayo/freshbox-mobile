import React, { Component } from 'react';
import { View, Text, WebView, Platform, Image } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import { connect } from 'react-redux';
import { gopay } from '@helpers';
import images from '@assets';
import styles from './style';


class BannerDetail extends Component {
    constructor() {
      super();
    }

    renderBanner = () => {
      return (
        <View style = {styles.banner.container}>
          {/* <Image
            source = {images.loading}
          /> */}
        </View>
      )
    }

    renderContent = () => {
      return (
        <View style = {styles.mid.container}>

          <View style = {styles.mid.titleContainer}>
            <View style = {styles.mid.hori}></View>
            <Text style = {styles.mid.titleText}>Terms and Conditions</Text>
          </View>

          <View style = {styles.mid.contentContainer}>
            <Text style = {styles.mid.contentText}>halo</Text>
          </View>

        </View>
      )
    }

    render() {
        
        let params = this.props.navigation.state.params;
        console.warn(this.props.currentDetail)
        return (
            <Container style={styles.container}>
                <NavigationBar
			    	title={'bannerDetail.navigationTitle'}
			    />
          {
            params.links && params.links !== '' ?
            <View style={styles.content}>
              <WebView
                  source={{uri: params.links}}
                  style={{flex: 1}}
              />
            </View> : 
            <View style={styles.content}>
            {this.renderBanner()}
            {this.renderContent()}
              <Text>Ready to Receive Details</Text>
            </View>
          }
                
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.data,
    currentDetail: state.banners.currentDetail
});

export default connect(mapStateToProps,null)(BannerDetail);
