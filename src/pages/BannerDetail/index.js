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

    render() {
        
        let params = this.props.navigation.state.params;
        console.warn(params.link)
        return (
            <Container style={styles.container}>
                <NavigationBar
			    	title={'bannerDetail.navigationTitle'}
			    />
          {
            params.link && params.link !== '' ?
            <View style={styles.content}>
              <WebView
                  source={{uri: 'https://www.google.com/'}}
                  style={{flex: 1}}
              />
            </View> : 
            <View style={styles.content}>
              <Text>Ready to Receive Details</Text>
            </View>
          }
                
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.data,
    totalPrice: state.product.total.price,
    delivery_price: state.product.delivery_price,
    additional: state.product.additional.credit_card,
    cart: state.product.cart.products,
    addresses: state.user.address,
    detailTransaction: state.transaction.detail,
});

export default connect(mapStateToProps,null)(BannerDetail);
