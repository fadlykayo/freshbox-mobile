import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class PagesComponent extends Component {
    constructor(props) {
        super(props);
        this.closeDrawerPage = this.closeDrawerPage.bind(this);
        this.navigateToOtherPage = this.navigateToOtherPage.bind(this);
    }

    closeDrawerPage() {
        this.props.closeDrawerPage()
    }

    navigateToOtherPage(pages) {
        this.props.navigateToOtherPage(pages);
    }

    render() {
        if (this.props.user) {
            return (
                <View style={styles.container}>	
					{ this.props.pages.map ((page, index) => {
						if (page.selected) {
							return (
								<TouchableOpacity
                                    key={index}
									onPress={ this.closeDrawerPage }
									style={styles.page.selected}
								>
									<StaticText
										style={styles.text.selected}
										property={page.name}
									/>
								</TouchableOpacity>
							)
						}
						else {
							return (
								<TouchableOpacity
                                    key={index}
									onPress={ () => this.navigateToOtherPage(page)}
									style={styles.page.unselected}
								>
									<StaticText
										style={styles.text.unselected}
										property={page.name}
									/>
								</TouchableOpacity>
							)
						}
					}) }
  	      		</View>
            )
        }
        else {
            return (
                <View style={styles.container}>
					{ this.props.pages.map ((page, index) => {
                        if (page.name == 'drawerPage.pages.favorite' || page.name == 'drawerPage.pages.history' || page.name == 'drawerPage.pages.contactUs') {
                            return null;
                        }
                        else {
                            if (page.selected) {
                                return (
                                    <TouchableOpacity 
                                        onPress={ this.closeDrawerPage }
                                        style={styles.page.selected} key={index}
                                    >
                                        <StaticText
                                            style={styles.selectedText}
                                            property={page.name}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                            else {
                                return (
                                    <TouchableOpacity 
                                        onPress={ () => this.navigateToOtherPage(page)}
                                        style={styles.page.unselected} key={index}
                                    >
                                        <StaticText
                                            style={styles.unselectedText}
                                            property={page.name}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        }
					}) }
  	      		</View>
            )
        }
    }
}

export default PagesComponent;
