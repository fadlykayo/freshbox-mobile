import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import { actNav, navConstant } from '@navigations';
import { connect } from 'react-redux';
import actions from '@actions';
import styles from './styles';

class Campaigns extends Component {

  navigateToBannerDetail = (product) => {
		let payload = {
		header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			body: {},
			params: {
				bannerID: product.id,
			}
		};

		this.props.get_detail_banner(payload,
			(res) => {

				if(product.links && product.links !== '') {
					actNav.navigate(navConstant.BannerDetail, {links: product.links})
				} else {
					actNav.navigate(navConstant.BannerDetail)
				}
				
			},
			(err) => {
				console.log('err', err)
			}
		) 

	}

  render() {
    return (
      <Container
        style={styles.mainContainer}
        // containerColor={'white'}
      >
        <NavigationBar
          title={'bannerPage.navigationTitle'}
        />
        <View style={styles.container}>

        <FlatList
          data={this.props.banners}
          renderItem={({item, index}) => (
            <View style={styles.card.outerContainer} key={index}>
              <View style = {styles.card.container}>
              <TouchableOpacity onPress={() => this.navigateToBannerDetail(item)}>
                <Image
                  style = {styles.card.container}
                  source={{uri:item.images_dashboard_mobile_url_original}}
                />
              </TouchableOpacity>
              </View>
            </View>
          )}
        />
        </View>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
	banners: state.banners.banners,
})

const mapDispatchToProps = dispatch => ({
  get_detail_banner: (req, res, err) => dispatch(actions.banner.api.get_detail_banner(req,res,err)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Campaigns);