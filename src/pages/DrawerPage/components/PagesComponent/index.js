import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class PagesComponent extends Component {
    constructor(props) {
        super(props);
        this.navigateToOtherPage = this.navigateToOtherPage.bind(this);
    }

    navigateToOtherPage(pages) {
        
        this.props.navigateToOtherPage(pages);
    }

    render() {
        if (this.props.user) {
            return (
                <View style={styles.container}>	
					{ this.props.pages.map ((page, index) => {
                        return(
                            <TouchableOpacity
                                key={index}
								onPress={ () => this.navigateToOtherPage(page) }
								style={page.selected ? styles.page.selected : styles.page.unselected}
							>
								<StaticText
									style={page.selected ? styles.text.selected : styles.text.unselected}
									property={page.name}
								/>
							</TouchableOpacity>
                        )
					}) }
  	      		</View>
            )
        } else {
            return (
                <View style={styles.container}>
					{ this.props.pages.map ((page, index) => {
                        if (page.name == 'drawerPage.pages.favorite' || page.name == 'drawerPage.pages.history' || page.name == 'drawerPage.pages.contactUs') {
                            return null;
                        }
                        else {
                            return(
                                <TouchableOpacity
                                    key={index}
                                    onPress={ () => this.navigateToOtherPage(page) }
                                    style={page.selected ? styles.page.selected : styles.page.unselected}
                                >
                                    <StaticText
                                        style={page.selected ? styles.text.selected : styles.text.unselected}
                                        property={page.name}
                                    />
                                </TouchableOpacity>
                            )
                        }
					}) }
  	      		</View>
            )
        }
    }
}

export default PagesComponent;
