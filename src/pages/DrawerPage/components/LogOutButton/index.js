import React, { PureComponent } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class LogOutButton extends PureComponent {
    constructor() {
        super();
        this.navigate = this.navigate.bind(this);

    }

    navigate() {
        if (this.props.user) {
            this.props.navigateLogOut();
        }
        else {
            this.props.navigateSignIn();
        }
    }

    render() {
        return (
            <TouchableOpacity 
                onPress={ this.navigate }
                style={styles.bottomComponent}
            >
                <StaticText
                    style={styles.logOutText}
                    property= { 
                        this.props.user 
                        ? 'drawerPage.content.logOut' 
                        : 'drawerPage.content.login'
                    }
                />
            </TouchableOpacity>
        );
    }
}

export default LogOutButton;
