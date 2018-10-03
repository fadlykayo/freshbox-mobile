import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Linking } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';

class HomeResetNewPasswordPage extends Component {
    constructor(props) {
        super(props)
        this.handleOpenURL = this.handleOpenURL.bind(this);
        this.navigate = this.navigate.bind(this);
    }


    componentDidMount() {
        if(Platform.OS === 'android') {
            Linking.getInitialURL()
            .then(url => {
                this.navigate(url);    
            })
        }
        else {
            Linking.addEventListener('url', this.handleOpenURL)
        }
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL)
    }

    handleOpenURL(event) {
        this.navigate(event.url);
    }

    navigate(url) {

        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];
        const routeName = route.split('/')[0];
        if (routeName === 'reset') {
            actNav.navigate(navConstant.ResetNewPasswordPage, { id: id })
        };
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text>HomeResetNewPasswordPage</Text>
                </View>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default HomeResetNewPasswordPage;
