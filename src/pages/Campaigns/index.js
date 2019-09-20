import React, { Component } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import { connect } from 'react-redux';
import styles from './styles';

class Campaigns extends Component {
  render() {
    
    return (
      <Container>
        <NavigationBar
          title={'bannerPage.navigationTitle'}
        />
        <View style={styles.container}>

        <FlatList
          data={this.props.banners}
          renderItem={({item, index}) => (
            <View>
              <View style = {styles.card.container}>
                <Image
                  style = {styles.card.container}
                  source={{uri:item.images_dashboard_mobile_url_original}}
                />
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
	banners: state.banners.banners,
})

export default connect(mapStateToProps, null)(Campaigns);